// Setting up the database connection
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('proglogDB', 'root', null, {
	host: process.env.DB_HOST,
	dialect:
		'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error)
	})

const models = {}
// models.Posts = require('./Posts')(bookshelf)
models.User = require('./User')(sequelize)
console.log(models.User === sequelize.models.User) // true

module.exports = {
	sequelize,
	// ...models,
}
