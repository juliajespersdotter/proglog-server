const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	// res.send('<a href="/auth/google">Authenticate with google</a>')

	res.send({ success: true, data: { msg: 'We are up and running!' } })

	// res.send(req.user)
})

router.get('/protected', (req, res, next) => {
	res.send(req.user)
})

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))

module.exports = router
