const debug = require('debug')('proglog:apiController')
const axios = require('axios').default

// https://api.rawg.io/api/games/3498?key=RAWG_API_TOKEN
// const api_key = process.env.RAWG_API_TOKEN

// axios.defaults.baseURL = 'https://api.rawg.io/api'
axios.defaults.baseURL = 'https://api.igdb.com/v4/'
axios.defaults.headers.common[
	'Authorization'
] = `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
axios.defaults.headers.common['Client-ID'] = ` ${process.env.IGDB_CLIENT_ID}`
// axios.defaults.params['key'] = api_key

const requestOptions = {
	params: {
		//  key: api_key,
		fields: 'name,cover.*, screenshots.*, artworks.*',
		limit: 20,
		sort: 'release_dates.date desc;',
	},
	// data: 'sort=release_dates.date desc; fields=*,screenshots.*,artworks.*;',
	// data: {
	// 	fields: 'artworks',
	// 	limit: 22,
	// },
}

/**
 * Get all games
 *
 * GET /
 */
const getGames = async (req, res) => {
	try {
		const result = await axios.get(`/games`, requestOptions)
		console.log(requestOptions)

		if (result) {
			debug('Accessed data successfully: %0', result.data)
			res.send({
				status: 'success',
				data: result.data,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to access Game API',
		})
	}
}

/**
 * Get a specific game and info
 *
 * GET /:gameId
 */
const getGamesWithIds = async (req, res) => {
	const gameIds = req.body.ids
	console.log(gameIds)
	try {
		const result = await axios.post(
			`/games`,
			`where id = (${gameIds}); fields name, summary, cover.*;`
		)

		if (result) {
			debug('Accessed games with ids successfully: %0', result.data)
			res.send({
				status: 'success',
				data: result.data,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to access Game API',
		})
	}
}

module.exports = {
	getGames,
	getGamesWithIds,
}
