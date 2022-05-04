const errorType = require('../constant/error-type')
const AuthService = require('../service/database/auth')

const authSno = async (ctx, next) => {
  const { sno, phone } = ctx.request.body
  const { id } = ctx.verifyToken
  // 1.验证学号是否已经过期
  const result = await AuthService.authSno(sno)
  if (!result.length) {
    const err = new Error(errorType.AUTH_SNO_ERR)
    return ctx.app.emit('error', err, ctx)
  }
  // 2.验证传入的手机号与学号信息是否匹配
  if (![result[0].phone, result[0].contact_info].includes(phone)) {
    const err = new Error(errorType.SNO_MISMATCH)
    return ctx.app.emit('error', err, ctx)
  }
  // 3.验证该账号是否已经绑定学号
  const stuResult = await AuthService.authStu(id)
  if (stuResult[0].sno) {
    const err = new Error(errorType.SNO_IF_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }
  // 4.如果该账号没有绑定学号，就验证这个学号是否被其他账号绑定
  if (result[0].user_id) {
    const err = new Error(errorType.SNO_IF_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  // 4.如果上述都不成立，就给该学生插入学号
  await next()
}

module.exports = { authSno }