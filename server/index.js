/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const mountRoutes = require('./routes')
mountRoutes(app)

// Static files
if (process.env.NODE_ENV !== 'production') {
  console.log('DEVELOPMENT ENVIRONMENT: Using WebPack Middleware...')
  const webpackDevHelper = require('./index.dev.js')
  webpackDevHelper.useWebpackMiddleware(app)
} else {
  console.log('PRODUCTION ENVIRONMENT')
  app.use(express.static(__dirname + '/../client/dist'))
  app.use('/*', express.static(__dirname + '/../client/dist'))
}

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
