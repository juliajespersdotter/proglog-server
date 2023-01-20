/**
 * User model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			// Model attributes are defined here
			username: {
				type: DataTypes.STRING(45),
			},
			steamId: {
				type: DataTypes.INTEGER,
			},
			googleId: {
				type: DataTypes.INTEGER,
			},
			avatar: {
				type: DataTypes.STRING,
			},
		},
		{
			tableName: 'users',
			timestamps: false,
			// Other model options go here
		}
	)
}
