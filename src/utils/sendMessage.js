const MomentService = require('../service/database/moment')
const sendMsg = require('../service/request/sendMsg')

const formatTime = require('./formatTime')

const sendMessage = async (openId, momentId, status) => {
  const createAt = await MomentService.getMomentCreateTimeById(momentId)
  const createAtTime = createAt[0][0].createAt
  sendMsg(openId, status, createAtTime).then(console.log).catch(console.log)
}

module.exports = sendMessage