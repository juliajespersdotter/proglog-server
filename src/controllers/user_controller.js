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
		// debug('Found user successfully: %0', user)
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
		// debug('Found user with lists successfully: %0', userlists)
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
 * Get a User's games in list
 *
 * GET /games
 */
const getGamesInList = async (req, res) => {
	const listId = req.params.listId

	const games = await db.Game_Userlist.findAll({ where: { list_id: listId } })
	const list = await db.User_List.findOne({ where: { id: listId } })
	if (games.length && list) {
		// debug('Found games in list successfully: %0', games)
		const idArray = []

		games.forEach(game => {
			idArray.push(game.game_id)
		})

		res.send({
			status: 'success',
			data: idArray,
			list: list,
		})
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find list with games',
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

	const list = await db.User_List.findOne({
		where: { id: listId },
	})

	if (list) {
		console.log(list)
		// debug('Found list successfully: %0', list)
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
	const userId = req.params.userId
	const gameId = req.body.gameId
	const listId = req.body.listId

	const user = await db.User.findOne({ where: { id: userId } })
	const existingGame = await db.Game_Userlist.findOne({
		where: { list_id: listId, game_id: gameId },
	})

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
}

/**
 * POST new game to list
 *
 * POST /list/listId
 */
const addNewList = async (req, res) => {
	const userId = req.params.userId
	const listData = req.body.data

	const user = await db.User.findOne({ where: { id: userId } })

	if (user) {
		try {
			const addedList = await db.User_List.create({
				list_name: listData.name,
				user_id: userId,
				description: listData.description,
				private: listData.private,
				deletable: 1,
			})

			if (addedList) {
				res.status(200).send({
					status: 'success',
					data: addedList,
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
}

/**
 * DELETE list
 *
 * DELETE /list/:userId
 */
const deleteList = async (req, res) => {
	const userId = req.params.userId
	const listId = req.params.listId
	console.log(listId, userId)

	const user = await db.User.findOne({ where: { id: userId } })
	const userList = await db.User_List.findOne({
		where: { id: listId, user_id: userId },
	})

	if (user && userList) {
		try {
			const gamesInList = await db.Game_Userlist.destroy({
				where: { list_id: listId },
			})
			const deletedList = await db.User_List.destroy({
				where: { id: listId },
			})

			if (deletedList) {
				res.status(200).send({
					status: 'success',
					data: deletedList,
					gamesInList,
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
}

/**
 * DELETE game from list
 *
 * DELETE /games/:listId/:userId/:gameId
 */
const deleteGame = async (req, res) => {
	const userId = req.params.userId
	const listId = req.params.listId
	const gameId = req.params.gameId
	console.log(listId, userId, gameId)

	const user = await db.User.findOne({ where: { id: userId } })
	const userList = await db.User_List.findOne({
		where: { id: listId, user_id: userId },
	})
	const game = await db.Game_Userlist.findOne({
		where: { game_id: gameId, list_id: listId },
	})

	if (user && userList && game) {
		try {
			const gameInList = await db.Game_Userlist.destroy({
				where: { game_id: gameId, list_id: listId },
			})

			if (gameInList) {
				res.status(200).send({
					status: 'success',
					data: gameInList,
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
}

/**
 * Get PROFILE (GET GAMES, LISTS, PROFILE INFO ETC ALL IN ONE)
 *
 * GET /profile
 */

module.exports = {
	getUser,
	getUserLists,
	getGamesInList,
	getList,
	addGameToList,
	addNewList,
	deleteList,
	deleteGame,
}
