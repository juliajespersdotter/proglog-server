const db = require('../models')
const debug = require('debug')('proglog:authController')
const { matchedData, validationResult } = require('express-validator')

/**
 * Get a User's info
 *
 * GET /:userId
 */

const getUser = async (req, res) => {
	const userId = req.params.userId

	try {
		const user = await db.User.findOne({ where: { id: userId } })
		console.log(user)
		debug('Found user successfully: %0', user)
		res.send({
			status: 'success',
			data: user,
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find user',
		})
		throw error
	}
}

module.exports = {
	getUser,
}
