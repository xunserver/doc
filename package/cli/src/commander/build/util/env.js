const dotenv = require("dotenv");
const expandEnv = require("dotenv-expand");
const { ENV_DIR_PATH, DEFAULT_APP_PREFIX } = require("../constant");
const { resolve } = require("../utils");

/**
 * 加载env文件到环境变量中, 忽略报错
 * @param {string} path env文件路径
 */
const loadEnvFile = (path) => {
  try {
    const config = dotenv.config({ path });
    expandEnv.expand(config);
  } catch (err) {
    console.warn(`env文件出现问题：${path}`);
  }
};

/**
 * 根据mode加载env
 * @param {string} mode env mode
 */
const loadEnvByMode = (mode) => {
  const getEnvPath = (filename) => resolve(ENV_DIR_PATH, filename);

  const env = ".env";
  const envLocal = `${env}.local`;
  const envMode = `${env}.${mode}`;
  const envModeLocal = `${envMode}.local`;

  loadEnvFile(getEnvPath(envModeLocal));
  loadEnvFile(getEnvPath(envMode));
  loadEnvFile(getEnvPath(envLocal));
  loadEnvFile(getEnvPath(env));
};

/**
 *  通过前缀获取环境变量中的值
 * @param {string} mode env mode
 */
const getEnvByPrefix = (prefix = DEFAULT_APP_PREFIX) =>
  Object.entries(process.env).reduce((result, [name, value]) => {
    if (name.startsWith(prefix)) {
      result[name] = value;
    }
    return result;
  }, Object.create(null));

/**
 * 生成注入到definePlugin插件中变量
 */
const genDefinePluginEnv = (extra = {}, scoped = "process.env") => {
  const appEnv = getEnvByPrefix();
  return Object.entries({
    ...appEnv,
    ...extra,
  }).reduce((result, [name, value]) => {
    result[`${scoped}.${name}`] = JSON.stringify(value);
    return result;
  }, Object.create(null));
};

module.exports = {
  loadEnvFile,
  loadEnvByMode,
  getEnvByPrefix,
  genDefinePluginEnv,
};
