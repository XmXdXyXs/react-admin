const Router = require('@koa/router')

const router = new Router({ prefix: '/user' })

router.get('/list', ctx => {
  let userList = []

  for (let i = 0; i < 10; i++) {
    userList.push({
      id: i,
      name: `test-${i}`
    })
  }
  ctx.body = {
    message: 'success',
    code: '00000',
    data: userList
  }
})

module.exports = router
