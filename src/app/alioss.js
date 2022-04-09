const Oss = require('ali-oss')
const config = require('../app/config/app_config')

const client = new Oss({
  region: config.ALIOSS_REGION,
  accessKeyId: config.ALIOSS_ACCESSKEYID,
  accessKeySecret: config.ALIOSS_ACCESSKEYSECRET,
  bucket: config.ALIOSS_BUCKET
})

// client.delete('20220401/1648822821811.png').then(res => {
//   console.log(res);
// }).catch(err => console.log(err))

module.exports = client