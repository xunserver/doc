import { program, Argument } from "commander"
import * as inquirer from "inquirer";
import { resolve } from 'path'
import { action as lintAction } from "./lint";


// 下载
function downloadLintConfig(repo) {

}

// 根据配置名加载配置
function loadByConfig(configName) {

}

program
  .command("add")
  .alias("a")
  .description("添加项目功能")
  .addArgument(new Argument('<type>', '添加组件分类').choices(['lint']))
  .option(
    "-C, --config [config]",
    "采用设定的配置",
  )
  .option(
    "-M, --method [method]",
    "拉取方式",
    'git'
  )

  .action(async (type, option: AddOption) => {
    const { method, config } = option;

    if (config) {
      return loadByConfig(config)
    }
    switch (type) {
      case 'lint':
        return lintAction(option)
    }
  });
