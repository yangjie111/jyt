const fs = require('fs')

const userRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file === 'index.js') return
    const router = require(`./${file}`)
    if(JSON.stringify(router) === '{}') return
    this.use(router.routes())
    this.use(router.allowedMethods())
  })
}

module.exports = userRoutes