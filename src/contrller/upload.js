
class UploadContrller {
  async uploadMomentFile(ctx, next) {
    console.log(ctx.file);
    ctx.body = ctx.file
  }
}

module.exports = new UploadContrller()