import { existsSync } from "fs";
import { resolve } from "path";

/**
 * 获取tsconfig.json 或者jsConfig.json 导出的config配置
 * @param {*} rootPath
 * @returns
 */
export const getConfigJson = (rootPath) => {
  // 获取tsconfig或者jsconfig.js
  let config = {};

  ["jsconfig.json", "tsconfig.json"].forEach((configFilename) => {
    const configPath = resolve(rootPath, configFilename);
    if (existsSync(configPath)) {
      config = require(configPath);
    }
  });

  return config;
};

export const genAliasByPaths = (rootPath) =>
  Object.entries(getConfigJson(rootPath)).reduce((result, [alias, path]) => {
    alias = alias.replace("/*", "");
    path = path[0].replace("/*", "");
    result[alias] = resolve(rootPath, path);

    return result;
  }, Object.create(null));

export const createAlias = (rootPath = process.cwd()) =>
  genAliasByPaths(getConfigJson(rootPath)?.compilerOptions?.paths || {});
