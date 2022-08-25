## 功能
支持vue3、vue2、javascript、typescript中eslint检查，同时屏蔽了eslint和prettier冲突的部分。

## 安装
> npm i -D @xunserver/eslint-config

或者使用@xunserver/cli包 `xs add lint`安装

## 使用
```js
// .eslintrc.js
module.exports = {
    extends: ['@xunserver/eslint-config/recommend']  // javascript
    extends: ['@xunserver/eslint-config/typescript']  // typescript
    extends: ['@xunserver/eslint-config/vue']  // vue3
    extends: ['@xunserver/eslint-config/vue2']  // vue2
    extends: ['@xunserver/eslint-config/vue-ts'] // vue3 + ts
}
```

## 注意
默认使用的eslint.parser是@babel/eslint-parser，这种情况下总是需要配置eslint和.eslintrc.js。如果项目中使用eslint，请覆盖parser配置
```js
// .eslintrc.js
module.exports = {
    parser: "espree",
    extends: ['@xunserver/eslint-config/base']
}
```