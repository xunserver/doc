const shelljs = require('shelljs');

async function main() {
    // 版本+1
    shelljs.exec('npm version patch');

    // 发布npm
    shelljs.exec('npm publish --access public');

    // 更新git
    shelljs.exec('git add package/cli/package.json');
    const packageJson = require('../package.json')
    shelljs.exec(`git commit -m "${packageJson.version}"`);
    shelljs.exec(`git push origin main`);
}

main()