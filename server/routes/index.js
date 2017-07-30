// ./routes/index.js
const reviews = require('./reviews')

module.exports = app => {
  app.use('/reviews', reviews)
}
