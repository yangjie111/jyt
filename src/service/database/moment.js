const connection = require('../../app/database')
const config = require('../../app/config/app_config')
const getStatementByTagId = require('../../utils/getStatementByTagId')
const { isDelete: isDeleteCollect } = require('../../utils/isDeleteCollect')

class MomentService {
  // 添加数据
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

  // 获取数据
  async getMomentCreateTimeById(momentId) {
    const statement = `SELECT DATE_FORMAT(createAt,'%Y-%m-%d %H:%i:%S') createAt FROM moment WHERE id = ?`
    const result = await connection.execute(statement, [momentId])
    return result
  }

  async getMomentDataByStatus(offset = 0, tagId, userId) {
    const statement = `
    SELECT 
    m.id,m.describe,m.cost,m.collect_count,
    (SELECT COUNT(*) FROM collect_user cu WHERE cu.moment_id = m.id AND cu.user_id = ?) 'isCollect',
    JSON_OBJECT('id',m.user_id,'avatar',CONCAT('${config.APP_HOST}:${config.APP_PORT}','/avatar/',(SELECT avatarIndex FROM user u WHERE m.user_id = u.id))) 'user',
    (SELECT fileUrl FROM file WHERE file.moment_id = m.id LIMIT 1) 'img'
    ${getStatementByTagId(tagId)}
    GROUP BY m.id
    ORDER BY m.createAt DESC
    LIMIT 10 OFFSET ${offset}`;
    const [result] = await connection.execute(statement, Number(tagId) ? [userId, tagId] : [userId])
    return result
  }

  async getMomentDataByUIdAndStatus(userId, offset, momentStatus) {
    const statement = `SELECT 
    m.id,m.describe,m.contactInfo,m.cost,
    JSON_OBJECT('id',m.user_id,'avatar',CONCAT('${config.APP_HOST}:${config.APP_PORT}','/avatar/',(SELECT avatarIndex FROM user u WHERE m.user_id = u.id))) 'user',
    (SELECT fileUrl FROM file WHERE file.moment_id = m.id LIMIT 1) 'img',
    DATE_FORMAT(createAt,'%Y-%m-%d %H:%i:%S') createAt
    FROM moment m 
    JOIN file f ON m.id = f.moment_id
    WHERE m.user_id = ? AND m.moment_status = ?
    GROUP BY m.id
    ORDER BY m.createAt DESC
    LIMIT 10 OFFSET ${offset}`;
    const [result] = await connection.execute(statement, [userId, momentStatus])
    return result
  }
  async getMomentDetailById(momentId, userId) {
    const statement = `
    SELECT 
    m.id,m.describe,m.contactInfo,m.cost,m.collect_count,
    (SELECT COUNT(*) FROM collect_user cu WHERE cu.moment_id = m.id AND cu.user_id = ?) 'isCollect',
    JSON_OBJECT('userId',m.user_id,'name',us.name,'avatar',CONCAT('${config.APP_HOST}:${config.APP_PORT}','/avatar/',us.avatarIndex)) 'user',
    (SELECT JSON_ARRAYAGG(f.fileUrl) FROM file f WHERE f.moment_id = ? GROUP BY f.moment_id) 'imgurl',
    IF(COUNT(t.id),JSON_ARRAYAGG(JSON_OBJECT('tid',t.id,'tname',t.tname)),JSON_ARRAY()) 'tagList'
    FROM moment m 
    JOIN user us ON m.id = ? AND us.id = m.user_id
    LEFT JOIN moment_tag mt ON mt.moment_id = ? AND m.id = ?
    LEFT JOIN tags t ON t.id = mt.tag_id
    GROUP BY m.id`
    try {
      const [result] = await connection.execute(statement, [userId, momentId, momentId, momentId, momentId])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  // 删除数据
  async deleteMomentByMId(momentId) {
    const statement = `DELETE FROM moment m WHERE m.id = ?`
    await connection.execute(statement, [momentId])
  }

  // 收藏
  async addCollect(momentId, userId, isDelete) {
    const statement = `${isDeleteCollect(isDelete)}`
    await connection.execute(statement, [momentId, userId])
  }

  async momentCollect(momentId, collectCount) {
    const statement = `UPDATE moment m SET m.collect_count = m.collect_count + ? WHERE m.id = ? ${Number(collectCount) > 0 ? '' : 'AND m.collect_count >= 0'}`
    await connection.execute(statement, [collectCount, momentId])
  }

  async getMomentCollectByUId(userId, offset) {
    const statement = `
    SELECT 
    m.id,m.describe,m.collect_count,m.cost,
    JSON_OBJECT('id',m.user_id,'avatar',CONCAT('http://120.26.2.118:8884','/avatar/',(SELECT avatarIndex FROM user u WHERE m.user_id = u.id))) 'user',
    (SELECT fileUrl FROM file WHERE file.moment_id = m.id LIMIT 1) 'img'
    FROM collect_user cu JOIN moment m ON cu.moment_id = m.id AND cu.user_id = ?
    JOIN file f ON m.id = f.moment_id
    ORDER BY m.createAt DESC
    LIMIT 10 OFFSET ${offset}`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new MomentService()