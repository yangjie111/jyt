const connection = require('../../app/database')

class UserService {
  async create(avatarIndex,name,openid){
    try {
      const statement = `INSERT INTO user(name,avatarIndex,openid) VALUES (?, ?, ?);`
      const [result] = await connection.execute(statement,[name,avatarIndex,openid])
      return result
    } catch (error) {
      console.log(error,45454);
    }
  }
}

module.exports = new UserService()