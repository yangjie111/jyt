const MomentService = require('../service/database/moment')
const { momentMap, traceIdMap } = require('./dataStore')
const sendMessage = require('./sendMessage')

// 处理审核逻辑
const handelFileCheck = async (checkResult) => {
  // 如果事件类型不是图片检查类型就直接返回
  if (!(checkResult.Event === 'wxa_media_check')) return
  /**
   * checkArr：用于存放所有的审核结果
   * trace_id：获取审核id
   * monentId：根据审核id获取动态id
   */
  const checkArr = []
  const trace_id = checkResult.trace_id
  const { momentId, openId } = traceIdMap.get(trace_id)
  // 1.如果结果是有风险的，直接发送订阅消息，并且修改数据库里面动态的审核状态
  if (checkResult.detail.suggest === 'risky') {
    traceIdMap.delete(trace_id)
    momentMap.delete(momentId)
    // 修改动态状态
    await MomentService.updateStatus(Number(momentId), 2)
    // 发送审核失败结果通知
    return sendMessage(openId, momentId, 0)
  }
  // 根据动态id获取到该动态的审核结果
  const fileCheckResult = momentMap.get(momentId)
  // 赋值审核结果
  fileCheckResult[trace_id] = checkResult.detail.suggest
  // 取出所有的审核记过
  Object.keys(fileCheckResult).forEach(item => {
    checkArr.push(fileCheckResult[item])
  })
  console.log(checkArr);
  if (!checkArr.includes('')) {
    traceIdMap.delete(trace_id)
    momentMap.delete(momentId)
    // 修改动态状态
    await MomentService.updateStatus(Number(momentId), 1)
    // 发送审核成功结果通知
    sendMessage(openId, momentId, 1)
  }
}

module.exports = handelFileCheck