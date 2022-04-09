const connection = require('../../app/database')

class AssistService {
  async getTagsList() {
    const statement = `SELECT id,tname FROM tags`
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new AssistService()

// {
//   "openid": "OPENID", 
//   "scene": 1, 
//   "version":2, 
//   "media_url":"https://developers.weixin.qq.com/miniprogram/assets/images/head_global_z_@all.png",
//   "media_type":2 
// } 
// 'https://api.weixin.qq.com/wxa/media_check_async?access_token=ACCESS_TOKEN'