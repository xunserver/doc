import shelljs from "shelljs";
import { resolve } from "path";
import inquirer from "inquirer";
import { renderAndOutput } from "../../utils/render";

interface PostcssAnswer {
  isOverride: boolean;
}

export const postcssAction = async (option) => {
  const answer: PostcssAnswer = await inquirer.prompt([
    {
      type: "confirm",
      name: "isOverride",
      message: "是否覆盖配置文件",
      default: false,
    },
  ]);

  shelljs.exec("npm i -D @xunserver/postcss-config");

  const configFileName = ".postcssrc.js";

  if (!answer.isOverride) {
    shelljs.cp(configFileName, `${configFileName}.bak`);
  }

  // 通过添加配置文件
  renderAndOutput(
    resolve(__dirname, `./template/${configFileName.substring(1)}`),
    configFileName,
    {}
  );
};
