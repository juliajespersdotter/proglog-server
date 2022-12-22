const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../middlewares/auth')
// const authController = require('../controllers/auth_controller')
// const userValidationRules = require('../validation/user')

/* Register a new user */
// router.post('/register', authController.register)

router.get(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/steam', passport.authenticate('steam'), (req, res) => {
	// The request will be redirected to Steam for authentication, so
	// this function will not be called.
})

router.get(
	'/steam/return',
	passport.authenticate('steam', { failureRedirect: '/login' }),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect('/')
	}
)

router.get('/failure', (req, res, next) => {
	res.send('No shot!')
})

router.get('/protected', (req, res, next) => {
	res.send('Hello!')
})

/* Login a user */
// router.post('/login', userValidationRules.loginRules, authController.login)

module.exports = router
