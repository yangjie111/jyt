const connection = require('../../app/database')

class AddService {
  async addSno(sno,id){
    const statement = `UPDATE user SET sno = ? WHERE id = ?;`
    const result = await connection.execute(statement,[sno,id])
    return result
  }

  async addUserId(sno,id){
    const statement = `UPDATE snos SET user_id = ? WHERE sno = ?;`
    try {
      const result = await connection.execute(statement,[id,sno])
      return result
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AddService()