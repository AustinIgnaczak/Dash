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
			    }).catch(function(err){
			    	res.send(err.errors[0].message);
			    });
			});
		});
	});

	app.post('/login', function(req, res){
		db.User.findOne({
			where: {username: req.body.username}
		}).then(function(dbUser){
			bcrypt.compare(req.body.password, dbUser.password, function(err, result) {
				if(result) {
					console.log("authorized user");
					res.send('authorized');
				} else {
					console.log("not an authorized user");
					res.send('not authorized');
				}
			});
		});
	});
};