const router = require('express').Router()
const logger = require('./libs/logger')

const User = require('./models').User

router.get('/', async (req, res, next) => {
  const user = new User({
    name: {name: 1},
    age: 123
  })
  try {
    await user.save()
  } catch(e) {
    logger.error(e.stack)
  }
  res.render('index.njk')
})

module.exports = router
