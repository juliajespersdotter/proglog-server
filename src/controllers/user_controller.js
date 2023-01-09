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
 * POST new game to list
 *
 * POST /list/:userId
 */
const addGameToList = async (req, res) => {
	console.log(req.body)
	const userId = req.params.userId
	const gameId = req.body.gameId
	const listId = req.body.listId

	const user = await db.User.findOne({ where: { id: userId } })
	const existingGame = await db.Game_Userlist.findOne({
		where: { list_id: listId, game_id: gameId },
	})
	console.log('existingGame', existingGame)

	if (user && !existingGame) {
		try {
			const addedGame = await db.Game_Userlist.create({
				list_id: listId,
				game_id: gameId,
			})

			if (addedGame) {
				res.status(200).send({
					status: 'success',
					data: addedGame,
				})
			}
		} catch (err) {
			console.log(err)
		}
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to add game to list',
		})
	}

	console.log('IDS', userId, gameId, listId)
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
	addGameToList,
}
