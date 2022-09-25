import shelljs from "shelljs";
import { resolve } from "path";
import inquirer from "inquirer";
import { renderAndOutput } from "../../utils/render";
import { AddOptions } from ".";

interface babelAnswer {
  type: string;
  typescript: boolean;
}

export const babelAction = async (option: AddOptions) => {
  const answer: babelAnswer = await inquirer.prompt([
    {
      type: "rawlist",
      name: "type",
      message: "vue、react还是通用开发",
      default: "common",
      choices: ["vue", "vue2", "react", "recommended"],
    },
    {
      type: "confirm",
      name: "typescript",
      message: "是否使用typescript",
      default: true,
    },
  ]);

  shelljs.exec("npm i -D @xunserver/babel-config");

  const configFileName = ".babelrc.js";
  shelljs.cp(configFileName, `${configFileName}.bak`);

  // 通过添加配置文件
  renderAndOutput(
    resolve(__dirname, `./template/${configFileName.substring(1)}`),
    configFileName,
    {
      ...answer,
      type: answer.type === "recommended" ? "" : answer.type,
    }
  );
};
