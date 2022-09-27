const shelljs = require("shelljs");

async function main() {
  shelljs.config.fatal = true;
  // 版本+1
  shelljs.exec("npm version patch");

  // 发布npm
  shelljs.exec(
    "pnpm publish -F @xunserver/cli --access public --no-git-checks"
  );

  // 更新git
  shelljs.exec("git add package.json");
  const packageJson = require("../package.json");
  shelljs.exec(`git commit -m "${packageJson.version}"`);
  shelljs.exec(`git push origin main`);
}

main();
