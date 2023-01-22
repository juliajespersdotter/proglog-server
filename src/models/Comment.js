/**
 * Comment model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'comment',
		{
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
		}
	)
}
