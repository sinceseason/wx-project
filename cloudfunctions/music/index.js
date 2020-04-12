// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require('tcb-router')
const rp = require('request-promise')

const BASE_URL = 'http://musicapi.xiecheng.live'

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('music云函数 event ===', event)
  const app = new tcbRouter({event})

  app.router('playlist', async(ctx, next) => {
    ctx.body = await cloud.database().collection('playlist')
    .skip(event.start)
    .limit(event.count)
    .orderBy('createTime', 'desc')
    .get()
    .then(res => res)
    .catch(err => err)
  })

  app.router('musicList', async(ctx, next) => {
    ctx.body = await rp(`${BASE_URL}/playlist/detail?id=${parseInt(event.playlistId)}`)
    .then(res => {
      return JSON.parse(res);
    })
  })

  return app.serve()
}