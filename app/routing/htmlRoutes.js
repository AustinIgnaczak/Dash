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

	app.get('/adventure', function(req, res) {
	  if (req.session && req.session.user) { // Check if session exists
	    // lookup the user in the DB by pulling their username from the session
	    db.User.findOne({ username: req.session.user.username }, function (err, user) {
	      if (!user) {
	        // if the user isn't found in the DB, reset the session info and
	        // redirect the user to the login page
	        req.session.reset();
	        res.sendFile(path.join(__dirname,'/../public/', "index.html"));
	      } else {
	        // expose the user to the template
	        res.locals.user = user;
	      }
	    });
	  } else {
	  	console.log('test');
	    res.redirect('/');
	  }
	});
};