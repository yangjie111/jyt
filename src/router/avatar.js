const Router = require('koa-router')
const avatarRouter = new Router({prefix:'/avatar'})

const {avatarInfo} = require('../contrller/avatar')

avatarRouter.get('/:id',avatarInfo)

module.exports = avatarRouter