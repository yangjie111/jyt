const Router = require('koa-router')
const assistRouter = new Router()

const {getTagList} = require('../contrller/assist')

assistRouter.get('/tagList',getTagList)

module.exports = assistRouter