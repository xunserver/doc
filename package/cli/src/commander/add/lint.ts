import shelljs from "shelljs";
import { resolve } from "path";
import inquirer from "inquirer";
import { ignoreError, sequenceIterate } from "../../utils/common";
import { renderAndOutput } from "../../utils/render";

type LintsType = "all"|"prettier"|"editorconfig"|"eslint"|"stylelint"|"commitlint";

interface RenderContext {
  type
}
interface LintAnswers {
  type: "vue"| "vue2"| "react"| "recommended",
  typescript: boolean;
  lints: LintsType[];
  isOverride: boolean;
}
interface createConfigOptions {
  packageName: string;
  configFileName: string;
  saveDev: true;
  renderData: (answer: LintAnswers, ) =>
}

const createConfigFile = ({
  packageName,
  configFileName,
  saveDev = true,
  renderData = () => ({}),
}: createConfigOptions) => {
  return async function (answer, context) {
    // 安装相关依赖
    shelljs.exec(`npm i ${saveDev ? "-D" : ""} ${packageName}`);

    if (!answer.isOverride) {
      // 备份本地的.eslintrc.js
      ignoreError(() => shelljs.cp(configFileName, `${configFileName}.bak`));
    }

    let renderContext = {};
    renderContext.type = answer.type;
    if (answer.typescript) {
      renderContext.type = answer.type + "-ts";
    }
    renderContext = {
      ...renderContext,
      ...renderData(answer, renderContext, context),
    };

    // 通过添加配置文件
    renderAndOutput(
      resolve(__dirname, `./template/${configFileName.substring(1)}`),
      configFileName,
      renderContext
    );
  };
};

const addEslint = createConfigFile({
  packageName: "@xunserver/eslint-config",
  configFileName: ".eslintrc.js",
});

const addStylelint = createConfigFile({
  packageName: "@xunserver/stylelint-config",
  configFileName: ".stylelintrc.js",
  renderData(answer) {
    return {
      type: answer.type,
    };
  },
});

const addPrettier = createConfigFile({
  packageName: "@xunserver/prettier-config",
  configFileName: ".prettierrc.js",
});

const addEditorconfig = async function () {
  shelljs.exec("npm i @xunserver/vscode-config");
  ignoreError(() => shelljs.cp(".editorconfig", ".editorconfig.bak"));
  shelljs.cp(
    "node_modules/@xunserver/vscode-config/.editorconfig",
    ".editorconfig"
  );
};

const addCommitlint = createConfigFile({
  packageName: "@xunserver/commitlint-config",
  configFileName: ".commitlintrc.js",
});

const actionMaps = {
  eslint: addEslint,
  stylelint: addStylelint,
  prettier: addPrettier,
  editorconfig: addEditorconfig,
  commitlint: addCommitlint,
};

export const lintAction = async (option) => {
  const answer = await inquirer.prompt([
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
    {
      type: "checkbox",
      name: "lints",
      message: "选择需要添加的lint工具",
      default: ["all"],
      choices: [
        "all",
        "prettier",
        "editorconfig",
        "eslint",
        "stylelint",
        "commitlint",
      ],
    },
    {
      type: "confirm",
      name: "isOverride",
      message: "是否需要覆盖旧配置文件",
      default: false,
    },
  ]);

  if (answer.lints.find((item) => item === "all")) {
    const actions = Object.entries(actionMaps).map(([_, action]) => action);
    return await sequenceIterate(actions, answer);
  }

  const context = {
    cwd: process.cwd(),
  };

  sequenceIterate(
    answer.lints.map((lint) => actionMaps[lint]),
    answer,
    context
  );
};
