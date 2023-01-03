const passport = require('passport')
const db = require('../models')
const SteamStrategy = require('passport-steam').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')

passport.use(
	new LocalStrategy(function verify(username, password, cb) {
		const user = db.User.findOne({
			where: { username: username },
		})
		if (!user) {
			console.log('User not found')
		}
	})
)

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:3000/auth/google/callback',
			passReqToCallback: true,
		},
		async (request, accessToken, refreshToken, profile, done) => {
			const [user, created] = await db.User.findOrCreate({
				where: {
					googleId: profile.id,
					username: profile.displayName,
					avatar: profile.picture,
				},
			})
			console.log(user.googleId)
			console.log(created)
			return done(null, profile)
			// console.log(profile)
			// const user = db.User.findOne({
			// 	where: { googleId: profile.id },
			// })
			// if (user) {
			// 	return done(null, profile)
			// } else {
			// 	// if no user is found create new
			// 	console.log('No account found')
			// }
			// return done(profile)
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
		async (identifier, profile, done) => {
			// process.nextTick(() => {
			profile.identifier = identifier
			console.log(profile)
			const [user, created] = await db.User.findOrCreate({
				where: {
					steamId: profile._json.steamid,
					username: profile.displayName,
					avatar: profile.avatar,
				},
			})
			console.log(user.steamId)
			console.log(created)
			return done(null, profile)
			// })
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((obj, done) => {
	done(null, obj)
})
