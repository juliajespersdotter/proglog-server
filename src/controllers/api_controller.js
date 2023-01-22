const { Error } = require('sequelize')

const debug = require('debug')('proglog:apiController')
const axios = require('axios').default
const igdb = require('igdb-api-node').default

axios.defaults.baseURL = 'https://api.igdb.com/v4/'
axios.defaults.headers.common[
	'Authorization'
] = `Bearer ${process.env.IGDB_ACCESS_TOKEN}`
axios.defaults.headers.common['Client-ID'] = ` ${process.env.IGDB_CLIENT_ID}`
// axios.defaults.params['key'] = api_key
const client = igdb(
	`${process.env.IGDB_CLIENT_ID}`,
	`${process.env.IGDB_ACCESS_TOKEN}`
)

// const requestOptions = {
// 	method: 'post',
// 	baseUrl: 'https://api.igdb.com/v4/',
// 	Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
// 	ClientID: `${process.env.IGDB_CLIENT_ID}`,
// }

/**
 * Get games by Genre
 *
 * GET /genres/:id
 */
const getGamesByGenre = async (req, res) => {
	const genreId = req.params.id
	const page = req.params.page
	try {
		const result = await client
			.query('games', 'result')
			.fields([
				'*',
				'cover.image_id',
				'genres.*',
				'screenshots.*',
				'hypes',
				'artworks.*',
				'first_release_date',
			])
			.offset(page)
			.where(`genres = ${genreId} & themes != (42) & hypes!=n`)
			.sort('hypes desc')
			.limit(20)
			.request('/games')

		const count = await client
			.fields('genres.*')
			.query('games/count', 'count')
			.where(`genres = ${genreId} & themes != (42) & hypes!=n`)
			.request('/games/count')

		if (result && result.data.length > 0) {
			// debug('Accessed data successfully: %0', result.data)
			res.send({
				status: 'success',
				data: result.data,
				count: count.data.count,
			})
		} else {
			throw new Error()
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
		const result = await client
			.query('games', 'result')
			.fields([
				'*',
				'cover.image_id',
				'genres.*',
				'screenshots.*',
				'hypes',
				'artworks.*',
				'first_release_date',
			])
			.where(
				`themes != (42) & hypes != n & first_release_date > ${today} & platforms = (167,130,6,49)`
			)
			.sort('first_release_date asc')
			.limit(50)
			.request('/games')

		if (result && result.data.length > 0) {
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

const getGenres = async (req, res) => {
	try {
		const result = await client
			.query('genres', 'result')
			.fields('*')
			.limit(100)
			.request('/genres')

		if (result && result.data.length > 0) {
			// debug('Accessed data successfully: %0', result.data)
			res.send({
				status: 'success',
				data: result.data,
			})
		} else {
			throw new Error()
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to access Game API',
		})
	}
}

/**
 * Query game
 *
 * GET /search/:query
 */
const getSearchResult = async (req, res) => {
	// const category = req.params.category
	const query = req.params.query
	const page = req.params.page

	try {
		const result = await client
			.query('games', 'result')
			.search(`${query}*`)
			.fields([
				'*',
				'cover.image_id',
				'screenshots.*',
				'artworks.*',
				'first_release_date',
			])
			.offset(page)
			.limit(20)
			.where('themes != (42)')
			.request('/games')

		const count = await client
			.query('games/count', 'count')
			.search(`${query}*`)
			.request('/games/count')

		if (result && result.data.length > 0) {
			// debug('Accessed data successfully: %0', result.data)
			res.send({
				status: 'success',
				data: result.data,
				count: count.data.count,
			})
		} else {
			throw new Error()
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
	try {
		const result = await axios.post(
			`/games`,
			`where id = (${gameIds}); fields *, name, summary, cover.image_id, genres.name, game_modes.name, screenshots.image_id, similar_games.cover.image_id, involved_companies.company.*, platforms.abbreviation;`
		)

		if (result && result.data.length > 0) {
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
	getGamesByGenre,
	getGamesWithIds,
	getSearchResult,
	getUpcomingGames,
	getGenres,
}
