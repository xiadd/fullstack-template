const log4js = require('log4js')

log4js.configure({
  appenders: [
    {
      type: 'DateFile',
      filename: 'logs/access.log',
      category: 'access'
    },
    {
      type: 'DateFile',
      filename: 'logs/error.log',
      pattern: '-yyyy-MM-dd.log',
      // alwaysIncludePattern: true,
      category: 'error'
    }
  ]
})

module.exports = log4js.getLogger('error')
