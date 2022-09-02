import Inquirer from "inquirer";
import fs from "fs";
import { resolve } from "path";
import jsonfile from "jsonfile";
import shelljs from "shelljs";
import { publishPackage } from "../package/cli/src/commander/pub";

const rootDir = process.cwd();

const ignoreError = (fn) => {
  try {
    fn();
  } catch (err) {
    console.error(err);
  }
};

const getPackageNames = () => {
  const packages = fs.readdirSync(resolve(rootDir, "./package"));

  // 检查有效的package
  return packages.filter((subPackage) =>
    fs.existsSync(resolve(rootDir, "package", subPackage, "package.json"))
  );
};

Inquirer.prompt([
  {
    type: "checkbox",
    choices: getPackageNames(),
    name: "packages",
    message: "请选择需要发布的包",
  },
  {
    type: "confirm",
    name: "git",
    message: "是否需要更新git",
    default: true
  },
  {
    type: "input",
    name: "branch",
    when: (answer) => answer.git,
    message: "需要更新的峰值",
    default: 'main'
  },
]).then((answer) => {
  answer.packages.forEach((subPackage) => {
    publishPackage(resolve(rootDir, 'package', subPackage), answer)
  });
});
