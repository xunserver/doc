import { program, Argument } from "commander"
import inquirer from "inquirer";
import { resolve } from 'path'

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

  .action(async (type, { method, config }: AddOption) => {
    if (config) {
      return loadByConfig(config)
    }
    switch (type) {
      case 'lint':
        // lint 项目lint规则等
        await inquirer.prompt([
          {
            type: 'rawlist',
            name: 'framework',
            message: 'vue、react还是通用开发',
            default: 'common',
            choices: [
              'vue',
              'react',
              'common'
            ]
          },
          {
            type: 'confirm',
            name: 'typescript',
            message: '是否使用typescript',
            default: true
          },
          {
            type: 'checkbox',
            name: 'lints',
            message: '选择需要添加的lint工具',
            default: ['all'],
            choices: [
              'all',
              'prettier',
              'editorconfig',
              'eslint',
              'stylelint'
            ]
          }
        ])
        await downloadLintConfig('xunserver')
    }
  });
