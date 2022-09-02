import Inquirer from "inquirer";
import fs from "fs";
import { resolve } from "path";

const rootDir = process.cwd();

const getPackageNames = () => {
  const packages = fs.readdirSync(resolve(rootDir, "./package"));

  // 检查有效的package
  return packages.filter((subPackage) =>
    fs.existsSync(resolve(rootDir, "package", subPackage, "package.json"))
  );
};

const publishPackage = (baseDir, option) => {
  shelljs.config.fatal = true;
  shelljs.cd(baseDir);
  let packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
  if (packageJson.scripts?.pub) {
    return shelljs.exec("npm run pub");
  }

  shelljs.exec("npm version patch"); // 更新patch版本号
  ignoreError(() => shelljs.exec("npm run build")); // 更新patch版本号
  shelljs.exec("npm run build"); // 更新patch版本号
  shelljs.exec(
    "npm publish --access public --registry='https://registry.npmjs.org/'"
  ); // 发布npm仓库

  if (option.git) {
    shelljs.exec("git add package.json"); // 发布npm仓库

    packageJson = jsonfile.readFileSync(resolve(baseDir, "package.json"));
    shelljs.exec(`git commit -m '${packageJson.version}'`); // 发布npm仓库
    shelljs.exec(`git push ${option.branch}`); // 发布npm仓库
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
    name: "remote",
    when: (answer) => answer.git,
    message: "需要更新的仓库",
    default: 'origin'
  },
  {
    type: "input",
    name: "branch",
    when: (answer) => answer.git,
    message: "需要更新的分支",
    default: 'main'
  },
]).then((answer) => {
  answer.packages.forEach((subPackage) => {
    publishPackage(resolve(rootDir, 'package', subPackage), answer)
  });
});
