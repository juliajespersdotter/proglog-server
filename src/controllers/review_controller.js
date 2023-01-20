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
		const sortedReviews = reviews.sort(function (a, b) {
			// sort reviews so latest review shows first
			return new Date(b.created_on) - new Date(a.created_on)
		})
		if (reviews.length > 0) {
			debug('Found reviews successfully: %0', reviews)
			res.send({
				status: 'success',
				data: sortedReviews,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find reviews',
			err,
		})
	}
}

/**
 * Get all reviews for a game
 *
 * GET /comments/:reviewId
 */
const getCommentsForReview = async (req, res) => {
	const reviewId = req.params.reviewId
	try {
		const comments = await db.Comment.findAll({
			where: { content_id: reviewId },
		})
		// const user = await db.User.findOne({where: {id: comments.user_id}})
		if (comments.length > 0) {
			debug('Found comments successfully: %0', comments)
			res.send({
				status: 'success',
				data: comments,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find comments',
			err,
		})
	}
}

/**
 *
 * POST new comment on review
 *
 * POST /comments/:reviewId
 */
const postCommentOnReview = async (req, res) => {
	const reviewId = req.params.reviewId
	const data = req.body.data

	try {
		const review = await db.Review.findOne({ where: { id: reviewId } })
		const date = Date.now()
		const comment = await db.Comment.create({
			content_id: review.id,
			content: data.content,
			created_on: date,
			user_id: review.user_id,
			created_by: data.creatorId,
		})
		if (comment) {
			debug('Created comment successfully: %0', comment)
			res.send({
				status: 'success',
				data: comment,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to create comment',
			err,
		})
	}
}

/**
 * Post a review for a game
 *
 * POST /:gameId/
 */
const addReview = async (req, res) => {
	const gameId = req.params.gameId
	const data = req.body.data
	console.log(gameId, data)

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
			game_name: data.game.name,
			rating: data.rating,
		})
		if (review) {
			debug('Created review successfully: %0', review)
			res.send({
				status: 'success',
				data: review,
			})
		}
	} catch (err) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to create review',
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
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to find list with games',
		})
	}
}

/**
 * DELETE review if you own it
 *
 * DELETE /comments/:userId/:commentId
 */
const deleteComment = async (req, res) => {
	// console.log(commentId, userId)
	const commentId = req.params.commentId
	const userId = req.params.userId

	const user = await db.User.findOne({ where: { id: userId } })
	const comment = await db.Comment.findOne({
		where: { id: commentId, created_by: userId },
	})
	if (user && comment) {
		try {
			const deletedComment = await db.Comment.destroy({
				where: { id: commentId, created_by: userId },
			})

			if (deletedComment) {
				res.status(200).send({
					status: 'success',
					data: deletedComment,
				})
			}
		} catch (err) {
			console.log(err)
		}
	} else {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown when attempting to delete comment',
		})
	}
}

module.exports = {
	getReviews,
	getCommentsForReview,
	addReview,
	postCommentOnReview,
	deleteReview,
	deleteComment,
}
