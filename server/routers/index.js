const path = require('path')
const fs = require('fs')

module.exports = app => {
  fs.readdirSync(path.resolve(__dirname)).forEach(file => {
    if (file !== 'index.js') {
      const route = require(path.resolve(__dirname, file))
      app.use(route.routes()).use(route.allowedMethods())
    }
  })
}
