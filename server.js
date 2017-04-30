const app = require('./src/app')


if (process.env.NODE_ENV === 'development') {
  // 开发配置
  const devServerApp = require('./webpack/dev-server')
  app.use('/static',devServerApp)
}

app.listen(8080, () => console.log('server is running on port 8080'))
