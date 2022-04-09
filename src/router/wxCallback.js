const Router = require('koa-router')
const wxRouter = new Router()

const { getxmlAnd2Js } = require('../middleware/xml2js')
const { wxMsgCheck, wxMediaDecode, wxMediaCheckCbk } = require('../contrller/wxCallback')

// 验证微信发送的信息
wxRouter.get('/', wxMsgCheck)

// 图片审核的回调信息
wxRouter.post('/', getxmlAnd2Js, wxMediaDecode)

module.exports = wxRouter