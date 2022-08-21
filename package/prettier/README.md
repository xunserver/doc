## 功能
实现常见的prettier配置。通过继承当前项目实现。

## 安装
> npm i -D @xunserver/prettier-config

或者通过@xunserver/cli 提供的`xs add lint` 引导安装实现

## 使用
```js
// .prettierrc.js
module.exports = {
    ...require('@xunserver/prettier-config')
}
```