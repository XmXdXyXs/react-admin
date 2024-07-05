const Koa = require('koa')
const cors = require('@koa/cors')
const routing = require('./routers/index')
const app = new Koa()

app.use(cors())

routing(app)
app.listen(8000, () => {
  console.log('8000 端口已经启动')
})
