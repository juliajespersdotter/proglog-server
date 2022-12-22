const passport = require('passport')
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
				return done(null, profile)
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
