import Inquirer from "inquirer";
import fs from "fs";
import { resolve } from "path";
import jsonfile from "jsonfile";
import shelljs from "shelljs";

const ignoreError = (fn) => {
  try {
    fn();
  } catch (err) {
    console.error(err);
  }
};

const getPackageNames = () => {
  const rootDir = process.cwd();
  const packages = fs.readdirSync(resolve(rootDir, "./package"));

  // 检查有效的package
  return packages.filter((subPackage) =>
    fs.existsSync(resolve(rootDir, "package", subPackage, "package.json"))
  );
};

const publishPackage = (baseDir) => {
  shelljs.cd(baseDir);
  let packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
  if (packageJson.script.pub) {
    return shelljs.exec("npm run pub");
  }

  shelljs.exec("npm version patch"); // 更新patch版本号
  ignoreError(() => shelljs.exec("npm run build")); // 更新patch版本号
  shelljs.exec("npm run build"); // 更新patch版本号
  shelljs.exec("npm publish --access public"); // 发布npm仓库

  if(answer.git) {
    shelljs.exec("git add package.json"); // 发布npm仓库

    packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
    shelljs.exec(`git commit -m '${packageJson.version}'`); // 发布npm仓库
    shelljs.exec("git push"); // 发布npm仓库
  }
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
    publishPackage(resolve(rootDir, subPackage))
  });
});
