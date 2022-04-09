const axios = require('axios')
const config = require('../../app/config/app_config')

const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.WX_APPID}&secret=${config.WX_SECRET}`

const getWxAccessToken = (appId, appSecret) => {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => {
      if (res.errcode) {
        reject(res.errcode)
      }
      resolve(res.data)
    })
  })
}

module.exports = getWxAccessToken