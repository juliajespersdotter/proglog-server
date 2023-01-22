/**
 * User_List model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user_list',
		{
			list_name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			private: {
				type: DataTypes.BOOLEAN,
			},
			deletable: {
				type: DataTypes.BOOLEAN,
			},
			user_id: {
				type: DataTypes.INTEGER,
				foreignKey: true,
				allowNull: false,
				references: {
					model: 'user',
				},
			},
			description: {
				type: DataTypes.STRING(45),
			},
		},
		{
			tableName: 'user_lists',
			timestamps: false,
		}
	)
}
