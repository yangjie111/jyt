const Router = require('koa-router')
const addRouter = new Router({ prefix: '/add' })

const { addSno } = require('../contrller/add')
const { jwtAuthToken } = require('../middleware/login')
const { authSno } = require('../middleware/authSno')
const reqLimit = require('../middleware/ratelimt')

addRouter.post('/sno', reqLimit(60000, 3), jwtAuthToken, authSno, addSno)

module.exports = addRouter