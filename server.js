const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.json({
    name: 1
  })
})

app.listen(8080, () => console.log('server is running on port 8080'))
