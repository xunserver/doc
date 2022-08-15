## 功能
支持在html、vue中lint css、less、scss规则。包含css属性的排序。

## 使用
```js
// .stylelintrc.js
module.exports = {
    // 根据条件选择一个
    extends: ['@xunserver/stylelint-config/css'] // css
    extends: ['@xunserver/stylelint-config/less'] // less
    extends: ['@xunserver/stylelint-config/scss'] // scss
    extends: ['@xunserver/stylelint-config/vue'] // vue
}
```