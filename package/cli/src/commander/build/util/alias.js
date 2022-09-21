const { resolveFromRoot, isExistFile, resolve, join } = require("../utils");

/**
 * 获取tsconfig.json 或者jsConfig.json 导出的config配置
 * @param {*} rootPath
 * @returns
 */
const getConfigJson = (rootPath = resolveFromRoot()) => {
  // 获取tsconfig或者jsconfig.js
  let config = {};
  const jsConfigPath = resolve(rootPath, "jsconfig.json");
  if (isExistFile(jsConfigPath)) {
    config = require(jsConfigPath);
  }

  const tsConfigPath = resolve(rootPath, "tsconfig.json");
  if (isExistFile(tsConfigPath)) {
    config = require(tsConfigPath);
  }

  return config;
};

const genAliasByPaths = (paths) => {
  return Object.entries(paths).reduce((result, [alias, path]) => {
    alias = alias.replace("/*", "");
    path = path[0].replace("/*", "");
    result[alias] = join(resolveFromRoot(), path);

    return result;
  }, Object.create(null));
};

module.exports = () => {
  const configJson = getConfigJson();
  return genAliasByPaths(configJson?.compilerOptions?.paths || {});
};
