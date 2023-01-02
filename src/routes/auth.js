const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../middlewares/auth')
const steam_controller = require('../controllers/steam_controller')
const google_controller = require('../controllers/google_controller')
const userValidationRules = require('../validation/user')

/* Register a new user */
// router.post('/register', authController.register)

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/login',
	})
)

router.get('/steam', passport.authenticate('steam'), (req, res) => {
	// The request will be redirected to Steam for authentication, so
	// this function will not be called.
})

router.get(
	'/steam/return',
	passport.authenticate('steam', {
		failureRedirect: '/login',
		successRedirect: '/auth/failure',
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		// req.session(req.user)
		res.redirect('/')
	}
)

router.post(
	'/google/register',
	userValidationRules.createGoogleRules,
	google_controller.googleRegister
)

router.post(
	'/steam/register',
	// passport.authenticate('steam', { failureRedirect: '/login' }),
	userValidationRules.createSteamRules,
	steam_controller.steamRegister
)

router.get('/failure', (req, res, next) => {
	res.send('No shot!')
})

/* Login a user */
// router.post('/login', userValidationRules.loginRules, authController.login)

module.exports = router
