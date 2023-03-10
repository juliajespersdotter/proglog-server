/**
 * User model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user',
		{
			username: {
				type: DataTypes.STRING(45),
			},
			steamId: {
				type: DataTypes.STRING(45),
			},
			googleId: {
				type: DataTypes.STRING(45),
			},
			avatar: {
				type: DataTypes.STRING(255),
			},
		},
		{
			tableName: 'users',
			timestamps: false,
		}
	)
}
