const { DataTypes } = require('sequelize')
const sequelize = require('./index')

module.exports = sequelize => {
	return sequelize.define(
		'User',
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				// allowNull defaults to true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			// Other model options go here
		}
	)
}

// `sequelize.define` also returns the model
