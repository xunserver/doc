import merge from "webpack-merge";
import { BuildConfig, OriginConfig } from "../../../../config";
import WebpackChain from 'webpack-chain';
import { webpack } from "webpack";
import { webpackBaseConfig } from "./webpack.base";
import { vueAddon } from "./addon/vue";
import { typescriptAddon } from "./addon/typescript";

export const webpackAddonInstall = (webpackConfig, originConfig, webpackAddons) => {
  webpackAddons.forEach(config => {
    webpackConfig = merge(config(webpackConfig, originConfig), webpackConfig);
  });

  return webpackConfig;
}

export const resolveWebpackConfig = (buildConfig, originConfig: OriginConfig) => {
  let webpackConfigChain = new WebpackChain();
  webpackConfigChain =
    (buildConfig as BuildConfig)?.webpackChain?.(webpackConfigChain) || webpackConfigChain;

  const webpackConfig = webpackAddonInstall(webpackBaseConfig, originConfig, [
    vueAddon(),
    typescriptAddon()
  ])


  return merge(
    webpackConfig,
    (buildConfig as BuildConfig).webpackConfig || {},
    webpackConfigChain.toConfig()
  );
};


/**
 * 执行webpack打包
 */
export const webpackBuilder = (webpackConfig) => {
  console.log(webpackConfig)
  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    console.log(err, stats.toString())
    compiler.close(() => { });
  });
};
