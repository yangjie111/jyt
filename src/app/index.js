const Koa = require('koa')
const useRouter = require('../router')
const bodyParser = require('koa-bodyparser')
const errorHandel = require('./errorHandel')

const app = new Koa()
app.useRouter = useRouter
app.use(bodyParser())
app.useRouter()
app.on('error',errorHandel)

module.exports = app

