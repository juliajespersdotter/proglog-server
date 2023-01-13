const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review_controller')
const { isUserAuthenticated } = require('../middlewares/auth')

/** Get all reviews for a game**/
router.get('/:gameId', isUserAuthenticated, reviewController.getReviews)

/** Post new review */
router.post('/:gameId', isUserAuthenticated, reviewController.addReview)

router.delete(
	'/:userId/:reviewId',
	isUserAuthenticated,
	reviewController.deleteReview
)

module.exports = router
