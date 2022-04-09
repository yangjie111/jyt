const client = require('../app/alioss')
const fs = require('fs')
const { getCurrentTime } = require('../utils/getCurrentTime')

const handelMomentFiles = async (ctx, next) => {
  const { destination, filename } = ctx.req.file
  try {
    // 上传图片到阿里云
    const result = await client.put(`${getCurrentTime()}/${filename}`, `${destination}/${filename}`)
    // 获取图片名字和url
    const { name, url } = result
    // 删除保存到本地的图片
    fs.unlinkSync(`${destination}/${filename}`)
    // 将结果返回
    ctx.body = {
      name,
      url
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handelMomentFiles
}