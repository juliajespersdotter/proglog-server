/**
 * User Validation Rules
 */

const { body } = require('express-validator')
const db = require('../models')

const createSteamRules = [
	body('steamId')
		.exists()
		.custom(async value => {
			const user = await db.User.findOne({
				where: { steamId: value },
			})
			if (user) {
				return Promise.reject('Steam account is already in use.') // duplicate emails not allowed
			}

			return Promise.resolve()
		}),
	body('displayName'),
	body('avatar'),
]

const createGoogleRules = [
	body('id')
		.exists()
		.custom(async value => {
			const user = await db.User.findOne({
				where: { googleId: value },
			})
			if (user) {
				return Promise.reject('Google account is already in use.') // duplicate emails not allowed
			}

			return Promise.resolve()
		}),
	body('displayName'),
]

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
	createSteamRules,
	createGoogleRules,
	createRules,
	updateRules,
	loginRules,
}
