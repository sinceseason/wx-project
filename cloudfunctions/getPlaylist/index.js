// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise')

cloud.init()

const url = 'http://musicapi.xiecheng.live/personalized'
const db = cloud.database()
const connection = db.collection('playlist')
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {
  // const list = await connection.get()
  let list = []
  const rsCount = await connection.count()
  const total = rsCount.total
  let batchTimes = Math.ceil(total / MAX_LIMIT)
  let tasks = []
  for(let i = 0; i < batchTimes; i++) {
    let queryPromise = connection.skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(queryPromise)
  }
  if(tasks.length) {
    list = (await Promise.all(tasks)).reduce((prev, cur) => {
      return {data: [...prev.data, ...cur.data]}
    })
  }

  const playlist = await rp(url).then(res => JSON.parse(res).result)
  let len = playlist.length
  let result = [];

  // 歌单去重
  for(let j = 0; j < len; j++) {
    let flag = true
    for(let i = 0, len1 = list.data.length; i < len1; i++) {
      if(playlist[j].id === list.data[i].id) {
        flag = false
        break
      }
    }
    if(flag) {
      result.push(playlist[j])
    }
  }

  if(result.length) {
    for(let i = 0; i < result.length; i++) {
      connection.add({
        data: {
          ...result[i],
          createTime: db.serverDate(),
        }
      }).then(res => {
        console.log('成功!')
      }).catch(err => {
        console.error('失败了=>', err)
      })
    }
  } else {
    console.log('没有新增数据')
  }
}