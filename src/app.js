const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const bodyParser = require('body-parser')

const log4js = require('log4js')
const router = require('./routes')
const logger = require('./libs/logger')

const app = express()

// 数据库连接
require('./models')

// 相关中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// 静态资源目录
app.use('/static',express.static(path.join(__dirname, 'static')))

// 设置请求日志
app.use(log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.INFO }))

// 设置视图
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
})

// 路由引入
app.use(router)

// 错误全局处理
app.use(function (err, req, res, next) {
  if (!err) {
    return next()
  }
  let status = err.status ? err.status : 500
  logger.error(err.stack)
  res.status(status).render('500.njk', { message: err.message })
})

module.exports = app
