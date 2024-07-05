const Koa = require('koa')
const cors = require('@koa/cors')
const routing = require('./routers/index')
const app = new Koa()
app.use(cors())
routing(app)
app.listen(9000, () => {
  console.log('9000 端口已经启动')
})
