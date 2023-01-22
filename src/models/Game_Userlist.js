/**
 * Game_Userlist model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'game_userlist',
		{
			list_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				foreignKey: true,
				references: {
					model: 'user_list',
				},
			},
			game_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			date_added: {
				type: DataTypes.DATE(),
				allowNull: false,
			},
			rating: {
				type: DataTypes.INTEGER,
			},
			favorited: {
				type: DataTypes.BOOLEAN,
			},
			game_name: {
				type: DataTypes.TEXT('tiny'),
				allowNull: false,
			},
		},
		{
			tableName: 'games_userlists',
			timestamps: false,
		}
	)
}
