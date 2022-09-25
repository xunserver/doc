import { program } from "commander";
import { taskWithMessage } from "../../utils/common";
import webpack from "webpack";
import { loadEnvByMode } from "./util/env";
import { checkUserConfig, loadConfig, resolveConfig } from "./util/config";

interface BuildOptions {
  configFile: string;
  mode: "development" | "production" | string;
}

program
  .command("build")
  .alias("b")
  .description("构建项目，通过加载rc配置文件打包")
  .option("-C, --config <configFile>", "指定配置文件")
  .option("-M, --mode <mode>", "指定需要加载的模式", "production")

  .action(async ({ configFile, mode }) => {
    // 校验配置文件正确性
    const userConfig = taskWithMessage(
      () => loadConfig(configFile),
      "加载配置文件出错"
    );

    // 校验配置文件正确性
    taskWithMessage(
      () => checkUserConfig(userConfig),
      "配置文件有误，请检查配置",
      "配置文件校验通过"
    );

    // 加载环境变量
    taskWithMessage(
      () => loadEnvByMode(mode),
      "环境变量加载错误，请检查环境变量",
      "环境变量加载成功"
    );

    const compiler = webpack(resolveConfig(userConfig).build);

    compiler.run((err, stats) => {
      compiler.close(() => {});
    });
  });
