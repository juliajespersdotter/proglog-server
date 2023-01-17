const express = require('express')
const router = express.Router()
const apiController = require('../../controllers/api_controller')
const steamController = require('../../controllers/steam_controller')
const { isUserAuthenticated } = require('../../middlewares/auth')

/** Get all games */
router.get('/games', apiController.getGames)

/** Get a specific game */
router.post('/games', apiController.getGamesWithIds)

/** Search router */
router.get('/search/:query/:page', apiController.getSearchResult)

router.get('/coming-soon', apiController.getUpcomingGames)

router.get('/steam/:steamId', steamController.getOwnedGames)

module.exports = router
