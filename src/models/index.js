// Setting up the database connection
const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/dbConfig')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error)
	})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./User')(sequelize, DataTypes)
db.User_List = require('./User_List')(sequelize, DataTypes)

// models.Posts = require('./Posts')(bookshelf)
// models.User = require('./User')(sequelize)
// console.log(db.User === sequelize.db.User) // true

db.sequelize.sync({ force: false }).then(() => {
	console.log('yes re-sync done!')
})

module.exports = db
