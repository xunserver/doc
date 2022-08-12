const packageJson = require('../package.json');
const fs = require('fs');
const { resolve } = require('path')

/**
 * 
 * @param version 版本字符串
 * @param versionIndex 版本修改的索引，默认是第三位
 */
const addVersion = (version, index = 2) => {
    const versionArr = version.split('.')
    const lastVersion = versionArr[index];
    versionArr[index] = (+lastVersion + 1)
    
    return versionArr.join('.')
}

const updatePackageJson = (content) => {
    fs.writeFileSync(resolve(__dirname, '../package.json'), content)
}

packageJson.version = addVersion(packageJson.version)
updatePackageJson(JSON.stringify(packageJson, undefined, 2))