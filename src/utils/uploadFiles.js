const multer = require('koa-multer')
const path = require('path')

const uploadFiles = multer({
  storage: multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
})

module.exports = uploadFiles.array('file', 9)