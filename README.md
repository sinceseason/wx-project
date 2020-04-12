# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)


## tabBar
框架 -> 全局属性 

# 小程序语法
## 获取data里的数据
```js
this.data.xxx
```

## 给data里的属性赋值
```js
this.setData({
  xxx: xxx
})
```

## 获取properties里的数据
```js
this.properties.xxx
```

## 选中后动态添加 class
```html
<view class="{{item.id == selectedId ? 'playing' : ''}}" bindtap="onSelect" data-musicid="{{item.id}}"></view>
onSelect(event) {
  this.setData({
    selectedId: event.currentTarget.dataset.musicid,
  })
}
```

## 路由跳转
### 触发：playlist.js
> 和 **app.json** 里定义的 **page** 相关
```js
wx.navigateTo({
  url: `../../pages/musiclist/musiclist?param=${param}`,
})
```
### 接受：musiclist.js
```js
onLoad: function (options) {
  // options: {param: ...param}
},
```

## 允许用户下拉刷新
```json
"enablePullDownRefresh": true
```

# 云函数语法
## tcb-router
> 基于 koa 风格的小程序·云开发云函数轻量级类路由库，主要用于优化服务端函数处理逻辑
```js
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({event})
  // ...do something
  return app.serve()
}
```

