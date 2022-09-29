import { program } from "commander";
import webpack from "webpack";
import { getConfig } from "../../utils/config";
import { warnLog } from "../../utils/log";
import { BuildConfig, CustomBuild, OriginConfig } from "src/config";
import { webpackBaseConfig } from "./config/webpack/webpack.base";
import { resolveWebpackConfig, webpackBuilder } from "./config/webpack/index";

/**
 * 解析用户配置中build，和cli默认配置合并
 * @param config 用户原始输入
 * @returns config
 */
const resolveConfig = (buildConfig: BuildConfig, originConfig: OriginConfig) => {
  const resolver = {
    webpack: resolveWebpackConfig,
  }

  return resolver[originConfig.compiler](buildConfig, originConfig)
}

/**
 * 打包器
 */
const builder = (compilerConfig, originConfig: OriginConfig) => {
  let builderHandler;

  switch (originConfig.compiler) {
    case 'webpack':
      builderHandler = webpackBuilder
  }

  return builderHandler(compilerConfig)
}

/**
 * 根据配置文件加载不同的build配置
 */
const loadDefaultBuildConfig = (compiler: OriginConfig["compiler"], config: OriginConfig) => {
  if (compiler === 'webpack') {
    return webpackBaseConfig
  }
};

program
  .command("build")
  .alias("b")
  .description("构建项目，通过加载rc配置文件打包")
  .option("-M, --mode <mode>", "指定需要加载的模式", "production")

  .action(async (options) => {
    const originConfig: OriginConfig = getConfig(options);
    let buildConfig = originConfig.build;
    // 不支持打包
    if (!buildConfig && buildConfig !== undefined) {
      warnLog("当前不支持build");
      return process.exit(); // 命令结束
    }

    // 自定义打包
    if (typeof buildConfig === "function") {
      return (buildConfig as CustomBuild)(originConfig);
    }

    if (typeof buildConfig === 'object') {
      const compilerConfig = resolveConfig(buildConfig as BuildConfig, originConfig);
      return builder(compilerConfig, originConfig)
    }

    // 配置为true根据type加载默认配置
    if (buildConfig) {
      return builder(loadDefaultBuildConfig(originConfig.compiler, originConfig), originConfig)
    }
  });
