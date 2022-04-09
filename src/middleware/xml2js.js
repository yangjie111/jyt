const parseXML = require('../utils/xml2js')
const getRawBody = require('../utils/getRawBody')

const getxmlAnd2Js = async (ctx, next) => {
  const { signature, timestamp, nonce, openid, encrypt_type, msg_signature } = ctx.query
  // 获取xml
  const xml = await getRawBody(ctx)
  // xml转json
  const { ToUserName, Encrypt } = await parseXML(xml)
  ctx.wxMediaCheck = {
    signature,
    timestamp,
    nonce,
    openid,
    encrypt_type,
    msg_signature,
    ToUserName,
    Encrypt
  }
  await next()
}

module.exports = {
  getxmlAnd2Js
}