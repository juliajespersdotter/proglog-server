const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')
const { isUserAuthenticated } = require('../middlewares/auth')

/** Get all users */
router.get('/')

router.get('/user', isUserAuthenticated, (req, res) => {
	res.json(req.user)
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
