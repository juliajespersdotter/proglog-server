/**
 * Review model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'review',
		{
			// Model attributes are defined here
			user_id: {
				type: DataTypes.INTEGER,
			},
			title: {
				type: DataTypes.STRING(45),
			},
			hide: {
				type: DataTypes.BOOLEAN,
			},
			content: {
				type: DataTypes.TEXT('tiny'),
				// allowNull defaults to true
			},
			created_on: {
				type: DataTypes.DATE(),
			},
			game_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: 'reviews',
			timestamps: false,
			// Other model options go here
		}
	)
}
