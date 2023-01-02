const express = require('express')
const router = express.Router()
const passport = require('passport')
// const auth = require('../middlewares/auth')
// const authController = require('../controllers/auth_controller')
// const userValidationRules = require('../validation/user')

router.get('/', (req, res, next) => {
	res.send('<a href="/auth/google">Authenticate with google</a>')
	res.send(req.user)
})

router.get('/protected', (req, res, next) => {
	res.send('Hello!')
})

// router.get(
// 	'/google/callback',
// 	passport.authenticate('google', {
// 		successRedirect: '/protected',
// 		failureRedirect: '/auth/failure',
// 	})
// )

/* Register a new user */
// router.post(
// 	'/register',
// 	userValidationRules.createRules,
// 	authController.register
// )

// /* Register a new user */
// router.post('/login', userValidationRules.loginRules, authController.login)

router.use('/auth', require('./auth'))

module.exports = router
