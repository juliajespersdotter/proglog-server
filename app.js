const express = require('express')
const cors = require('cors')
const logger = require('morgan')
// const port = 3000

// instantiate express
const app = express()

// app.get('/', (req, res) => {
// 	res.send('hello world')
// })

// middlewares
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./src/routes'))

module.exports = app
