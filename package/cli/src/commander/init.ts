import { program } from "commander";

program
  .command("init")
  .alias("i")
  .description("初始化项目")
  .argument('<name>', '项目名称')
  .argument('[folder]', '项目目录')
  .option("-T, --template <type>", "项目模板")
  .option("-O, -office", "是否离线模式，离线模式使用npm安装，在线模式使用github安装", true)
  .action((name, type) => {
    console.log(name, type)
})

