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
		debug('Found user successfully: %0', user)
		res.send({
			status: 'success',
			data: {
				userId: user.id,
				username: user.username,
				avatar: user.avatar,
			},
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find user',
		})
		throw err
	}
}

/**
 * Get a User's info
 *
 * GET /lists/:userId
 */
const getUserLists = async (req, res) => {
	const userId = req.params.userId

	try {
		const userlists = await db.User_List.findAll({
			where: { user_id: userId },
		})
		debug('Found user with lists successfully: %0', userlists)
		res.send({
			status: 'success',
			data: userlists,
		})
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find userlists',
		})
		throw err
	}
}

module.exports = {
	getUser,
	getUserLists,
}
