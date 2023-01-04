const debug = require('debug')('proglog:apiController')
const axios = require('axios').default

// https://api.rawg.io/api/games/3498?key=RAWG_API_TOKEN
const api_key = process.env.RAWG_API_TOKEN

axios.defaults.baseURL = 'https://api.rawg.io/api'
// axios.defaults.params['key'] = api_key

const requestOptions = {
	params: {
		key: api_key,
	},
}

/**
 * Get all games
 *
 * GET /
 */
const getGames = async (req, res) => {
	try {
		const result = await axios.get(`/games`, requestOptions)

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
			message: 'Exception thrown when attempting to access RAWG API',
		})
	}
}

/**
 * Get a specific game and info
 *
 * GET /:gameId
 */
const getGameWithId = async (req, res) => {
	const gameId = req.params.gameId
	try {
		const result = await axios.get(`/games/${gameId}`, requestOptions)

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
			message: 'Exception thrown when attempting to access RAWG API',
		})
	}
}

module.exports = {
	getGames,
	getGameWithId,
}
