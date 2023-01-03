const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

/** Get all users */
router.get('/')

/** Get a specific user info */
router.get('/:userId', userController.getUser)

/** get user lists */
router.get('/lists/:userId', userController.getUserLists)

/** get a list with specific ID */
router.get('/lists/:userId/:listId', userController.getList)

module.exports = router
