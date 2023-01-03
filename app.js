const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
// const port = 3000

// instantiate express
const app = express()

require('./src/middlewares/auth')

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		resave: false,
		cookie: {
			maxAge: 3600000,
		},
	})
)
app.use(passport.initialize())
app.use(passport.session())

// middlewares
app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./src/routes'))

module.exports = app
