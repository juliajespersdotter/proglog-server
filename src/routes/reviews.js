const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review_controller')
const { isUserAuthenticated } = require('../middlewares/auth')

/** Get all reviews for a game**/
router.get('/:gameId', isUserAuthenticated, reviewController.getReviews)

/** Get all comments on review */
router.get(
	'/comments/:reviewId',
	isUserAuthenticated,
	reviewController.getCommentsForReview
)

/** Post new review */
router.post('/:gameId', isUserAuthenticated, reviewController.addReview)

/** Post new comment on review */
router.post(
	'/comments/:reviewId',
	isUserAuthenticated,
	reviewController.postCommentOnReview
)

/** Delete comment on review */
router.delete(
	'/comments/:userId/:commentId',
	isUserAuthenticated,
	reviewController.deleteComment
)

router.delete(
	'/:userId/:reviewId',
	isUserAuthenticated,
	reviewController.deleteReview
)

module.exports = router
