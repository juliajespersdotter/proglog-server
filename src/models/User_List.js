/**
 * User_List model
 */

module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'user_list',
		{
			// Model attributes are defined here
			// id: {
			// 	type: DataTypes.INTEGER,
			// 	primaryKey: true,
			// 	autoIncrement: true,
			// 	allowNull: false,
			// },
			list_name: {
				type: DataTypes.STRING(45),
				allowNull: false,
			},
			private: {
				type: DataTypes.BOOLEAN,
				// allowNull defaults to true
			},
			deletable: {
				type: DataTypes.BOOLEAN,
			},
			user_id: {
				type: DataTypes.INTEGER,
				foreignKey: true,
				allowNull: false,
				references: {
					// This is a reference to another model
					model: 'user',
				},
			},
		},
		{
			tableName: 'user_lists',
			timestamps: false,
			// Other model options go here
		}
	)
}
