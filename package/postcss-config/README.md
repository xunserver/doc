## 功能
整合常见的postcss配置，目前具有下面功能。
- autoprefix
- postcss-normalize
- flex-bug-fix

## 安装
> npm i -D @xunserver/postcss-config
或者使用@xunserver/cli中 `xs add postcss`

## 使用
```js
// .postcssrc.js
module.exports = {
    plugins: [
        ...(require('@xunserver/postcss-config').plugins)
    ]
}
```
