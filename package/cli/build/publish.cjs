const shelljs = require('shelljs');

async function main() {
    // // 判断是否需要pub,根据是否存在[pub]前缀决定是否发版
    // if(!await checkIsPub()) {
    //     return
    // }

    // 版本+1
    shelljs.exec('npm version patch');

    // 发布npm
    // shelljs.exec('npm publish --access public');

    // 更新git
    shelljs.exec('git add -A');
    const packageJson = require('../package.json')
    shelljs.exec(`git commit -m "${packageJson.version}"`);
    shelljs.exec(`git push origin master`);
}

main()