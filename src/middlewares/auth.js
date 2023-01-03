const passport = require('passport')
const db = require('../models')
const SteamStrategy = require('passport-steam').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const LocalStrategy = require('passport-local').Strategy
const crypto = require('crypto')

// passport.use(
// 	new LocalStrategy(async function verify(username, password, cb) {
// 		// const user = await db.User.findOne({
// 		// 	where: { username: username },
// 		// })
// 		// if (!user) {
// 		// 	console.log('User not found')
// 		// }
// 			await db.User.findOne(
// 				{
// 					where: { username: username },
// 				}) , (err, row) => {
// 					if (err) {
// 					return cb(err)
// 				}
// 				if (!row) {
// 					return cb(null, false, {
// 						message: 'Incorrect username or password.',
// 					})
// 				}
// 				crypto.pbkdf2(
// 					password,
// 					row.salt,
// 					310000,
// 					32,
// 					'sha256',
// 					function (err, hashedPassword) {
// 						if (err) {
// 							return cb(err)
// 						}
// 						if (
// 							!crypto.timingSafeEqual(
// 								row.hashed_password,
// 								hashedPassword
// 							)
// 						) {
// 							return cb(null, false, {
// 								message: 'Incorrect username or password.',
// 							})
// 						}
// 						return cb(null, row)
// 					}
// 				)
// 				}
// 			}
// 		)
// 	})
// )

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
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((obj, done) => {
	done(null, obj)
})
