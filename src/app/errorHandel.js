/**
 * 1001：没有token
 * 1102：提供了token，但是是错误的
 * 1103：提供了token，但是过期了
 * 1201：没有绑定学号
 * 1202：没有该学号
 * 1203：该账号已绑定学号
 * 1204：该账号已过期
 * 1205：该学号已经被绑定
 * 1206：参数错误
 * 1301：删除动态失败
 * 1400：服务繁忙
 */

const errorType = require('../constant/error-type')

function errorHandel(error, ctx) {
  let message, status, tokenStatus;
  switch (error.message) {
    case errorType.SYSTEM_BUSY:
      message = '系统繁忙，请稍后重试'
      status = 413
      break;
    case errorType.NOT_TOKEN:
      message = '请提供token'
      tokenStatus = { errCode: 1001 }
      status = 403
      break;
    case errorType.TOKEN_OVERTIME:
      message = '登录状态超时，请重新登录'
      status = 401
      tokenStatus = { errCode: 1103 }
      break;
    case errorType.TOKEN_ERROR:
      message = 'token无效'
      status = 401
      tokenStatus = { errCode: 1102 }
      break;
    case errorType.NOT_SNO:
      message = '未绑定学号'
      status = 401
      tokenStatus = { errCode: 1201 }
      break;
    case errorType.AUTH_SNO_ERR:
      message = '该学号已过期'
      status = 401
      tokenStatus = { errCode: 1202 }
      break;
    case errorType.SNO_IF_EXISTS:
      message = '该账号已绑定学号'
      status = 401
      tokenStatus = { errCode: 1203 }
      break;
    case errorType.NOT_USER:
      message = '该账号以过期'
      status = 401
      tokenStatus = { errCode: 1204 }
      break;
    case errorType.SNO_IS_BINDING:
      message = '该学号已经被绑定'
      status = 401
      tokenStatus = { errCode: 1205 }
      break;
    case errorType.BUSY_SERVICE:
      message = '服务繁忙，请稍后重试'
      status = 408
      tokenStatus = { errCode: 1400 }
      break;
    case errorType.PARAMS_ERROR:
      message = '内容错误'
      status = 412
      tokenStatus = { errCode: 1206 }
      break;
    case errorType.DELETE_ERROR:
      message = '删除失败'
      status = 403
      tokenStatus = { errCode: 1301 }
      break;

    default:
      message = 'NOT FOUND'
      status = 404
  }
  ctx.status = status
  ctx.body = {
    message,
    ...tokenStatus
  }
}

module.exports = errorHandel