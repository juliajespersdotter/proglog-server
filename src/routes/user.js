const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

/** Get all users */
router.get('/')

/** Get a specific user info */
router.get('/:userId', userController.getUser)

module.exports = router
