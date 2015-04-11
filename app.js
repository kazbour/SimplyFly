
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

//npm install --save pg body-parser method-override bcrypt ph-hstore sequelize ejs


//////////////////////////////////////////////////////////////
/*					MIDDLEWARE								*/
//////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

// app.use(session({
// 	secret: "I'm very very secret thing",
// 	resave: false,
// 	save: {
// 		uninitialize: true
// 	}
// }));

app.use(methodOverride("_method"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));



//////////////////////////////////////////////////////////////
/*					ROUTES  								*/
//////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.get('/signup', function (req,res)	{
	res.send("This will be my sign up page");
});

app.get('/user', function (req,res)	{
	res.send("This will be my user page. Hello there User");
	console.log("/lksdjflksdjflkds");
});

app.get('/user/edit', function (req,res)	{
	res.send("This will be my user page. Hello there User");
	console.log("/lksdjflksdjflkds");
});











app.listen(3000, function(){
	console.log("I'm listening");
});











