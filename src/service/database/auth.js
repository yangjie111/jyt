const connection = require('../../app/database')

class AuthService {
  async authSno(sno){
    const statement = `SELECT * FROM snos WHERE sno = ?;`
    try {
      const result = await connection.execute(statement,[sno])
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
  
  async authOpenid(openId){
    const statement = `SELECT * FROM user WHERE openid = ?;`
    try {
      const [result] = await connection.execute(statement,[openId])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async authStu(id){
    const statement = `SELECT * FROM user WHERE id = ?;`
    try {
      const [result] = await connection.execute(statement,[id])
      return result
    } catch (error) {
      console.log(error);
    }
  }

  async authSnoIsBinding(sno){
    const statement = `SELECT * FROM snos WHERE sno = ?;`
    try {
      const [result] = await connection.execute(statement,[sno])
      return result
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthService()