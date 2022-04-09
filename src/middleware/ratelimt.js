const ratelimit = require('koa-ratelimit')

// redis连接实例或Map实例（内存）
const db = new Map()

/**
 * @param {Number} time 设置时间段，毫秒
 * @param {Number} maxCount 最大请求个数 
 * @returns asyncFunction
 */
// 限制api请求频率
const reqLimit = (time, maxCount) => {
  return ratelimit({
    driver: 'memory',
    db: db,
    duration: time,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: maxCount,
    disableHeader: false,
    whitelist: (ctx) => {
      // 白名单
      // 如果希望某些ip不受限制，在此处处理，返回true即可
    },
    blacklist: (ctx) => {
      // 黑名单
      // 如果希望限制某个ip，在此处处理，返回true即可
    }
  })
}

module.exports = reqLimit