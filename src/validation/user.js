/**
 * User Validation Rules
 */

const { body } = require('express-validator')
const models = require('../models')

const createRules = [
	body('email')
		.exists()
		.isEmail()
		.normalizeEmail()
		.custom(async value => {
			const user = await new models.User({ email: value }).fetch({
				require: false,
			})
			if (user) {
				return Promise.reject('Email is already in use.') // duplicate emails not allowed
			}

			return Promise.resolve()
		}),
	body('password').exists().isLength({ min: 6 }).trim(),
	body('username')
		.exists()
		.isLength({ min: 3 })
		.custom(async value => {
			const user = await new models.User({ username: value }).fetch({
				require: false,
			})
			if (user) {
				return Promise.reject('Username is already in use.') // duplicate emails not allowed
			}

			return Promise.resolve()
		}),
]

const loginRules = [
	body('email').exists().isEmail().normalizeEmail(),
	body('password').exists().isLength({ min: 6 }).trim(),
]

const updateRules = [
	body('password').optional().isLength({ min: 6 }).trim(),
	body('username')
		.optional()
		.isLength({ min: 3 })
		.custom(async value => {
			const user = await new models.User({ username: value }).fetch({
				require: false,
			})
			if (user) {
				return Promise.reject('Username is already in use.') // duplicate emails not allowed
			}

			return Promise.resolve()
		}),
]

module.exports = {
	createRules,
	updateRules,
	loginRules,
}
