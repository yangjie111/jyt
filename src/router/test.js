const Router = require('koa-router')
const testRouter = new Router({ prefix: "/test" })

testRouter.get('/', (ctx, next) => {
  console.log(1);
  ctx.body = '欢迎访问！'
})

module.exports = testRouter