const Router = require('koa-router')
const UploadRouter = new Router({ prefix: "/upload" })

const uploadFile = require('../middleware/uploadFile')
const { uploadMomentFile } = require('../contrller/upload')
const { handelMomentFiles } = require('../middleware/handelMomentFiles')

UploadRouter.post('/momentFile', uploadFile, handelMomentFiles)

module.exports = UploadRouter