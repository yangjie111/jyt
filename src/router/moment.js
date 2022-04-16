const Router = require('koa-router')
const momentRouter = new Router({ prefix: "/moment" })

const {
  addMoment,
  addTags,
  addFile,
  getMomentData,
  getMomentDataByUId,
  getMomentDetailByMId,
  deleteMomentByMId,
  momentCollect,
  getCollectMomentByUId
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

// 根据动态id删除数据
momentRouter.delete('/:momentId', deleteMomentByMId)

// 动态收藏
momentRouter.post('/:momentId/:collectCount', reqLimit(60000, 12), jwtAuthToken, momentCollect)
momentRouter.get('/collect/:userId', getCollectMomentByUId)

module.exports = momentRouter