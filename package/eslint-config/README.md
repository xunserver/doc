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