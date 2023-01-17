const express = require('express')
const router = express.Router()
const apiController = require('../../controllers/api_controller')
const steamController = require('../../controllers/steam_controller')
const { isUserAuthenticated } = require('../../middlewares/auth')

/** Get a specific game */
router.post('/games', apiController.getGamesWithIds)

/** Get all genres */
router.get('/genres', apiController.getGenres)

/** Get games by genre */
router.get('/genres/:id/:page', apiController.getGamesByGenre)

/** Search route */
router.get('/search/:query/:page', apiController.getSearchResult)

/** Get upcoming games */
router.get('/coming-soon', apiController.getUpcomingGames)

/** Get Steam user data */
router.get('/steam/:steamId', steamController.getOwnedGames)

module.exports = router
