const express = require('express')
const passport = require('passport')
const router = express.Router()
const userValidationRules = require('../validation/user')

const successLoginUrl = `${process.env.FRONTEND_URL}/login/success`
const errorLoginUrl = `${process.env.FRONTEND_URL}/login`

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
		failureMessage:
			'Cannot authenticate with Steam, please try again later',
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl,
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		res.send('Thank you for signing in!')
	}
)

module.exports = router
