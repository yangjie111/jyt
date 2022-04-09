const getWxAccessToken = require('../service/request/getWxAccessToken')
const sleep = require('./sleep')

const accessTokenData = {
  access_token: ''
}

async function loop() {
  while (1) {
    const res = await getWxAccessToken()
    accessTokenData.access_token = res.access_token
    console.log(accessTokenData.access_token);
    await sleep(6500000)
  }
}

loop()

module.exports = accessTokenData
