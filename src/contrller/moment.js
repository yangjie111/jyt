const MomentService = require('../service/database/moment')
const { mediaCheckAsync } = require('../utils/dataStore')

class MomentContrller {
  async addMoment(ctx, next) {
    const userId = ctx.verifyToken.id
    const { describe, contactInfo, cost } = ctx.request.body
    const result = await MomentService.addMoment({ describe, contactInfo, cost, userId })
    ctx.body = {
      momentId: result.insertId,
      message: '创建成功'
    }
  }
  async addTags(ctx, next) {
    const { momentId } = ctx.params
    const tagList = ctx.request.body.tagList
    if (!tagList.length) return ctx.body = ''
    try {
      await MomentService.addTags(momentId, tagList)
      ctx.body = '添加标签成功'
    } catch (error) {
      console.log(error);
    }
  }
  async addFile(ctx, next) {
    const { momentId } = ctx.params
    const openid = ctx.verifyToken.openid
    const fileList = ctx.request.body.fileList
    if (!fileList.length) return ctx.body = ''
    try {
      // 添加图片到数据库
      await MomentService.addFile(momentId, fileList)
      // 将图片提交审核
      mediaCheckAsync(openid, fileList, momentId)
      ctx.body = '添加图片成功'
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentContrller()