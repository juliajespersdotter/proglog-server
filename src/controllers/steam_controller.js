const db = require('../models')
const debug = require('debug')('proglog:steam_controller')
const { matchedData, validationResult } = require('express-validator')

/**
 * Register user
 *
 * GET /steam/auth
 */

const steamLogin = async (req, res) => {
	// destructure username and password from request body
	// before creating new user, validate data
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() })
	}

	// get valid data
	const validData = matchedData(req)
	console.log(validData)

	// const { steamId, displayName, avatar, profileurl } = req.body
	// console.log(req.body)

	try {
		// save valid data
		const user = await db.User.create({
			username: validData.displayName,
			steamId: validData.steamId,
			avatar: validData.avatar,
		})
		debug('Created new user successfully: %O', user)

		// return only data that can be visible, not password
		res.send({
			status: 'success',
			data: {
				username: validData.displayName,
				avatar: validData.avatar,
			},
		})
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new user.',
		})
		throw error
	}
}

module.exports = {
	steamRegister,
}
