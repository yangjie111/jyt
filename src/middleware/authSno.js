const errorType = require('../constant/error-type')
const AuthService = require('../service/database/auth')

const authSno = async (ctx, next) => {
  const { sno } = ctx.request.body
  const { id } = ctx.verifyToken
  // 1.验证学号是否已经过期
  const result = await AuthService.authSno(sno)
  if (!result.length) {
    const err = new Error(errorType.AUTH_SNO_ERR)
    return ctx.app.emit('error', err, ctx)
  }
  // 2.验证该账号是否已经绑定学号
  const stuResult = await AuthService.authStu(id)
  if (stuResult[0].sno) {
    const err = new Error(errorType.SNO_IF_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  // 3.如果该账号没有绑定学号，就验证这个学号是否被其他账号绑定
  const snoIsBindingResult = await AuthService.authSnoIsBinding(sno)
  if (snoIsBindingResult[0].user_id) {
    const err = new Error(errorType.SNO_IF_EXISTS)
    return ctx.app.emit('error', err, ctx)
  }

  // 4.如果上述都不成立，就给该学生插入学号
  await next()
}

module.exports = { authSno }