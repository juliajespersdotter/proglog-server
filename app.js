const express = require('express')
const cors = require('cors')
const logger = require('morgan')
// const port = 3000

// instantiate express
const app = express()

// middlewares
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// kommer automatiskt utgå från index.js om den finns
app.use(require('./src/routes'))

module.exports = app
