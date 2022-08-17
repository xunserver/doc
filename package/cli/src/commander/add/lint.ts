import inquirer from "inquirer";
import { sequenceIterate } from "../../utils/common";

const addEslint = async function() {

}

const addStylelint = async function() {

}

const addPrettier = async function() {

}

const addEditorconfig = async function () {
    
}

const addCommitlint = async function () {

}

const actionMaps: { [key: string]: Function } = {
    'eslint': addEslint,
    'stylelint': addStylelint,
    'prettier': addPrettier,
    'editorconfig': addEditorconfig,
    'commitlint': addCommitlint
}

interface Answer {
    framework: string;
    typescript: boolean;
    lints: string[]
}

export const action = async (option: AddOption) => {
    const answer: Answer  =  await inquirer.prompt([
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
            'stylelint',
            'commitlint',
          ]
        }
      ])
    
      if(answer.lints.find(item => item === 'all')) {
        const actions = Object.entries(actionMaps).map(([_,action]) => action);
        return await sequenceIterate(actions, answer)
      }

      sequenceIterate(answer.lints.map(lint => actionMaps[lint]), answer)

}