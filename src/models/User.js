/**
 * User model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(45),
				// allowNull defaults to true
			},
			password: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			tableName: 'users',
			// Other model options go here
		}
	)
}
