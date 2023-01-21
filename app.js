const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const passport = require('passport')
require('dotenv').config()
const session = require('express-session')

// instantiate express
const app = express()

require('./src/middlewares/passport')

// middlewares
app.use(logger('dev'))
app.use(
	cors({
		origin: [
			`${process.env.FRONTEND_URL}`,
			`${process.env.FRONTEND_URL}/login`,
			'http://localhost:5173/login',
			'http://127.0.0.1:5173',
		],
		credentials: true,
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: 3600000,
		},
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.use(require('./src/routes'))

module.exports = app
