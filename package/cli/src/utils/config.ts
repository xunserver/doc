import { cosmiconfigSync } from "cosmiconfig";
import { resolve } from "path";
import { taskWithMessage } from "./common";
import { OriginConfig } from "../config";
import { BaseCommanderOptions } from "../index";
import { loadEnvByMode } from "../utils/env";

export const checkUserConfig = (config: OriginConfig) => {
  return true;
};

export const loadConfigFile = (configPath) => {
  const explore = cosmiconfigSync("xs");
  return (
    configPath
      ? explore.load(resolve(process.cwd(), configPath))
      : explore.search()
  )?.config;
};

export const getConfig = ({ config, mode }: BaseCommanderOptions) => {
  // 加载环境变量
  taskWithMessage(
    () => loadEnvByMode(mode),
    "环境变量加载错误，请检查环境变量"
  );

  // 校验配置文件正确性
  const userConfig = taskWithMessage(
    () => loadConfigFile(config),
    "加载配置文件出错"
  );

  // 校验配置文件正确性
  taskWithMessage(
    () => checkUserConfig(userConfig),
    "配置文件有误，请检查配置"
  );

  return userConfig;
};
