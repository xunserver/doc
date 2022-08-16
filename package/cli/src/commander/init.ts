import { program } from "commander"
import { resolve } from 'path'

import { fetchGit, fetchNpm } from "../utils/fetch";

interface ActionOptions {
  template: string,
  method: string,
}


program
  .command("init")
  .alias("i")
  .description("初始化项目")
  .argument("<name>", "项目名称")
  .argument("[folder]", "项目目录")
  .option("-T, --template <template>", "项目模板")
  .option(
    "-M, --method []",
    "拉取方式",
    'git'
  )
  
  .action(async (name: string, dest: string = name, { template, method }: ActionOptions) => {
    const fullDest = resolve(process.cwd(), name || dest)
    if(method === 'git') {
      await fetchGit(template, fullDest)
    }else if (method === 'npm') {
      await fetchNpm(template, fullDest)
    }
  });

