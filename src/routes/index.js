const express = require('express')
const router = express.Router()
const passport = require('passport')
// const auth = require('../middlewares/auth')
// const authController = require('../controllers/auth_controller')
// const userValidationRules = require('../validation/user')

router.get('/', (req, res, next) => {
	// res.send('<a href="/auth/google">Authenticate with google</a>')

	res.send({ success: true, data: { msg: 'We are up and running!' } })

	// res.send(req.user)
})

router.get('/protected', (req, res, next) => {
	res.send(req.user)
})

router.use('/auth', require('./auth'))

module.exports = router
