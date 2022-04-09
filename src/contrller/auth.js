const errorType = require('../constant/error-type')
const AuthService = require('../service/database/auth')

class AuthContrller {
  async authSno(ctx,next){
    const {sno} = ctx.request.body
    const result = await AuthService.authSno(sno)
    if(result.length){
      ctx.body = {stuName:result[0].stuName,message:'验证成功'}
    }else{
      const err = new Error(errorType.AUTH_SNO_ERR)
      return ctx.app.emit('error',err,ctx)
    }
  }
}

module.exports = new AuthContrller()