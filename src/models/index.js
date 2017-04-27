const mongoose = require('mongoose')
const config = require('../../config/config.default')

// 设置mongoose promise
mongoose.Promise = global.Promise

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    process.exit(1);
  }
})

// 数据模型
require('./user')

module.exports = {
  User: mongoose.model('User')
}
