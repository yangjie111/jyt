const Router = require('koa-router')
const aaaRouter = new Router({ prefix: "/" })

aaaRouter.get('/', (ctx, next) => {
  console.log(1);
  ctx.body = '欢迎访问！'
})

module.exports = aaaRouter