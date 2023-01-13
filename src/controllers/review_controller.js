const db = require('../models')
const debug = require('debug')('proglog:authController')
const { matchedData, validationResult } = require('express-validator')

/**
 * Get all reviews for a game
 *
 * GET /:gameId
 */
const getReviews = async (req, res) => {
	const gameId = req.params.gameId
	try {
		const reviews = await db.Review.findAll({ where: { game_id: gameId } })

		if (reviews.length > 0) {
			debug('Found review successfully: %0', reviews)
			res.send({
				status: 'success',
				data: reviews,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find list',
			err,
		})
	}
}

/**
 * Post a reviews for a game
 *
 * POST /:gameId/
 */
const addReview = async (req, res) => {
	const gameId = req.params.gameId
	const data = req.body.data

	try {
		const user = await db.User.findOne({ where: { id: data.userId } })
		const date = Date.now()
		const review = await db.Review.create({
			user_id: user.id,
			title: data.title,
			content: data.content,
			hide: data.hide,
			created_on: date,
			game_id: gameId,
			rating: data.rating,
		})
		if (user) {
			debug('Created review successfully: %0', review)
			res.send({
				status: 'success',
				data: review,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find list',
			err,
		})
	}
}

/**
 * DELETE review if you own it
 *
 * DELETE /:userId/:reviewId
 */
const deleteReview = async (req, res) => {
	const reviewId = req.params.reviewId
	const userId = req.params.userId

	const user = await db.User.findOne({ where: { id: userId } })
	const review = await db.Review.findOne({
		where: { id: reviewId, user_id: userId },
	})
	if (user && review) {
		try {
			const deletedReview = await db.Review.destroy({
				where: { id: reviewId, user_id: userId },
			})

			if (deletedReview) {
				res.status(200).send({
					status: 'success',
					data: deletedReview,
				})
			}
		} catch (err) {
			console.log(err)
		}
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to delete review',
		})
	}
}

module.exports = {
	getReviews,
	addReview,
	deleteReview,
}
