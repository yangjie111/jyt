const AddService = require('../service/database/add')

class AddContrller {
  async addSno(ctx,next){
    const {sno} = ctx.request.body
    const {id} = ctx.verifyToken
    try {
      await AddService.addSno(sno,id)
      await AddService.addUserId(sno,id)
      ctx.status = 200
      ctx.body = {
        message:"绑定成功"
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AddContrller()