#! /usr/bin/env node
import { program } from "commander";

import "./commander/init";
import "./commander/pub";
import "./commander/add";
import "./commander/build";

import { description, version } from "../package.json";


export interface BaseCommanderOptions {
  config?: string;
  mode?: "production" | "development" | string;
}

program
  .option("-C, --config <configFile>", "指定配置文件")
  .option("-M, --mode <mode>", "指定需要加载的模式", "production");

program.description(description).version(version);

program.parse();
