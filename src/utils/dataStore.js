const accessToken = require('./getAccessToken')
const { mediaCheck } = require('../service/request/mediaCheckAsync')
const { getMediaCheckUrl } = require('./spliceUrl')

// 记录动态的图片审核结果
// 0：审核中
// 1：审核通过
// 2.：审核不通过
const momentMap = new Map()

// 记录图片的审核id属于哪个动态
const traceIdMap = new Map()


function mediaCheckAsync(openId, fileList, momentId) {
  const url = getMediaCheckUrl(accessToken.access_token)
  const data = {
    openid: openId,
    scene: 2,
    version: 2,
    media_type: 2
  }
  for (let i = 0; i < fileList.length; i++) {
    // 将所有图片上传进行审核
    mediaCheck(url, Object.assign({ ...data, media_url: fileList[i].url }))
      .then(res => {
        // 审核唯一id
        const trace_id = res.trace_id
        // 将图片的审核id和动态id绑定在一起，后面拿到审核图片的审核结果的时候方便知道是哪个动态的
        traceIdMap.set(trace_id, { momentId, openId })
        // 将审核id和动态id绑定一起，默认添加默认值0，代表审核中
        if (momentMap.get(momentId)) {
          const value = momentMap.get(momentId)
          value[trace_id] = ""
        } else {
          momentMap.set(momentId, { [trace_id]: "" })
        }
      })
      .catch(console.log)
  }
}

module.exports = {
  mediaCheckAsync,
  momentMap,
  traceIdMap
}
