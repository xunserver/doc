import { resolve } from "path";
import { readFileSync } from "jsonfile";
import shelljs from "shelljs";
import { program } from "commander";
import { ignoreError } from "../utils/common";
import { getConfig } from "../utils/config";
import { BaseCommanderOptions } from "src/index";
import { warnLog } from "../utils/log";
import { PublishConfig, PublishGitConfig } from "src/config";
import { template } from 'lodash'

/**
 * publish 命令参数
 */
interface PublishOptions extends BaseCommanderOptions {
  /**
   * 是否先build
   */
  build: boolean;
  /**
   * 是否自动发布git
   */
  git: boolean;
  /**
   * 远程仓库名
   */
  remote: string;
  /**
   * 远程分支名
   */
  branch: string;
}

export const publishPackage = (baseDir: string, publishConfig: PublishConfig) => {
  shelljs.config.fatal = true;
  shelljs.cd(baseDir);

  if (publishConfig.publishExec) {
    shelljs.exec(publishConfig.publishExec)
  } else {
    shelljs.exec("npm version patch"); // 更新patch版本号
    // shelljs.exec(
    //   "npm publish --access public --registry='https://registry.npmjs.org/'"
    // ); // 发布npm仓库
  }

  if (publishConfig.git) {
    const gitConfig = publishConfig.git as PublishGitConfig;
    shelljs.exec("git add package.json"); // 发布npm仓库
    const packageJson = readFileSync(resolve(baseDir, "package.json"));
    if (typeof gitConfig.commitMsg === 'string') {
      const context = { packageName: packageJson.name, packageVersion: packageJson.version }
      gitConfig.commitMsg = template(gitConfig.commitMsg)(context);
    } else if (typeof gitConfig.commitMsg === 'function') {
      gitConfig.commitMsg = gitConfig.commitMsg(publishConfig)
    } else {
      gitConfig.commitMsg = `${packageJson.name} pub ${packageJson.version}`
    }

    shelljs.exec(`git commit -m '${gitConfig.commitMsg}'`); // 发布npm仓库
    shelljs.exec(`git push ${gitConfig.remote} ${gitConfig.branch}`); // 发布npm仓库
  }
};

program
  .command("publish")
  .alias("p")
  .description("发布npm仓库")
  .option("-B, --build", "发布前是否build", true)
  .option("-G, --git", "是否自动发布git", true)
  .option("-R, --remote [remote]", "发布的git仓库名称", "origin")
  .option("-B, --branch [branch]", "git 分支名称", "main")
  .action((option: PublishOptions) => {
    const userConfig = getConfig(option);
    const publishConfig = userConfig.publish;
    // 检查pub是否存在
    if (!publishConfig && publishConfig !== undefined) {
      warnLog("禁止发布")
      return process.exit();
    }

    if (option.build) {
      shelljs.exec("xs build");
    }

    if (publishConfig === true || publishConfig === undefined) {
      return publishPackage(process.cwd(), {
        git: {
          remote: option.remote,
          branch: option.branch,
          commitMsg: "${packageName} pub ${packageVersion}"
        }
      })
    }

    if (typeof publishConfig === 'function') {
      return publishConfig(userConfig);
    }
  });
