const fs = require('fs')
const path = require('path')

class AvatarContrller {
  async avatarInfo(ctx, next) {
    const { id } = ctx.params
    const filePath = path.resolve(process.cwd(), 'src/assets/')
    const filesName = fs.readdirSync(filePath)
    const currentPath = path.resolve(filePath, filesName[id])
    // 声明是图片类型
    ctx.response.set('content-type', 'image/png')
    // 添加缓存，缓存时间为一个月
    ctx.response.set('cache-control', 'max-age=604800')
    // 以流方式返回
    ctx.body = fs.createReadStream(currentPath)
  }
}

module.exports = new AvatarContrller()