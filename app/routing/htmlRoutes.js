var bcrypt = require("bcrypt");
var db = require("../../models");
var path = require("path");

module.exports = function(app){
	app.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname,'/../public/', "index.html"));
	});

	app.get('/createlogin', function(req, res) {
	  res.sendFile(path.join(__dirname,'/../public/', "createlogin.html"));
	});

	app.get('/logout', function(req, res) {
		//this will clear out our session data
	 	req.session.reset();
	 	res.redirect('/');
	});

	app.get('/adventure', function(req, res) {
	  if (req.session && req.session.user) { // Check if session exists
	  	console.log(req.session.user);
	    res.sendFile(path.join(__dirname,'/../public/', "adventure.html"));
	  } else{
	  	res.sendFile(path.join(__dirname,'/../public/', "createlogin.html"));
	  }
	});
};