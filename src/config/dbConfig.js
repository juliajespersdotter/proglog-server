module.exports = {
	HOST: process.env.MYSQLHOST,
	USER: process.env.MYSQLUSER,
	PASSWORD: process.env.MYSQLPASSWORD,
	PORT: process.env.MYSQLPORT,
	DB: process.env.MYSQLDATABASE,
	DIALECT: 'mysql',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
}
