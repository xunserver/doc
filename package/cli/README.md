## 介绍
xs具有创建项目脚手架、快速生成store、页面、request等的全功能命令行工具, 基于commander实现。参考git命令行实现，[]表示可选的参数，<>表示必填参数。选项支持缩写的形式，所有缩写的选型均是大写。

## 安装
npm i -g @xunserver/cli

## 使用
### init 
初始化项目，默认支持git仓库和npm仓库下载，详情参考命令行提示，-h 或者--help。git仓库默认从xunserver/xunserver-template-xxx 下载,npm 仓库从xunserver-template 下载。

### add 
#### lint
通过问询的方式添加项目lint规则，使用会在项目中添加响应的lint规则， 包括eslint、stylelint、prettier、commitlint和editorconfig规则。

### pub
通过获取当前目录下的配置文件
