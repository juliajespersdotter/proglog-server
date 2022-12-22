const express = require('express')
const router = express.Router()
// const auth = require('../middlewares/auth')
const authController = require('../controllers/auth_controller')
// const userValidationRules = require('../validation/user')

router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'We are up and running!' } })
})

/* Register a new user */
router.post('/register', authController.register)

/* Register a new user */
router.post('/login', userValidationRules.loginRules, authController.login)

// router.use('/posts', require('./posts'))

module.exports = router
