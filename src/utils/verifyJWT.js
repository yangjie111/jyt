const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config/app_config')

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, PUBLIC_KEY, (err, decoded) => {
      if (err) {
        reject(err)
      }
      if (decoded) {
        resolve(decoded)
      }
    })
  })
}

module.exports = { verifyJWT }