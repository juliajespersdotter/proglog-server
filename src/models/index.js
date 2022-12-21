// Setting up the database connection
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('proglogDB', {
	host: 'localhost',
	dialect:
		'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
})

try {
	await sequelize.authenticate()
	console.log('Connection has been established successfully.')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}

// const models = {}
// models.Posts = require('./Posts')(bookshelf)
// models.User = require('./User')(bookshelf)

module.exports = {
	// bookshelf,
	// ...models,
}
