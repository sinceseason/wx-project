// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const app = new tcbRouter({event})

  app.use(async(ctx, next) => {
    ctx.data = {}
    ctx.data.openId = event.userInfo.openId
    await next()
  })

  app.router('music', async(ctx, next) => {
    ctx.data.musicName = '小青蛙'
    await next()
  }, async(ctx, next) => {
    ctx.data.musicType = '儿歌'
    ctx.body = {
      data: ctx.data
    }
  })

  app.router('movie', async(ctx, next) => {
    ctx.data.movieName = '怦然心动'
    await next()
  }, async(ctx, next) => {
    ctx.data.movieType = '情感片'
    ctx.body = {
      data: ctx.data
    }
  })

  return app.serve()
}