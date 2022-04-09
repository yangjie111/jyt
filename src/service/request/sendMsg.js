const axios = require('axios')
const accessToken = require('../../utils/getAccessToken')
const { getSendMsgUrl } = require('../../utils/spliceUrl')

const sengMsg = async (openId, status, createAtTime) => {
  console.log(openId);
  const url = getSendMsgUrl(accessToken.access_token)
  const data = {
    touser: openId,
    template_id: "gW--skfc3AFfJQ0U1mhRFdshrhNwZjSFLt2dMTJGqnI",
    page: "index",
    miniprogram_state: "developer",
    lang: "zh_CN",
    data: {
      phrase2: {
        value: status ? '已通过' : '未通过'
      },
      phrase3: {
        value: status ? '审核通过' : '未通过'
      },
      time4: {
        value: createAtTime
      }
    }
  }
  console.log(data);
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'POST',
      data
    }).then(res => resolve(res.data)).catch(reject)
  })
}

module.exports = sengMsg