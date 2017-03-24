module.exports = function(sequelize, DataTypes){
	var User = sequelize.define("User", {
		username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                message: 'Username must be unique.',
                fields: [sequelize.fn('lower', sequelize.col('username'))]
            }
        },
		password: DataTypes.STRING,
		first: DataTypes.STRING,
		last: DataTypes.STRING,
		email: DataTypes.STRING
	});
	return User;
}