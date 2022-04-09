const mysql = require('mysql2')
const config = require('./config/app_config')

const connection = mysql.createPool({
  port: config.MYSQL_PORT,
  host: config.MYSQL_HOST,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD,
  database: 'jyt'
})

connection.getConnection((err, connect) => {
  if (err) {
    console.log('数据库连接失败');
  } else {
    console.log('数据库连接成功');
  }
})

module.exports = connection.promise()