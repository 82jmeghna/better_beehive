const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const PORT = process.env.PORT || 3000
const app = express()

// Middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Routes
const index = require('./routes')
app.use('/', index)
app.use(express.static(__dirname + '/../client/dist'))

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
