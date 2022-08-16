import { program, Argument } from "commander"
import { resolve } from 'path'

program
  .command("add")
  .alias("a")
  .description("添加项目功能")
  .addArgument(new Argument('<type>', '添加组件分类').choices(['editor', 'prettier', 'eslint', 'stylelint']))
  .option(
    "-M, --method [method]",
    "拉取方式",
    'git'
  )
  
  .action(async (type, { method }: AddOption) => {
    
  });
