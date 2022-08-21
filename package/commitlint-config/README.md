## 功能
添加了commitlint配置，通过husky配合实现pre-commit时检查commit message是否按照格式编写

## 安装
> npm i -D @xunserver/commitlint-config

或者使用@xunserver/cli包提供的`xs add lint` 引导安装

## 使用
```js
// .commitlintrc.js
module.exports = {
    extends: ['@xunserver/commitlint-config']
}
```

## 说明
* build : 改变了build工具 如 webpack
* ci : 持续集成新增
* chore : 构建过程或辅助工具的变动
* feat : 新功能
* docs : 文档改变
* fix : 修复bug
* perf : 性能优化
* refactor : 某个已有功能重构
* revert : 撤销上一次的 commit
* style : 代码格式改变
* test : 增加测试
* anno: 增加注释
