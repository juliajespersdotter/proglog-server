const passport = require('passport')
const db = require('../models')
const SteamStrategy = require('passport-steam').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

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

			const [user_lists_defaults, listcreated] =
				await db.User_List.findOrCreate({
					where: {
						user_id: user.id,
					},
					defaults: {
						list_name: 'Want to Play',
						private: false,
						deletable: false,
						user_id: user.id,
						description: 'A list containing games you want to play',
					},
				})
			console.log(user.googleId)
			console.log(user_lists_defaults)
			console.log(created)
			console.log(listcreated)
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
			try {
				const [user, created] = await db.User.findOrCreate({
					where: {
						steamId: profile._json.steamid,
						username: profile.displayName,
						avatar: profile._json.avatar,
					},
				})

				const [user_lists_defaults, listcreated] =
					await db.User_List.findOrCreate({
						where: {
							user_id: user.id,
						},
						defaults: {
							list_name: 'Want to Play',
							private: false,
							deletable: false,
							user_id: user.id,
							description:
								'A list containing games you want to play',
						},
					})
				console.log(user.steamId)
				console.log(user_lists_defaults)
				console.log(listcreated)
				console.log(created)
				return done(null, profile)
			} catch (err) {
				console.log(err)
			}
		}
	)
)

passport.serializeUser((user, done) => {
	done(null, user)
})

passport.deserializeUser((obj, done) => {
	done(null, obj)
})
