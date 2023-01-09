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

/** get user lists */
router.get('/lists/:userId', isUserAuthenticated, userController.getUserLists)

/** get a list with specific ID */
router.get(
	'/lists/:userId/:listId',
	isUserAuthenticated,
	userController.getList
)

router.delete('/logout', isUserAuthenticated, (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.status(400).send('Unable to log out')
			} else {
				res.status(200).send({ status: 'success' })
				// res.redirect('http://localhost:5173/login')
			}
		})
	}
})

module.exports = router
