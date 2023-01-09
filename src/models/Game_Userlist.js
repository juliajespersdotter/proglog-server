/**
 * User_List model
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
				// allowNull defaults to true
			},
		},
		{
			tableName: 'games_userlists',
			timestamps: false,
			// Other model options go here
		}
	)
}