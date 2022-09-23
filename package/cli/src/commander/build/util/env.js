// 加载env文件到环境变量中
import dotenv from "dotenv";
import expandEnv from "dotenv-expand";
import { resolve } from "path";
import _ from "lodash";

const DEFAULT_APP_PREFIX = "APP_";

/**
 * 加载env文件到环境变量中, 忽略报错
 * @param {string} path env文件路径
 */
export const loadEnvFile = (path) => {
  try {
    const config = dotenv.config({ path });
  } catch (err) {
    console.warn(`env文件出现问题：${path}`);
  }
};

/**
 * 根据mode获取加载env
 * @param {string} mode env mode
 */
export const loadEnvByMode = (
  mode,
  envBaseDirPath = resolve(process.cwd(), "env")
) => {
  const getEnvPath = (filename) => resolve(envBaseDirPath, filename);

  const configList = [
    ".env",
    `${env}.local`,
    `${env}.${mode}`,
    `${envMode}.local`,
  ].map((envFilename) => loadEnvFile(getEnvPath(envFilename)));

  expandEnv.expand(Object.assign({}, ...configList));
};

/**
 * 生成注入到definePlugin插件中变量
 */
export const createDefineFromEnv = (
  extra = {},
  prefix = DEFAULT_APP_PREFIX,
  scoped = "process.env"
) => {
  const appEnv = _.pickBy(process.env, (key) => key.startsWith(prefix));

  return Object.entries({
    ...appEnv,
    ...extra,
  }).reduce((result, [name, value]) => {
    result[`${scoped}.${name}`] = JSON.stringify(value);
    return result;
  }, Object.create(null));
};
