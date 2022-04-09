const Router = require('koa-router')
const loginRouter = new Router({prefix:'/login'})

const {getOpenid,create,getToken,jwtAuthToken} = require('../middleware/login')
const {login,authToken} = require('../contrller/login')

// getOpenid：获取用户信息，包括openid
// getToken：获取token
// create：创建用户
// login：返回用户信息，登录成功
loginRouter.post('/',getOpenid,create,getToken,login)

// 验证token
// jwtAuthToken：验证token
// authToken：验证成功
loginRouter.post('/auth',jwtAuthToken,authToken)

module.exports = loginRouter