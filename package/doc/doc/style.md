@xunserver/style 实现部分常用组件样式，类似于bootstrap
## 安装使用
> npm i -D @xunserver/style

```js
import "@xunserver/style/dist/index.css"  // 全部引用
import "@xunserver/style/dist/button.css"  // 部分引用
```
### 
<style>
@import '@xunserver/style/dist/index.css'
</style>

## button
默认前缀xs-btn，通过xs-btn-[xxx] 添加不同的样式

类型   
<!--@include: ../demo/style/button/type.html-->    

<<< @/../demo/style/button/type.html

large | small调整大小   
<!--@include: ../demo/style/button/size.html-->    

<<< @/../demo/style/button/size.html

round(圆角)、circle(圆形)   
<!--@include: ../demo/style/button/round.html-->    

<<< @/../demo/style/button/round.html

loading   
<!--@include: ../demo/style/button/loading.html-->    

<<< @/../demo/style/button/loading.html

## button-group
使用class="xs-btn-group" 包裹div
<!--@include: ../demo/style/button-group.html-->    

<<< @/../demo/style/button-group.html 
 

