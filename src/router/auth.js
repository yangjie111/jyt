const Router = require('koa-router')
const authRouter = new Router({ prefix: '/auth' })

const { authSno } = require('../contrller/auth')

authRouter.post('/sno', authSno)

module.exports = authRouter