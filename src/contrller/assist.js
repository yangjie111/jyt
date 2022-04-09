const AssistService = require('../service/database/assist')


class AssistContrller {
  async getTagList(ctx, next) {
    const result = await AssistService.getTagsList()
    ctx.response.set('cache-control', 'max-age=604800')
    ctx.body = result
  }
}

module.exports = new AssistContrller()