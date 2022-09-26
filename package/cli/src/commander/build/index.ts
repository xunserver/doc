import { program } from "commander";
import webpack from "webpack";
import { getConfig } from "../../utils/config";
import merge from "webpack-merge";
import { warnLog } from "../../utils/log";
import { BuildConfig, CustomBuild, OriginConfig } from "src/config";
import { webpackBaseConfig } from "./config/webpack.base";
import WebpackChain from 'webpack-chain';

/**
 * 解析用户配置中build，和cli默认配置合并
 * @param config 用户原始输入
 * @returns config
 */
const resolveConfig = (buildConfig: BuildConfig, originConfig: OriginConfig) => {
  const resolver = {
    webpack: resolveWebpackConfig,
  }

  return resolver[originConfig.compiler](buildConfig)
}

/**
 * 解析webpack配置
 * @param buildConfig buildConfig
 */
const resolveWebpackConfig = (buildConfig) => {
  let webpackConfigChain = new WebpackChain();
  webpackConfigChain =
    (buildConfig as BuildConfig)?.webpackChain(webpackConfigChain) || webpackConfigChain;

  return merge(
    webpackBaseConfig,
    (buildConfig as BuildConfig).webpackConfig || {},
    webpackConfigChain.toConfig()
  );
};

/**
 * 解析rollup配置
 */
const resolveRollupConfig = (buildConfig) => { };

/**
 * 执行webpack打包
 */
const webpackBuilder = (webpackConfig) => {
  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    compiler.close(() => { });
  });
};

/**
 * 执行rollup打包
 */
const rollupBuilder = (webpackConfig) => {
  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    compiler.close(() => { });
  });
};

/**
 * 打包器
 */
const builder = (compilerConfig, originConfig: OriginConfig) => {
  const builderHandler = {
    webpack: webpackBuilder,
  }

  return builderHandler[originConfig.compiler](compilerConfig)
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
