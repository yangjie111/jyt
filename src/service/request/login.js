const axios = require('axios')

const getUserCredentials = (url) => {
  return new Promise((resolve,reject) => {
    axios.get(url).then(res => {
      if(res.errcode){
        reject(res.errcode)
      }
      resolve(res.data)
    })
  })
}

module.exports = {getUserCredentials}