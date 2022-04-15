const Router = require('koa-router')
const momentRouter = new Router({ prefix: "/moment" })

const {
  addMoment,
  addTags,
  addFile,
  getMomentData,
  getMomentDataByUId,
  getMomentDetailByMId
} = require('../contrller/moment')
const reqLimit = require('../middleware/ratelimt')
const { jwtAuthToken } = require('../middleware/login')

// 添加动态数据
momentRouter.post('/add', reqLimit(60000, 3), jwtAuthToken, addMoment)
momentRouter.post('/:momentId/addTags', jwtAuthToken, addTags)
momentRouter.post('/:momentId/addFile', jwtAuthToken, addFile)

// 获取动态数据
momentRouter.get('/', getMomentData)

// 根据用户id获取动态数据
momentRouter.get('/:userId', getMomentDataByUId)

// 根据动态id获取单个动态的详情
momentRouter.get('/detail/:momentId', getMomentDetailByMId)

module.exports = momentRouter