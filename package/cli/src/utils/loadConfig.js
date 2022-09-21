import { cosmiconfigSync } from "cosmiconfig";

export const loadConfig = (configPath, basePath = process.cwd()) => {
  const explore = cosmiconfigSync("xs");
  const configResult = configPath
    ? explore.load(resolve(basePath, configPath))
    : explore.search();

  return configResult?.config;
};
