var bcrypt = require("bcrypt");
var db = require("../../models");
var path = require("path");
var util = require('util');

module.exports = function(app){	

	app.post('/api/register', function(req, res){
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				// insertion into MySQL
				return db.sequelize.transaction(function (t) {

				  // chain all your queries here. make sure you return them.
				  return db.User.create({
				    username: req.body.username,
				    password: hash
				  }, {transaction: t}).then(function (user) {
				    return db.Info.create({
				      first: req.body.first,
				      last: req.body.last,
				      email: req.body.email,
				      UserId: user.id
				    }, {transaction: t});
				  });

				}).then(function (result) {
				  // Transaction has been committed
				  // result is whatever the result of the promise chain returned to the transaction callback
				  res.send(200);
				}).catch(function (err) {
				  // Transaction has been rolled back
				  // err is whatever rejected the promise chain returned to the transaction callback
				  res.send(500, err.errors[0].message);
				});
			});
		});
	});

	app.post('/api/test', function(req, res){
		db.Adventure.create({
			test: req.body.test,
			test2: req.body.test2,
			UserId: req.body.id
		}).then(function(dbAdventure){
			res.send('created');
		}).catch(function(err){
			res.send(500);
		});
	});

	app.post('/api/login', function(req, res){
		db.User.findOne({
			where: {username: req.body.username}
		}).then(function(dbUser){
			bcrypt.compare(req.body.password, dbUser.password, function(err, result) {
				if(result) {
					console.log('authorized');
					req.session.user = dbUser.dataValues;
					console.log(req.session.user);
					res.send(200);
				} else {
					console.log("not an authorized user");
					res.send(500);
				}
			});
		});
	});

	app.get('/api/user', function(req, res){
		res.locals.user = req.session.user;
		res.send(res.locals.user);
	});
	
	app.get('/api/adventure', function(req, res){


	});
};