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
		const result = await axios.post(
			`/games`,
			`fields name, platforms, summary, cover.*, screenshots.*, artworks.*, aggregated_rating; limit 20; sort first_release_date desc; where aggregated_rating >= 80 & aggregated_rating !=null; where themes != (42);`
		)

		if (result) {
			// debug('Accessed data successfully: %0', result.data)
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

const getUpcomingGames = async (req, res) => {
	const today = Math.round(new Date().getTime() / 1000)
	try {
		const result = await axios.post(
			`/games`,
			`fields *, cover.*, screenshots.*,artworks.*, first_release_date; limit 50; where first_release_date> ${today} & platforms = (167,130,6,49) & themes != (42); sort first_release_date asc;`
		)

		if (result) {
			// debug('Accessed data successfully: %0', result.data)
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

const getGenres = async (req, res) => {}

/**
 * Get a specific game and info
 *
 * GET /:gameId
 */
const getGamesWithIds = async (req, res) => {
	const gameIds = req.body.ids
	try {
		const result = await axios.post(
			`/games`,
			`where id = (${gameIds}); fields *, name, summary, cover.image_id, genres.name, game_modes.name, screenshots.image_id, similar_games.cover.image_id, involved_companies.company.*, platforms.abbreviation;`
		)

		if (result) {
			// debug('Accessed games with ids successfully: %0', result.data)
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
	getUpcomingGames,
	getGenres,
}
