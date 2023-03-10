const db = require('../models')

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
 * GET /games/:listId
 */
const getGamesInList = async (req, res) => {
	const listId = req.params.listId

	const games = await db.Game_Userlist.findAll({ where: { list_id: listId } })
	const list = await db.User_List.findOne({ where: { id: listId } })

	if (games.length > 0 && list) {
		// debug('Found games in list successfully: %0', games)
		const idArray = []

		games.forEach(game => {
			idArray.push(game.game_id)
		})

		res.send({
			status: 'success',
			data: idArray,
			list: list,
			games: games,
		})
	} else {
		res.status(404).send({
			status: 'error',
			message: 'No games found in list',
		})
	}
}

/**
 * Update game in list
 *
 * POST /games/:listId/:gameId
 */
const updateGameInList = async (req, res) => {
	const listId = req.params.listId
	const gameId = req.params.gameId
	const data = req.body.data

	const game = await db.Game_Userlist.findOne({
		where: { list_id: listId, game_id: gameId },
	})

	if (game) {
		try {
			const updatedGame = await db.Game_Userlist.update(data, {
				where: { game_id: gameId, list_id: listId },
			})

			res.send({
				status: 'success',
				data: updatedGame,
			})
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when attempting to update game',
				err,
			})
		}
	} else {
		res.status(404).send({
			status: 'error',
			message: 'Game not found to update',
		})
	}
}

/**
 * Get a specific list
 *
 * GET /list/:userId/:listId
 */
const getList = async (req, res) => {
	const listId = req.params.listId

	const list = await db.User_List.findOne({
		where: { id: listId },
	})

	if (list) {
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
 * Get a specific game in list
 *
 * GET /list/:listId/:gameId
 */
const getGameInList = async (req, res) => {
	const listId = req.params.listId
	const gameId = req.params.gameId

	const gameInList = await db.Game_Userlist.findOne({
		where: { list_id: listId, game_id: gameId },
	})

	if (gameInList) {
		res.send({
			status: 'success',
			data: gameInList,
			isAdded: true,
		})
	} else {
		res.send({
			status: 'success',
			data: gameInList,
			isAdded: false,
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
	const game = req.body.game
	const listId = req.body.listId

	const user = await db.User.findOne({ where: { id: userId } })

	const existingGame = await db.Game_Userlist.findOne({
		where: { list_id: listId, game_id: game.id },
	})

	if (user && !existingGame) {
		try {
			const date = Date.now()
			const addedGame = await db.Game_Userlist.create({
				list_id: listId,
				game_id: game.id,
				game_name: game.name,
				date_added: date,
			})

			if (addedGame) {
				res.status(200).send({
					status: 'success',
					data: addedGame,
				})
			}
		} catch (err) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when attempting to add game to list',
				error: err,
			})
		}
	} else {
		res.status(404).send({
			status: 'error',
			message: 'Cannot find user or game already exists in list',
		})
	}
}

/**
 * POST new list
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
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when attempting to add game to list',
				error: err,
			})
		}
	} else {
		res.status(401).send({
			status: 'error',
			message: 'Cannot find user to associate with list',
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
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when attempting to delete list',
				err,
			})
		}
	} else {
		res.status(404).send({
			status: 'error',
			message: 'Cannot find user or list associated with user',
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
			res.status(500).send({
				status: 'error',
				message:
					'Exception thrown when attempting to delete game in list',
				error: err,
			})
		}
	} else {
		res.status(404).send({
			status: 'error',
			message: 'Cannot find user or game to associate with list',
		})
	}
}

/**
 * Get PROFILE (GET GAMES, LISTS, PROFILE INFO ETC ALL IN ONE)
 *
 * GET /profile
 */
const getProfileData = async (req, res) => {
	const userId = req.params.id

	try {
		const user = await db.User.findOne({ where: { id: userId } })
		const userLists = await db.User_List.findAll({
			where: { user_id: user.id },
		})
		const userReviews = await db.Review.findAll({
			where: { user_id: user.id },
		})

		res.status(200).send({
			status: 'success',
			user: {
				userId: user.id,
				username: user.username,
				steamId: user.steamId,
				googleId: user.googleId,
				avatar: user.avatar,
			},
			reviews: userReviews,
			lists: userLists,
		})
	} catch {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to get user profile',
		})
	}
}

module.exports = {
	getUser,
	getUserLists,
	getGameInList,
	getGamesInList,
	updateGameInList,
	getList,
	addGameToList,
	addNewList,
	deleteList,
	deleteGame,
	getProfileData,
}
