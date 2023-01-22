// Setting up the database connection
const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/dbConfig')

const URI = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`

const sequelize = new Sequelize(URI)

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
db.Comment = require('./Comment')(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => {
	console.log('yes re-sync done!')
})

module.exports = db
