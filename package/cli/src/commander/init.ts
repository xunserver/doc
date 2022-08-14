import { program } from "commander"
import  gitDownload from 'download-git-repo';
import  npmDownload from 'npm-fetch';
import { resolve } from 'path'

const prefix = "xunserver-template-"
const userPrefix = "xunserver";


const fetchGit = async (template: string, dest: string) => {
  return gitDownload(`${userPrefix}/${prefix}${template}`, dest, function(err: Error) {
    console.log(err)
  })
}

const fetchNpm = async (template: string, dest: string) => {
  return npmDownload(`${prefix}${template}`, dest, function(err: Error) {
    console.log(err)
  })
}

const getTargetDic = (name: string, dest: string) => {
  const currentPwd = process.cwd();
  return resolve(currentPwd, name || dest)
}

program
  .command("init")
  .alias("i")
  .description("初始化项目")
  .argument("<name>", "项目名称")
  .argument("[folder]", "项目目录")
  .option("-T, --template [type]", "项目模板")
  .option(
    "-M, --method []",
    "拉取方式",
    'git'
  )
  
  .action(async (name: string, dest: string = name, { template, method }) => {
    console.log(name, dest, { template, method })
    const fullDest = getTargetDic(name, dest)

    if(method === 'git') {
      await fetchGit(template, fullDest)
    }else if (method === 'npm') {
      await fetchNpm(template, fullDest)
    }
  });
