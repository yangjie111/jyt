const { WX_APPID, WX_SECRET } = require('../app/config/app_config')
const getCode2SessionUrl = (code) => {
  const queryString = `appid=${WX_APPID}&secret=${WX_SECRET}&js_code=${code}&grant_type=authorization_code`
  const url = `https://api.weixin.qq.com/sns/jscode2session?${queryString}`
  return url
}

const getMediaCheckUrl = (access_token) => {
  return `https://api.weixin.qq.com/wxa/media_check_async?access_token=${access_token}`
}

const getSendMsgUrl = (access_token) => {
  return `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`
}

module.exports = { getCode2SessionUrl, getMediaCheckUrl, getSendMsgUrl }