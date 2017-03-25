var bcrypt = require("bcrypt");
var db = require("../../models");
var path = require("path");

module.exports = function(app){
	app.get('/', function(req, res) {
	  res.sendFile(path.join(__dirname,'/../public/', "index.html"));
	});

	app.get('/logout', function(req, res) {
		//this will clear out our session data
	 	req.session.reset();
	 	res.redirect('/');
	});
};