
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
		//if station is undefined only render search but 
		db.Location.all()
			.then(function(locations) {
				res.render('search', {locations: locations
			});			
		});		
	} 
		else {
			//else parse API and declare functionality below --> what is displayed on paragliding.ejs
			var url = "http://api.wunderground.com/api/" + api_key + "/geolookup/conditions/webcams/q/pws:" + station + ".json";
			request(url, function (err, response, body) {
			if (!err && response.statusCode === 200) {
				var jsonData = JSON.parse(body);
				console.log(url);

					//WEBCAM VIEW - explained:

					//webCamIndex is correct index position in webcam array to display the image of selected station
					//webcam images show sometimes the wrong image because array index changes accoding
					//to which webcams are turned on or off. To avoid this find arrayindex of needed station.
					//however more than 1 per station id so it wont work either

					// var webCamIndex = 0;
					
					// //function to find specific value(webcamview) in array regardless of current position
					// var indexFinder = function ()	{
						
					// 	//iterate through array of webacams and choose index of array where name is station name
					// 	for (var i=0; i<jsonData.webcams.length; i++) {
					// 		if (jsonData.webcams[i].assoc_station_id == KCADALYC1)	{
					// 			webCamIndex=i;
					// 			console.log("this is my webCamIndex" + webCamIndex); 
					// 		}
					// 		else {
					// 			webCamIndex = null;
					// 		}
					// 			return webCamIndex;
					// 	}
					// };

				// TEMP SOLUTION
				//hardcoding cam view until permanent solution
				var cam_view = jsonData.webcams[2].CURRENTIMAGEURL;
console.log(cam_view);
				//define other necessary variables (winddirection,windspeed etc) that define flyability:
				var curObs = jsonData.current_observation;
				var wind_string = curObs.wind_string;
				var wind_dir = curObs.wind_dir;
				var dewpoint_string = curObs.dewpoint_string;
				var wind_degrees = curObs.wind_degrees;
				var temp_f = curObs.temp_f;
				var precip_today_string = curObs.precip_today_string;
				var wind_mph = curObs.wind_mph;
				var cam_view = '';

					//calculate flyability for location

					//min&maxDegree are limits of possible wind direction to fly
					//min&max Speed are limits of windspeed
					
					var face = 0;
					var myConclusion = '';
					var minDegree = 0;
					var maxDegree = 0;
					var minSpeedIdeal = 20;
					var maxSpeedIdeal = 50;
					var minSpeedLimit = 10;
					var maxSpeedLimit = 60;

						
					// db.Location.find({where: {stationCode: station }} )
					// .then(function(station) {
						//calculate needed wind direction & webcam view for each location

						if (station = "KCADALYC1")	{
							face = 270;
							cam_view = "http://www.wunderground.com/webcams/barenjager/1/show.html";
						}
						else if (station = "KCAMILPI6")	{
							face = 180;
							cam_view = "http://png-5.findicons.com/files/icons/1043/i_like_buttons_3c/512/remote_go.png";
						}
						else if (station = "KCASTINS5")	{
							face = 90;
							cam_view = "http://png-5.findicons.com/files/icons/1043/i_like_buttons_3c/512/remote_go.png";
						}
						else {
							face = 90;
							cam_view = "http://png-5.findicons.com/files/icons/1043/i_like_buttons_3c/512/remote_go.png blah blah";
						};
			
						//calculate Flyability 

						if ( (face - 45 < wind_degrees && face + 45 > wind_degrees ) && 
							( wind_mph < 12 && wind_mph < 14) )	{
							myConclusion = "Flyable Conditions";
						} 	else if ( (face - 75 < wind_degrees && face + 75 > wind_degrees) &&
									(wind_mph < 11 && wind_mph < 16) )	 {
									myConclusion = "Not Ideal Flying Conditions"
						} 	else {

							myConclusion = "It is not safe to fly today.";
						};

					// });
				}//closes if-err
				//associate elements to site 'tacos'
				res.render("site/paragliding", {
					wind_string: wind_string,
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
				
		})//close request function
		}//else statement
}); //closes app.post



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
		res.redirect('/login');
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

						app.get('/profile/edit', function(req,res) {
							var fname = req.body.fname;
							var lname = req.body.lname;
							var age = req.body.age;
							var phone = req.body.phone;

							db.User.findOrCreate({where: {email:email}})
							.then(function(update)	{
								update.fname = fname,
								update.lname = lname,
								update.age   = age,
								update.phone = phone
								update.save();
							});
						});


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


app.get('/', function (req, res) {
		res.render('index');
});

