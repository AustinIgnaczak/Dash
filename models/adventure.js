module.exports = function(sequelize, DataTypes){
	var Adventure = sequelize.define("Adventure", {
		test: DataTypes.STRING,
		test2: DataTypes.STRING,
	},
    {
		classMethods: {
			associate: function(models){
				Adventure.belongsTo(models.User, {
					foreignKey: {
						allowNull: false
					}
				});
			}
	}       	
	});
	return Adventure;
}