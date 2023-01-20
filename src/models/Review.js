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
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			hide: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT('medium'),
				allowNull: false,
				// allowNull defaults to true
			},
			rating: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			created_on: {
				type: DataTypes.DATE(),
			},
			game_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			game_name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
		},
		{
			tableName: 'reviews',
			timestamps: false,
			// Other model options go here
		}
	)
}
