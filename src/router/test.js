const Router = require('koa-router')
const testRouter = new Router({ prefix: "/test" })

testRouter.get('/', (ctx, next) => {
  ctx.body = '欢迎访问！'
})

module.exports = testRouter