const xml2js = require('../utils/xml2js')
const wxVerify = require('../utils/wxMsgCheck')
const handelFileCheck = require('../utils/handelFileCheck')
const Encrypt = require('../utils/wxMsgEncodeAndDecode')
const { WX_APPID } = require('../app/config/app_config')
const { WX_MSG_EncodingAESKey, WX_MSG_TOKEN } = require('../app/config/app_config')

const handelWxMsg = new Encrypt({
  appId: WX_APPID,
  EncodingAESKey: WX_MSG_EncodingAESKey,
  token: WX_MSG_TOKEN
})

class WxCallback {
  // 接受微信验证信息
  async wxMsgCheck(ctx, next) {
    const { timestamp, nonce, signature } = ctx.query
    console.log(timestamp, nonce, signature);
    let ret = wxVerify.checksig(wxVerify.token, timestamp, nonce, signature)
    if (ret) {
      ctx.body = ctx.query.echostr
    } else {
      console.error('wx check signature error')
      ctx.body = ''
    }
  }

  // 处理微信服务器消息推送，并且返回信息给微信服务器
  async wxMediaDecode(ctx, next) {
    // 获取消息推送数据
    const { Encrypt, timestamp, nonce, msg_signature } = ctx.wxMediaCheck
    // 验证消息是否来自微信
    const signature = handelWxMsg.genSign({ timestamp, nonce, Encrypt })
    // isWxMsg：true 是，false 否
    let isWxMsg = signature === msg_signature;
    if (!isWxMsg) return ctx.body = ''
    // 解密Encrypt
    const decodeEncryptdMsg = handelWxMsg.decode(Encrypt)
    // 解密结果是xml，转换成json
    const result = await xml2js(decodeEncryptdMsg)
    try {
      // 处理图片审核逻辑
      await handelFileCheck(result)
    } catch (error) {
      console.log(error);
    }
    // 设置响应头格式为text
    ctx.response.set('content-type', 'text')
    ctx.body = 'success'
  }
}

module.exports = new WxCallback()
