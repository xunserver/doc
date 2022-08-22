## 功能
配置了常见的babel配置，包括polyfill，默认使用项目根目录中的.browserlist作为target。

## 安装
> npm i -D @xunserver/babel-config

或者使用 @xunserver/cli包提供``xs add babel`` 安装

## 使用
```js
// .babelrc.js
module.exports = {
    presets: [['@xunserver/babel-config', {
        typescript: true,
        typescriptOptions: {}, // @babel/preset-typescript
        envOptions: {} // @babel/preset-env 配置
    }]] // 默认
    presets: [['@xunserver/babel-config/react', {
        typescript: true,
        envOptions: {}, // @babel/preset-env 配置
        reactOptions: {} // @babel/preset-react 配置
    }]] // react
    presets: [[
        '@xunserver/babel-config/vue', {
            typescript: true,
            vueOptions: {}
        }
    ]]
}
```