import shelljs from 'shelljs'
import { resolve, dirname } from 'path'
import inquirer  from 'inquirer'
import { fileURLToPath } from 'url'
import { renderAndOutput } from "../../utils/render";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const babelAction = async (option) => {
  const answer = await inquirer.prompt([
    {
      type: 'rawlist',
      name: 'type',
      message: 'vue、react还是通用开发',
      default: 'common',
      choices: [
        'vue',
        'vue2',
        'react',
        'recommended'
      ]
    },
    {
      type: 'confirm',
      name: 'typescript',
      message: '是否使用typescript',
      default: true
    }
  ])

  shelljs.exec('npm i -D @xunserver/babel-config')
  
  const configFileName = '.babelrc.js'
  shelljs.cp(configFileName, `${configFileName}.bak`)
 
  // 通过添加配置文件
  renderAndOutput(resolve(__dirname, `./template/${configFileName.substring(1)}`), configFileName, {
    type: answer.type === 'recommended' ? '' : answer.type,
    typescript: answer.typescript
  })
}