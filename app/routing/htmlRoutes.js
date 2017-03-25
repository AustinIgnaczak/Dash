var bcrypt = require("bcrypt");
var db = require("../../models");

module.exports = function(app){
	app.get('/', function(req, res) {
		res.send('test');
	});

	app.get('/logout', function(req, res) {
		//this will clear out our session data
	 	req.session.reset();
	 	res.redirect('/');
	});
};