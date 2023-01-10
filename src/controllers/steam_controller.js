const db = require('../models')
const debug = require('debug')('proglog:steam_controller')
const axios = require('axios').default

const requestOptions = {
	params: {
		key: process.env.STEAM_API_KEY,
		include_appinfo: true,
		format: 'json',
	},
}

/**
 * Get Steam Owned games
 *
 * GET /steam/user
 */

const getOwnedGames = async (req, res) => {
	const steamId = req.params.steamId

	try {
		const steamData = await axios.get(
			`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?steamid=${steamId}`,
			requestOptions
		)
		res.send({
			status: 'success',
			data: steamData.data.response,
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to access Steam API',
		})
	}
}

module.exports = {
	getOwnedGames,
}
