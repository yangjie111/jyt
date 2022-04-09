const crypto = require('crypto')
const { WX_MSG_CHECK_TOKEN } = require('../constant/wxVerify')

class WxVerify {
  constructor(token = '') {
    this.token = token
  }
  checksig(token, timestamp, nonce, sig) {
    try {
      let sortList = [token, timestamp, nonce]
      sortList.sort()
      let sha = crypto.createHash('sha1');  // 加密
      sha.update(sortList.join(""))
      return sha.digest('hex') == sig
    } catch (e) {
      console.log(e, 'getSHA1 error')
    }
    return false
  }
}

module.exports = new WxVerify(WX_MSG_CHECK_TOKEN)