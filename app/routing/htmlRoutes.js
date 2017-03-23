var bcrypt = require("bcrypt");
var db = require("../../models");

module.exports = function(app){
	app.get('/', function(req, res) {
		res.send('test');
	});

	app.post('/', function(req, res){
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				// insertion into MySQL
			    db.User.create({
			      username: req.body.username,
			      password: hash 
			    }).then(function(dbUser) {
			      // We have access to the new todo as an argument inside of the callback function
			      res.json(dbUser);
			    });
			});
		});
	});
};