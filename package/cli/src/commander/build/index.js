import { program } from "commander";
import { taskWithMessage, to } from "../../utils/common";
import { loadConfig } from "../../utils/loadConfig";
import { errorLog, successLog } from "../../utils/log";
import { webpack } from "webpack";
import { merge } from "webpack-merge";
import webpackBaseConfig from "./config/base";

program
  .command("build")
  .alias("b")
  .description("构建项目，通过加载rc配置文件打包")
  .option("-C, --config <configFile>", "指定配置文件")
  .option("--base <basePath>", "指定配置文件")

  .action(async ({ configFile, basePath }) => {
    const [err, userConfig = {}] = await to(loadConfig(configFile, basePath));
    if (err || !userConfig.type) {
      return errorLog(
        "配置文件加载错误，请检查配置文件是否存在或者是否正确配置type属性"
      );
    }

    const compiler = webpack(webpackBaseConfig, merge(userConfig.build));

    compiler.run((err, stats) => {
      compiler.close();
    });
  });
