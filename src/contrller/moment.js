const MomentService = require('../service/database/moment')
const { mediaCheckAsync } = require('../utils/dataStore')
const errorType = require('../constant/error-type')

// 参数错误
const globalErr = new Error(errorType.PARAMS_ERROR)

class MomentContrller {
  /**
   * 添加数据
   */
  async addMoment(ctx, next) {
    const userId = ctx.verifyToken.id
    const { describe, contactInfo, cost } = ctx.request.body

    if (!describe || !contactInfo || !cost) return ctx.app.emit('error', globalErr, ctx)
    try {
      const result = await MomentService.addMoment({ describe, contactInfo, cost, userId })
      ctx.body = {
        momentId: result.insertId,
        message: '创建成功'
      }
    } catch (error) {
      const err = new Error(errorType.BUSY_SERVICE)
      return ctx.app.emit('error', err, ctx)
    }
  }
  async addTags(ctx, next) {
    const { momentId } = ctx.params
    const tagList = ctx.request.body.tagList
    if (!tagList.length) return ctx.app.emit('error', globalErr, ctx)
    try {
      await MomentService.addTags(momentId, tagList)
      ctx.body = '添加标签成功'
    } catch (error) {
      console.log(error);
      const err = new Error(errorType.BUSY_SERVICE)
      return ctx.app.emit('error', err, ctx)
    }
  }
  async addFile(ctx, next) {
    const { momentId } = ctx.params
    const openid = ctx.verifyToken.openid
    const fileList = ctx.request.body.fileList
    if (!momentId || !fileList.length) return ctx.app.emit('error', globalErr, ctx)
    try {
      // 添加图片到数据库
      await MomentService.addFile(momentId, fileList)
      // 将图片提交审核
      mediaCheckAsync(openid, fileList, momentId)
      ctx.body = '添加图片成功'
    } catch (error) {
      console.log(error);
      const err = new Error(errorType.BUSY_SERVICE)
      return ctx.app.emit('error', err, ctx)
    }
  }
  /**
   * 获取数据
  */
  async getMomentData(ctx, next) {
    const { offset, tagId, userId } = ctx.query
    try {
      const result = await MomentService.getMomentDataByStatus(offset, tagId, userId)
      const hasMore = result.length >= 10 || false
      ctx.body = {
        result,
        hasMore,
        message: '获取成功'
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getMomentDataByUId(ctx, next) {
    const { offset, momentStatus } = ctx.query
    const { userId } = ctx.params
    const result = await MomentService.getMomentDataByUIdAndStatus(userId, offset, momentStatus)
    const hasMore = result.length >= 10 || false
    ctx.body = {
      message: '获取成功',
      result,
      hasMore
    }
  }
  async getMomentDetailByMId(ctx, next) {
    const { momentId } = ctx.params
    const { userId } = ctx.query
    const result = await MomentService.getMomentDetailById(momentId, userId)
    ctx.body = {
      result,
      message: '获取成功'
    }
  }

  /**
   * 删除数据
  */
  async deleteMomentByMId(ctx, next) {
    const momentId = ctx.params.momentId
    try {
      await MomentService.deleteMomentByMId(momentId)
      ctx.body = {
        message: '删除成功'
      }
    } catch (error) {
      const err = new Error(errorType.DELETE_ERROR)
      ctx.app.emit('error', err, ctx)
    }
  }

  /**
   * 收藏 
  */
  async momentCollect(ctx, next) {
    const { id: userId } = ctx.verifyToken
    const { momentId, collectCount } = ctx.params
    const { isDelete } = ctx.request.body
    if (!['1', '-1'].includes(collectCount)) {
      ctx.status = 400
      ctx.body = { message: '' }
      return
    }
    try {
      await MomentService.addCollect(momentId, userId, isDelete)
      await MomentService.momentCollect(momentId, collectCount)
      ctx.body = {
        message: '成功'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getCollectMomentByUId(ctx, next) {
    const { userId } = ctx.params
    const { offset } = ctx.query
    const result = await MomentService.getMomentCollectByUId(userId, offset)
    const hasMore = result.length >= 10 || false
    ctx.body = {
      hasMore,
      result,
      message: '获取成功'
    }
  }
}

module.exports = new MomentContrller()