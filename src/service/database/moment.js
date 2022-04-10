const connection = require('../../app/database')
const config = require('../../app/config/app_config')

class MomentService {
  async addMoment(basicData) {
    const { describe, contactInfo, cost, userId } = basicData
    const statement = 'INSERT INTO moment(`describe`,`contactInfo`,`cost`,`user_id`,`moment_status`) VALUES (?, ?, ?, ?, ?)'
    try {
      const [result] = await connection.execute(statement, [describe, contactInfo, cost, userId, 0])
      return result
    } catch (error) {
      console.log(error);
    }
  }
  async addTags(momentId, tagList) {
    const statement = `INSERT INTO moment_tag(moment_id,tag_id) VALUES(?, ?)`
    for (let i = 0; i < tagList.length; i++) {
      try {
        await connection.execute(statement, [Number(momentId), Number(tagList[i])])
      } catch (error) {
        console.log(error, '插入标签失败');
      }
    }
  }
  async addFile(momentId, fileList) {
    const statement = `INSERT INTO file(fileName,fileUrl,moment_id) VALUES(?, ?, ?)`
    for (let i = 0; i < fileList.length; i++) {
      const { name, url } = fileList[i]
      try {
        await connection.execute(statement, [name, url, Number(momentId)])
      } catch (error) {
        console.log(error, '插入标签失败');
      }
    }
  }
  async updateStatus(momentId, status) {
    const statement = `UPDATE moment SET moment_status = ? WHERE id = ?;`
    const result = await connection.execute(statement, [status, momentId])
    return result[0]
  }

  async getMomentCreateTimeById(momentId) {
    const statement = `SELECT DATE_FORMAT(createAt,'%Y-%m-%d %H:%i:%S') createAt FROM moment WHERE id = ?`
    const result = await connection.execute(statement, [momentId])
    return result
  }

  async getMomentDataByStatus(count = 10, offset = 0) {
    const statement = `
    SELECT 
    m.id,m.describe,m.contactInfo,m.cost,
    JSON_OBJECT('id',m.user_id,'avatar',CONCAT('${config.APP_HOST}:${config.APP_PORT}','/avatar/',(SELECT avatarIndex FROM user u WHERE m.user_id = u.id))) 'user',
    (SELECT fileUrl FROM file WHERE file.moment_id = m.id LIMIT 1) 'img'
    FROM moment m 
    JOIN file f ON m.id = f.moment_id
    GROUP BY m.id
    LIMIT ${count} OFFSET ${offset}`;
    const [result] = await connection.execute(statement)
    return result
  }
}

module.exports = new MomentService()