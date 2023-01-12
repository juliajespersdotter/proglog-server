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
db.Game_Userlist = require('./Game_Userlist')(sequelize, DataTypes)
db.Review = require('./Review')(sequelize, DataTypes)

db.User.hasMany(db.User_List, { foreignKey: 'user_id' })
db.User.hasMany(db.Review, { foreignKey: 'user_id' })
db.Review.belongsTo(db.User, { foreignKey: 'user_id' })
// this.Game_Userlist.belongsTo(this.User_List)

db.sequelize.sync({ force: false }).then(() => {
	console.log('yes re-sync done!')
})

module.exports = db
