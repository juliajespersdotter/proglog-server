const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const { isUserAuthenticated } = require('../middlewares/auth')

router.get('/', isUserAuthenticated, (req, res) => {
	res.json({
		status: 'success',
		user: {
			userId: req.user.id,
			username: req.user.username,
			avatar: req.user.avatar,
			steamId: req.user.steamId,
			googleId: req.user.googleId,
		},
	})
})

/** Get a specific user info */
router.get('/:userId', isUserAuthenticated, userController.getUser)

/** Get user lists */
router.get('/lists/:userId', isUserAuthenticated, userController.getUserLists)

/** Check for game in list */
router.get(
	'/lists/:listId/:gameId',
	isUserAuthenticated,
	userController.getGameInList
)

/** Post New user list */
router.post('/lists/:userId', isUserAuthenticated, userController.addNewList)

/** Delete User List */
router.delete(
	'/lists/:userId/:listId',
	isUserAuthenticated,
	userController.deleteList
)

/** Get games in user list */
router.get('/games/:listId', isUserAuthenticated, userController.getGamesInList)

router.post(
	'/games/:listId/:gameId',
	isUserAuthenticated,
	userController.updateGameInList
)

/** Delete Game in list */
router.delete(
	'/games/:userId/:listId/:gameId',
	isUserAuthenticated,
	userController.deleteGame
)

/** Add Game to List */
router.post('/add/:userId', isUserAuthenticated, userController.addGameToList)

/** get a list with specific ID */
router.get('/lists/:listId', isUserAuthenticated, userController.getList)

router.delete('/logout', isUserAuthenticated, (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.status(400).send('Unable to log out')
			} else {
				res.status(200).send({ status: 'success' })
			}
		})
	}
})

router.get('/profile/:id', isUserAuthenticated, userController.getProfileData)

module.exports = router
