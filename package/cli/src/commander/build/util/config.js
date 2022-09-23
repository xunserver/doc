import { cosmiconfigSync } from "cosmiconfig";
import { merge } from "webpack-merge";
import { webpackBaseConfig } from "../config/build.base";
import WebpackChain from "webpack-chain";

const configSchema = {};

export const checkUserConfig = (config) => {
  return true;
};

export const resolveBuildConfig = (config) => {
  let result = merge(webpackBaseConfig, config);
  const webpackConfigChain = new WebpackChain(result);

  webpackConfigChain =
    config?.webpackChain(webpackConfigChain) || webpackConfigChain;

  return webpackConfigChain.toConfig();
};

export const resolveConfig = (config) => {
  if (config.build) {
    config.build = resolveBuildConfig(config.build);
  }

  return config;
};

export const loadConfig = (configPath) => {
  const explore = cosmiconfigSync("xs");
  return (
    configPath
      ? explore.load(resolve(process.cwd(), configPath))
      : explore.search()
  )?.config;
};
