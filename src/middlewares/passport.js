const passport = require('passport')
const db = require('../models')
const SteamStrategy = require('passport-steam').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: `${BASE_URL}/auth/google/callback`,
			passReqToCallback: true,
		},
		async (request, accessToken, refreshToken, profile, cb) => {
			const defaultUser = {
				username: profile.displayName,
				avatar: profile.picture,
				googleId: profile.id,
			}
			const [user, created] = await db.User.findOrCreate({
				where: {
					googleId: profile.id,
				},
				defaults: defaultUser,
			}).catch(err => {
				console.log('error signing up', err)
				cb(err, null)
			})

			if (created === true) {
				try {
					await db.User_List.bulkCreate([
						{
							user_id: user.id,
							list_name: 'Want to Play',
							private: false,
							deletable: false,
							user_id: user.id,
							description: 'A list of games you want to play',
						},
						{
							user_id: user.id,
							list_name: 'Completed',
							private: false,
							deletable: false,
							user_id: user.id,
							description: 'A list of games you have completed',
						},
						{
							user_id: user.id,
							list_name: 'Currently Playing',
							private: false,
							deletable: false,
							user_id: user.id,
							description:
								'A list of games you are currently playing',
						},
					])
				} catch (err) {
					console.log(err)
				}
			}

			/*
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
				
			// console.log(user.googleId)
			// console.log(user_lists_defaults)
			// console.log(created)
			// console.log(listcreated)
			*/
			if (user) {
				return cb(null, user)
			}
		}
	)
)

passport.use(
	new SteamStrategy(
		{
			returnURL: `${BASE_URL}/auth/steam/return`,
			realm: `${BASE_URL}`,
			apiKey: process.env.STEAM_API_KEY,
		},
		async (identifier, profile, cb) => {
			profile.identifier = identifier
			console.log('PROFILE', profile)
			const defaultUser = {
				steamId: profile._json.steamid,
				username: profile.displayName,
				avatar: profile._json.avatarfull,
			}
			const [user, created] = await db.User.findOrCreate({
				where: {
					steamId: profile.id,
				},
				defaults: defaultUser,
			}).catch(err => {
				console.log('error signing up', err)
				cb(err, null)
			})

			if (created === true) {
				try {
					await db.User_List.bulkCreate([
						{
							user_id: user.id,
							list_name: 'Want to Play',
							private: false,
							deletable: false,
							user_id: user.id,
							description: 'A list of games you want to play',
						},
						{
							user_id: user.id,
							list_name: 'Completed',
							private: false,
							deletable: false,
							user_id: user.id,
							description: 'A list of games you have completed',
						},
						{
							user_id: user.id,
							list_name: 'Currently Playing',
							private: false,
							deletable: false,
							user_id: user.id,
							description:
								'A list of games you are currently playing',
						},
					])
				} catch (err) {
					console.log(err)
				}
			}

			/*
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
				*/

			if (user) {
				return cb(null, user)
			}
		}
	)
)

passport.serializeUser((user, cb) => {
	// console.log('Serializing the user:', user)
	cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
	const user = await db.User.findOne({ where: { id } }).catch(err => {
		console.log('Error deserializing', err)
		cb(err, null)
	})

	// console.log('Deserialized user', user)

	if (user) cb(null, user)
})
