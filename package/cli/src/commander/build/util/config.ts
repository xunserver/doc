import { cosmiconfigSync } from "cosmiconfig";
import { merge } from "webpack-merge";
import { webpackBaseConfig } from "../config/build.base";
import WebpackChain from "webpack-chain";
import { resolve } from "path";

interface UserConfig {
  build: {
    [k: string]: any;
  };
}

const configSchema = {};

export const checkUserConfig = (config: UserConfig) => {
  return true;
};

export const resolveBuildConfig = (config: UserConfig["build"]) => {
  let result = merge(webpackBaseConfig, config);
  let webpackConfigChain = new WebpackChain().merge(config);

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
