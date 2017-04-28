const router = require('express').Router()
const wechat = require('wechat')
const logger = require('./libs/logger')

const User = require('./models').User

const wechatReply = require('./controllers/wechat').wechatReply

const config = {
  token: '12345',
  appid: 'wx1ce65521ad23e942',
  checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
}

router.get('/', function (req, res) {
  res.render('index.njk')
})

router.use('/wechat',  wechat(config, wechatReply))

module.exports = router
