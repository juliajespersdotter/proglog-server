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

	const user = await db.User.findOne({ where: { id: userId } })

	if (user) {
		debug('Found user successfully: %0', user)
		res.send({
			status: 'success',
			data: {
				userId: user.id,
				username: user.username,
				avatar: user.avatar,
			},
		})
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find user',
		})
	}
}

/**
 * Get a User's info
 *
 * GET /lists/:userId
 */
const getUserLists = async (req, res) => {
	const userId = req.params.userId

	const userlists = await db.User_List.findAll({
		where: { user_id: userId },
	})

	if (userlists) {
		debug('Found user with lists successfully: %0', userlists)
		res.send({
			status: 'success',
			data: userlists,
		})
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find userlists',
		})
	}
}

/**
 * Get a specific list (with games)
 *
 * GET /list/:userId/:listId
 */
const getList = async (req, res) => {
	const listId = req.params.listId
	const userId = req.params.userId

	const list = await db.User_List.findOne({
		where: { id: listId, user_id: userId, private: 0 },
	})

	if (list) {
		debug('Found list successfully: %0', list)
		res.send({
			status: 'success',
			data: list,
		})
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find list',
		})
	}
}

/**
 * Get PROFILE (GET GAMES, LISTS, PROFILE INFO ETC ALL IN ONE)
 *
 * GET /profile
 */

module.exports = {
	getUser,
	getUserLists,
	getList,
}
