const express = require('express')
const passport = require('passport')
const router = express.Router()
// const steam_controller = require('../controllers/steam_controller')
// const google_controller = require('../controllers/google_controller')
const userValidationRules = require('../validation/user')

const successLoginUrl = 'http://localhost:5173/login/success'
const errorLoginUrl = 'http://localhost:5173/login'

/* Register a new user */
// router.post('/register', authController.register)

/* Login a user */
// router.post(
// 	'/login/password',
// 	passport.authenticate('local', {
// 		successRedirect: '/protected',
// 		failureRedirect: '/login',
// 	})
// )
// router.post('/login', userValidationRules.loginRules, authController.login)
// authenticate with google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureMessage:
			'Cannot authenticate with Google, please try again later',
		successRedirect: successLoginUrl,
		failureRedirect: errorLoginUrl,
	}),
	(req, res) => {
		console.log('User', req.user)
		res.send('Thank you for signing in!')
	}
)

// authenticate with steam
router.get('/steam', passport.authenticate('steam'), (req, res) => {
	// The request will be redirected to Steam for authentication, so
	// this function will not be called.
})

router.get(
	'/steam/return',
	passport.authenticate('steam', {
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl,
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		console.log('User', req.user)
		res.send('Thank you for signing in!')
		// console.log(req)
		// res.send(req.user)
	}
)

router.get('/logout', (req, res) => {
	req.logout()
	res.redirect('http://127.0.0.1:5173/login')
})

module.exports = router
