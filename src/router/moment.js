const Router = require('koa-router')
const momentRouter = new Router({ prefix: "/moment" })

const { addMoment, addTags, addFile } = require('../contrller/moment')
const reqLimit = require('../middleware/ratelimt')
const { jwtAuthToken } = require('../middleware/login')

momentRouter.post('/add', reqLimit(60000, 3), jwtAuthToken, addMoment)
momentRouter.post('/:momentId/addTags', jwtAuthToken, addTags)
momentRouter.post('/:momentId/addFile', jwtAuthToken, addFile)

module.exports = momentRouter