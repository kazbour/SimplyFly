
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
var env = process.env;
var api_key = env.MY_API_KEY;


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

app.get('/', function (req, res) {
		res.render('index');
});


/****  DISPLAY WEATHER INFORMATION   ****/
//main functionality

app.get('/search', function (req, res) {
	var station = req.query.q3 || null;
	var userId = req.session.userId || null;

	if(!station) {
		// Get all stations to use in the search form.
		db.Location.all()
			.then(function(locations) {
				res.render('search', {locations: locations});
			
		})
		

	} else {
		var url = "http://api.wunderground.com/api/" + api_key + "/geolookup/conditions/webcams/q/pws:" + station + ".json";

		request(url, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				var jsonData = JSON.parse(body);

				//define necessary variables to define flyability:

				var wind_string = jsonData.current_observation.wind_string;
				var wind_dir = jsonData.current_observation.wind_dir;
				var cam_view = jsonData.webcams[27].CURRENTIMAGEURL;
				var dewpoint_string = jsonData.current_observation.dewpoint_string;
				var wind_degrees = jsonData.current_observation.wind_degrees;
				var temp_f = jsonData.current_observation.temp_f;
				var precip_today_string = jsonData.current_observation.precip_today_string;
				var wind_mph = jsonData.current_observation.wind_mph;
				
				//define flyability for location


				
				var myConclusion=0


				// my suggestion for how to calculate flyability
				// var mountainDirection = 270; // WEST FACING
				// var low_degrees = mountainDirection - 45;
				// var high_degrees = mountainDirection + 45;

				// if ( mountainDirection-45 < wind_dir && mountainDirection+45 > wind_dir ) {
				// 	myConclusion = "It looks flyable today.";
				// } elseif ( mountainDirection-75 < wind_dir && mountainDirection+75 > wind_dir) {

				// } else {
				// 	myConclusion = "Unsafe.";
				// }




				if (wind_dir === "W" || "NW" || "SW") {
				 	myConclusion = "It looks flyable today.";
				}
				if (wind_dir === "NNW" || "SSW") {
					myConclusion = "Not ideal flying conditions. "
				}
				 else {  
					myConclusion = "It is not safe to fly today."
				};


			}

			res.render("site/paragliding", {wind_string: wind_string,
				wind_dir: wind_dir, 
				cam_view: cam_view,
				dewpoint_string:dewpoint_string,
				wind_degrees: wind_degrees,
				temp_f: temp_f,
				precip_today_string: precip_today_string,
				wind_mph:wind_mph,
				myConclusion: myConclusion,
				station: station,
				userId: userId
			});
		})
	}
});


/****  LOGIN   ****/

app.get('/login', function (req, res) {
	req.currentUser().then(function(user){
		if (user) {
			res.redirect('/profile', { user: user});
		} else {
			res.render('users/login', {err: req.session.error});
		}
	});
});


app.post('/login', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.authenticate(email,password)
	  .then(function(myUser){
	  	if(myUser) {
	  		req.login(myUser);
	  		res.redirect('/search');
	  	} else {
	  		req.session.error = "Wrong email or password";
	  		res.redirect('/login');
	  	}
	  }); 
});


/****  SIGNUP ****/

app.get('/signup', function (req,res)	{
	res.render('users/signup');
});


app.post('/signup', function(req,res){
	var email = req.body.email;
	var password = req.body.password;
	db.User.createSecure(email,password)
	.then(function(signupUser) {
		res.redirect('/users/profile');
	});
});


/****  PROFILE   ****/

app.get('/profile', function (req,res)	{
	if(req.session.userId === null) {
   	// User is not logged in, so don't let them pass
   		res.redirect("/login");
 	} else {
 		db.User.find(req.session.userId).then(function(dbUser){
 			dbUser.getLocations().then(function(locations) {
 				res.render('users/profile', { user: dbUser, locations: locations });

 			})
       		
   		});
 	}
});

/****  SAVE FAVORITE LOCATION  ****/

app.post('/profile', function(req, res) {
	// THis route is ONLY intended to save the favorite to the database, another route will be responsible for displaying a user's profile
	var station = req.body.station;
	var userId = req.session.userId || null;

	if(userId) {
		db.User.find(userId).then(function (user) {
			console.log("\n\n\n\n\n\nTHIS IS THE USER:", user);
			db.Location.find({where: {stationCode: station }} )
				.then(function(location) {
					console.log("\n\n\n\n\nTHIS IS THE LOCATION FOR FAVORITING:", location);
					user.addLocation(location);
					res.redirect('/profile');
				});
		});
	} else {
		res.redirect('/login');
	}
})


/****  EDIT  ****/

app.get('/profile/edit', function (req,res)	{
	res.render('users/edit');
});

//maybe later

						// app.get('/profile/edit', function(req,res) {
						// 	var fname = req.body.fname;
						// 	var lname = req.body.lname;
						// 	var age = req.body.age;
						// 	var phone = req.body.phone;

						// 	db.User.findOrCreate({where: {email:email}})
						// 	.then(function(update)	{
						// 		update.fname = fname,
						// 		update.lname = lname,
						// 		update.age   = age,
						// 		update.phone = phone
						// 		update.save();
						// 	});
						// });


/****  LOGOUT  ****/

app.get('/logout', function (req,res) {
	// req.logout();
	req.session.userId = null;
	req.user = null;
	res.render('users/logout');
});



// DO NOT USE THIS ROUTE UNLESS YOU WANT TO DESTROY YOUR DATABASE

// app.get('/sync', function(req, res) {
// 	db.sequelize.sync().then(function() { res.send("DB Synced successfully.") })
// })




app.listen(3000, function(){
	console.log("I'm listening");
});

