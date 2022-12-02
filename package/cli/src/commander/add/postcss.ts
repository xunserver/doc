import { exec, cp } from "@xunserver/shell";
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

  exec("npm i -D @xunserver/postcss-config");

  const configFileName = ".postcssrc.js";

  if (!answer.isOverride) {
    cp(configFileName, `${configFileName}.bak`);
  }

  // 通过添加配置文件
  renderAndOutput(
    resolve(__dirname, `./template/${configFileName.substring(1)}`),
    configFileName,
    {}
  );
};
