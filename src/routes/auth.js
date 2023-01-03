const express = require('express')
const passport = require('passport')
const router = express.Router()
const auth = require('../middlewares/auth')
// const steam_controller = require('../controllers/steam_controller')
// const google_controller = require('../controllers/google_controller')
const userValidationRules = require('../validation/user')

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
		successRedirect: '/protected',
		failureRedirect: '/login',
	})
)

// authenticate with steam
router.get('/steam', passport.authenticate('steam'), (req, res) => {
	// The request will be redirected to Steam for authentication, so
	// this function will not be called.
})

router.get(
	'/steam/return',
	passport.authenticate('steam', {
		failureRedirect: '/login',
		successRedirect: '/protected',
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		// req.session(req.user)
		res.redirect('/')
	}
)

// after authentication, register user if one with this ID does not exist
// router.post(
// 	'/google/register',
// 	userValidationRules.createGoogleRules,
// 	google_controller.googleRegister
// )

// router.post(
// 	'/steam/register',
// 	// passport.authenticate('steam', { failureRedirect: '/login' }),
// 	userValidationRules.createSteamRules,
// 	steam_controller.steamRegister
// )

module.exports = router
