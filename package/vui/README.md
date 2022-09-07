## 介绍
vu是vue3 + typescript实现ui框架，包括组件和网页开发中高频使用的service。使用@xunserver/style作为样式风格。

## 设计和技术栈
1. vue3 + typescript
2. rollup打包，支持esm和commonjs导入。
3. 支持dev调试模式，本地直接断点调试。

## 安装使用
### 全量引用
> npm i -D @xunserver/vui

在项目入口中引入样式和组件
```js
import Vue from 'vue';
import vui from '@xunserver/vui';
import '@xunserver/style/dist/index.css';

const app = Vue.createApp(AppVue).use(vui);
```

或者使用 @xunserver/cli中`xs add vui`

### 单个文件引入
支持单个组件按需引用。
```js
import Vue from 'vue';
import { button } from '@xunserver/vui';
import '@xunserver/style/dist/button.css';

const app = Vue.createApp(AppVue).use(button);
```

### 局部引入
```vue
<script setup>
import XsButton from '@xunserver/vui/dist/component/button';
import '@xunserver/style/dist/button.css';
</script>
```
