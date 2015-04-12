
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



//////////////////////////////////////////////////////////////
/*					MIDDLEWARE								*/
//////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');

app.set("view engine", "ejs");	
// This defines req.session
// app.use(session({
// 	secret: "If I tell you what I am it won't be a secret anymore.",
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

/****  index   ****/
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/logout', function (req,res) {
	res.render('logout');
})

/****  user/new + user/id ****/
app.get('/signup', function (req,res)	{
	res.render('signup');
});

/****  user/id   ****/
app.get('/profile', function (req,res)	{
	res.render('profile');
});

/****  user/id/edit   ****/
app.get('/profile/edit', function (req,res)	{
	res.render('edit');
});

/****  user/id(delete)   ****/
app.get('/profile/delete', function (req,res)	{
	res.render('delete');
});









app.listen(3000, function(){
	console.log("I'm listening");
});











