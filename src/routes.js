const router = require('express').Router()
const path = require('path')
const fs = require('mz/fs')
const wechat = require('wechat')
const logger = require('./libs/logger')

const User = require('./models').User

const wechatReply = require('./controllers/wechat').wechatReply

const config = {
  token: '12345',
  appid: 'wx1ce65521ad23e942',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
}

router.get('/', async function (req, res) {
  const manifest = await fs.readFile(path.resolve(__dirname, 'static/dist/manifest.json'))
  res.render('index.njk', { static: JSON.parse(manifest.toString()) })
})

router.use('/wechat',  wechat(config, wechatReply))

module.exports = router
