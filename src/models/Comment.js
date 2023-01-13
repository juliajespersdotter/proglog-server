/**
 * Comment model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'comment',
		{
			// Model attributes are defined here
			content_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			content: {
				type: DataTypes.TEXT('tiny'),
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			created_on: {
				type: DataTypes.DATE(),
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: 'comments',
			timestamps: false,
			// Other model options go here
		}
	)
}
