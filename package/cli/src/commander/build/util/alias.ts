import { existsSync } from "fs";
import { resolve } from "path";

interface Tsconfig {
  compilerOptions?: {
    paths?: {
      [k: string]: string[];
    };
  };
}

/**
 * 获取tsconfig.json 或者jsConfig.json 导出的config配置
 * @param {*} rootPath
 * @returns
 */
export const getConfigJson = (rootPath: string) => {
  // 获取tsconfig或者jsconfig.js
  let config: Tsconfig = {};

  ["jsconfig.json", "tsconfig.json"].forEach((configFilename) => {
    const configPath = resolve(rootPath, configFilename);
    if (existsSync(configPath)) {
      config = require(configPath);
    }
  });

  return config;
};

export const genAliasByPaths = (
  paths: Tsconfig["compilerOptions"]["paths"],
  rootPath: string
) =>
  Object.entries(paths).reduce((result, [alias, path]) => {
    result[alias] = resolve(alias.replace("/*", ""), path[0].replace("/*", ""));

    return result;
  }, Object.create(null));

export const createAlias = (rootPath = process.cwd()) =>
  genAliasByPaths(
    getConfigJson(rootPath)?.compilerOptions?.paths || {},
    rootPath
  );
