// ./routes/index.js
var reviews = require('./reviews')
var auth = require('./auth')
var verifyToken = require('../../middlewares/verifyToken')

module.exports = app => {
  app.use('/auth', auth)
  app.use('/reviews', verifyToken, reviews)
}
