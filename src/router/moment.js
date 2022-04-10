const Router = require('koa-router')
const momentRouter = new Router({ prefix: "/moment" })

const { addMoment, addTags, addFile, getMomentData } = require('../contrller/moment')
const reqLimit = require('../middleware/ratelimt')
const { jwtAuthToken } = require('../middleware/login')

// 添加动态数据
momentRouter.post('/add', reqLimit(60000, 3), jwtAuthToken, addMoment)
momentRouter.post('/:momentId/addTags', jwtAuthToken, addTags)
momentRouter.post('/:momentId/addFile', jwtAuthToken, addFile)

// 获取动态数据
momentRouter.get('/', getMomentData)

module.exports = momentRouter