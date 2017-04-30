// 微信回复相关内容
function wechatReply(req, res, next) {
  // 微信输入信息都在req.weixin上
  const message = req.weixin
  res.reply({
    content: message.Content,
    type: 'text'
  })
}

module.exports = {
  wechatReply
}
