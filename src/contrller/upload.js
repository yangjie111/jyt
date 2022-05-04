
class UploadContrller {
  async uploadMomentFile(ctx, next) {
    ctx.body = ctx.file
  }
}

module.exports = new UploadContrller()