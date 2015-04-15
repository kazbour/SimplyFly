
//////////////////////////////////////////////////////////////
/*					REQUIREMENTS							*/
//////////////////////////////////////////////////////////////

var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");
var request = require('request');
var methodOverride = require('method-override');
var session = require("express-session");
var app = express();
var db = require("./models");
var Sequelize = require('sequelize');



//////////////////////////////////////////////////////////////
/*					MIDDLEWARE								*/
//////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');


//Cookie
app.use(session({
	secret: "If I tell you it won't be a secret anymore.",
	resave: false,
	save: {uninitialized: true}
}));


//Define login functionality
app.use("/", function (req, res, next) {
	req.login = function (user) {
        req.session.userId = user.id;
        console.log(user.id);
    };

//Define session 
	req.currentUser = function () {
	    return db.User.
	    	find(req.session.userId)
	      	.then(function (user) {
		        req.user = user;
		        return user;
			});
  	};

//Define logout functionality  
	req.logout = function () {
		req.session.userId = null;
		req.user = null;
  	};

  	next();

});

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));



//////////////////////////////////////////////////////////////
/*					ROUTES  								*/
//////////////////////////////////////////////////////////////



/****  FRONT PAGE   ****/
 app.get('/', function(req,res){
 	var url = "http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:KCADALYC1.json"
 	request.get(url, function (err, response, body) {
		if (!err && resp.statusCode === 200) {
			var jsonData = JSON.parse(body);
			res.render('index', {taco : url})

 	}


	console.log("I'm in here 3");

				if (!jsonData.Search) {
					res.render("search", {movies: [], noMovies: true});
				}
				res.render("search", {movies: jsonData.Search, noMovies: false});

res.render('index');
});;

// var wind_dir = parsed_json['current_observation']['wind_dir'];

// app.get('/search', function (req,res)	{
//   	var url = "http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:KCADALYC1.json"+current_observation.wind_dir
//   	var results = JSON.parse(url);
//   	console.log(results);
// 	res.render('index');

// });


// app.get('/search', function (req,res)	{
//   	var url = "http://api.wunderground.com/api/4a708c684d4f6a6b/conditions/q/CA/san_francisco.json"
//   	request(url, function(err, response, body){
//   		var results = JSON.parse(body);
//   		console.log(results);
//   		var wind_dir = results.current_observation.wind_dir
//   		console.log(wind_dir);
// 		res.render('index');
// 	});
// });

//req.query.<classname>






/****  LOGIN   ****/
app.get('/users/login', function (req, res) {
	req.currentUser().then(function(user){
		if (user) {
			res.redirect('/users/profile');
		} else {
			res.render('users/login', {err: req.session.error});
		}
	});
});


app.post('/users/login', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.authenticate(email,password)
	  .then(function(myUser){
	  	if(myUser) {
	  		req.login(myUser);
	  		res.redirect('/users/profile');
	  	} else {
	  		req.session.error = "Wrong email or password";
	  		res.redirect('/users/login');
	  	}
	  }); 
});

/****  SIGNUP ****/
app.get('/users/signup', function (req,res)	{
	res.render('users/signup');
});


app.post('/users/signup', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.createSecure(email,password)
	.then(function(signupUser) {
		res.redirect('/users/profile');
	});
});

/****  PROFILE   ****/
app.get('/users/profile', function (req,res)	{
	if(req.session.userId === null) {
   	// User is not logged in, so don't let them pass
   		res.redirect("/users/login");
 	} else {
   		req.currentUser().then(function(dbUser){
     	if (dbUser) {
       		res.render('users/profile',{User:dbUser})
     		}
   		});
 	}
});



/****  EDIT  ****/
app.get('/users/profile/edit', function (req,res)	{
	res.render('users/edit');
});



						// app.get('/profile/edit', function(req,res) {
						// 	var fname = req.body.fname;
						// 	var lname = req.body.lname;
						// 	var age = req.body.age;
						// 	var phone = req.body.phone;

						// 	db.User.findOrCreate({where: {/*connect current user to current user*/}})
						// 	.then(function(update)	{
						// 		update.fname = fname,
						// 		update.lname = lname,
						// 		update.age   = age,
						// 		update.phone = phone
						// 		update.save();
						// 	})


/****  LOGOUT  ****/
app.get('/users/logout', function (req,res) {
	// req.logout();
	req.session.userId = null;
	req.user = null;
	res.redirect('/users/login');
});


app.get













app.listen(3000, function(){
	console.log("I'm listening");
});











