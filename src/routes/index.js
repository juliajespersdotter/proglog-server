const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.send({ success: true, data: { msg: 'We are up and running!' } })
})

router.use('/auth', require('./auth'))
router.use('/user', require('./user'))
router.use('/api', require('./external_api/api'))
router.use('/reviews', require('./reviews'))

module.exports = router
