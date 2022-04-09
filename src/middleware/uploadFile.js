const multer = require('koa-multer')
const path = require('path')

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: './upload/files',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
})

module.exports = uploadFile.single('file')