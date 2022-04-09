const axios = require('axios')

const mediaCheck = (url, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url,
      data
    }).then(res => resolve(res.data)).catch(reject)
  })
}

module.exports = { mediaCheck }