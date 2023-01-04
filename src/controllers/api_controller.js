const debug = require('debug')('proglog:authController')
const axios = require('axios').default

const BASE_URL = 'https://api.igdb.com/v4'
// const client_ID = import.meta.env.VITE_IGDB_CLIENT_ID
// const access_token = import.meta.env.VITE_IGDB_ACCESS_TOKEN

axios.defaults.baseURL = 'https://api.igdb.com/v4'
// axios.defaults.headers.post['Client-ID'] = client_ID
// axios.defaults.headers.post['Authorization'] = `Bearer ${access_token}`

/**
 * Get all games
 *
 * GET /
 */
const getGames = async (req, res) => {
	axios({
		url: 'https://api.igdb.com/v4/games',
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Client-ID': 'll5gesoqhzyiaoyiq2n4p1puj2rxqe',
			Authorization: 'Bearer ffrw3yqzf8qfll44w7bxnnthllc2c9',
		},
		data: 'fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;',
	})
		.then(response => {
			res.send({
				status: 'success',
				data: response.data,
			})
		})
		.catch(err => {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when attempting to access api',
			})
			throw err
		})
}

module.exports = {
	getGames,
}
