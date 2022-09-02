import Inquirer from "inquirer";
import { resolve } from "path";
import jsonfile from "jsonfile";
import shelljs from "shelljs";
import { program } from "commander";

const rootDir = process.cwd();

const ignoreError = (fn) => {
  try {
    fn();
  } catch (err) {
    console.error(err);
  }
};

export const publishPackage = (baseDir, option) => {
  shelljs.config.fatal = true;
  shelljs.cd(baseDir);
  let packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
  if (packageJson.scripts?.pub) {
    return shelljs.exec("npm run pub");
  }

  shelljs.exec("npm version patch"); // 更新patch版本号
  ignoreError(() => shelljs.exec("npm run build")); // 更新patch版本号
  shelljs.exec(
    "npm publish --access public --registry='https://registry.npmjs.org/'"
  ); // 发布npm仓库

  if (option.git) {
    shelljs.exec("git add package.json"); // 发布npm仓库

    packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
    shelljs.exec(`git commit -m '${packageJson.version}'`); // 发布npm仓库
    shelljs.exec(`git push ${option.remote} ${option.branch}`); // 发布npm仓库
  }
};

program
  .command("pub")
  .alias("p")
  .description("发布npm仓库")
  .option("-G, --git", "是否自动发布git", true)
  .option("-R, --remote", "发布的git仓库名称", 'origin')
  .option("-B, --branch [branch]", "git 分支名称", "main")
  .action((option) => {
    publishPackage(rootDir, option);
  });
