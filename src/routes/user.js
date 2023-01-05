const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const { isUserAuthenticated } = require('../middlewares/auth')

router.get('/', isUserAuthenticated, (req, res) => {
	console.log(req.session.id)
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

/** get user lists */
router.get('/lists/:userId', isUserAuthenticated, userController.getUserLists)

/** get a list with specific ID */
router.get(
	'/lists/:userId/:listId',
	isUserAuthenticated,
	userController.getList
)

module.exports = router
