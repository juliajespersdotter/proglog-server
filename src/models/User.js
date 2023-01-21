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
				type: DataTypes.VARCHAR(45),
			},
			googleId: {
				type: DataTypes.VARCHAR(45),
			},
			avatar: {
				type: DataTypes.VARCHAR(255),
			},
		},
		{
			tableName: 'users',
			timestamps: false,
			// Other model options go here
		}
	)
}
