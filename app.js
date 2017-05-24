const Koa = require('koa')
const app = new Koa()
const onerror = require('koa-onerror')
const logger = require('koa-logger')

const index = require('./routes/index')

// error handler
onerror(app)

app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app
