const Router = require('koa-router')
const addRouter = new Router({prefix:'/add'})

const {addSno} = require('../contrller/add')
const {jwtAuthToken} = require('../middleware/login')
const {authSno} = require('../middleware/authSno')

addRouter.post('/sno',jwtAuthToken,authSno,addSno)

module.exports = addRouter