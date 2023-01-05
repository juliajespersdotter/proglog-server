const express = require('express')
const router = express.Router()
const apiController = require('../../controllers/api_controller')

/** Get all games */
router.get('/games', apiController.getGames)

/** Get a specific game */
router.get('/games/:gameId', apiController.getGameWithId)

module.exports = router
