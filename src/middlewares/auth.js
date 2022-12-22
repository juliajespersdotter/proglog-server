const passport = require('passport')
const db = require('../models')
const SteamStrategy = require('passport-steam').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/google/callback',
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
			return done(profile)
			// })
		}
	)
)

passport.use(
	new SteamStrategy(
		{
			returnURL: 'http://localhost:3000/auth/steam/return',
			realm: 'http://localhost:3000/',
			apiKey: process.env.STEAM_API_KEY,
		},
		(identifier, profile, done) => {
			process.nextTick(() => {
				profile.identifier = identifier
				console.log(profile)
				const user = db.User.findOne({
					where: { steamId: profile._json.steamid },
				})
				if (user) {
					return done(null, profile)
				} else {
					console.log('No account found')
				}
			})
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((obj, done) => {
	done(null, obj)
})
