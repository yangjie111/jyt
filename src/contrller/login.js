const UserService = require('../service/database/user')

class LoginContrller {
  async login(ctx, next) {
    const userInfo = ctx.userInfo
    ctx.body = userInfo
  }
  async authToken(ctx, next) {
    ctx.body = '验证成功'
  }
}

module.exports = new LoginContrller()