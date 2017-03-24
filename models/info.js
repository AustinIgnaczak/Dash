module.exports = function(sequelize, DataTypes){
	var Info = sequelize.define("Info", {
		first: DataTypes.STRING,
		last: DataTypes.STRING,
		email: {
			type: DataTypes.STRING,
			unique: {
				args: true,
				message: 'This email is already in use.',
				fields: [sequelize.fn('lower', sequelize.col('email'))]
			}
		},
		{
			classMethods: {
				associate: function(models){
					Info.belongsTo(models.User, {
						foreignKey: {
							allowNull: false
						}
					});
				}
			}
		}
	});
	return Info;
}