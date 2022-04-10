const jwt = require('jsonwebtoken')
const errorType = require('../constant/error-type')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config/app_config')

const { getCode2SessionUrl } = require('../utils/spliceUrl')
const { verifyJWT } = require('../utils/verifyJWT')
const { getUserCredentials } = require('../service/request/login')

const AuthService = require('../service/database/auth')
const UserService = require('../service/database/user')

// 获取openid
const getOpenid = async (ctx, next) => {
  // 1.获取传递过来的code
  const { code } = ctx.request.body
  // 2.获取code、appid、appSecret拼接的url
  const code2SessionUrl = getCode2SessionUrl(code)
  try {
    // 3.获取openid和session_key
    const userCredentials = await getUserCredentials(code2SessionUrl)
    ctx.openid = userCredentials.openid
    // 4.控制权交给下一个中间件
    await next()
  } catch (error) {
    const err = new Error(errorType.SYSTEM_BUSY)
    ctx.app.emit('error', err, ctx)
  }
}

const create = async (ctx, next) => {
  const openid = ctx.openid
  // 验证该openid是否已经存在
  const result = await AuthService.authOpenid(openid)
  if (result.length) {
    const { id, name: userName, avatarIndex } = result[0]
    ctx.userInfo = { id, userName, avatarIndex, openid }
    await next()
  } else {
    const { avatarIndex, userName } = ctx.request.body
    const result = await UserService.create(avatarIndex, userName, openid)
    ctx.userInfo = { id: result.insertId, avatarIndex, userName, openid }
    await next()
  }
}

// 获取token
const getToken = async (ctx, next) => {
  const userInfo = ctx.userInfo
  // 1.获取token
  const token = jwt.sign(userInfo, PRIVATE_KEY, {
    expiresIn: '30 days',
    algorithm: 'RS256'
  })
  ctx.userInfo = { ...userInfo, token }
  await next()
}

// 验证token
const jwtAuthToken = async (ctx, next) => {
  const { sno } = ctx.request.body
  const { token } = ctx.header
  if (token) {
    try {
      const result = await verifyJWT(token)
      // 如果携带sno参数，就不对token进行sno验证
      if (!sno) {
        // 通过id去查用户信息
        const stuResult = await AuthService.authStu(result.id)
        if (!stuResult.length) {
          const err = new Error(errorType.NOT_USER)
          return ctx.app.emit('error', err, ctx)
        } else {
          // 该用户未绑定学号
          if (!stuResult[0].sno) {
            const err = new Error(errorType.NOT_SNO)
            return ctx.app.emit('error', err, ctx)
          } else {
            // 在这里验证学号是否有效
            const snoResult = await AuthService.authSno(stuResult[0].sno)
            if (snoResult.length) {
              ctx.verifyToken = result
              await next()
            } else {
              const err = new Error(errorType.AUTH_SNO_ERR)
              return ctx.app.emit('error', err, ctx)
            }
          }
        }
      } else {
        ctx.verifyToken = result
        await next()
      }
    } catch (error) {
      if (error.name = 'TokenExpiredError') {
        // token过期
        const err = new Error(errorType.TOKEN_OVERTIME)
        return ctx.app.emit('error', err, ctx)
      } else {
        const err = new Error(errorType.TOKEN_ERROR)
        return ctx.app.emit('error', err, ctx)
      }
    }
  } else {
    const err = new Error(errorType.NOT_TOKEN)
    return ctx.app.emit('error', err, ctx)
  }
}

module.exports = { getOpenid, create, getToken, jwtAuthToken }