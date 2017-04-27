const router = require('express').Router()
const logger = require('./libs/logger')

const User = require('./models').User

router.get('/', async (req, res, next) => {
  res.render('index.njk')
})

module.exports = router
