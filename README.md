### Flyable 

##Description:
FlyAble Application to inform para gliders and hang gliders about wind (& weather) conditions at their usual flying spot.   

The weather underground api (http://www.wunderground.com/weather/api/) can give information about wind direction and wind speed at specific weather stations.  Sign up/login connects the user to a profile site that lets you pick one or more locations and then shows the weather pattern for this location.
Locations will be stored in a database and connected to the user database. 
Bonus: 
1) Hardcode an algorithm that determines if it is flyable or not instead of just showing the wind conditions.
2) Create a GUI in /profile/edit so the User can define her or his own version of what is a flyable condition.

##API used:

##Bootstrap

##Restful Routes:

```js
/****  index   ****/
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/logout', function (req,res) {
    res.render('logout');
})

/****  user/new + user/id ****/
app.get('/signup', function (req,res)    {
    res.render('signup');
});

/****  user/id   ****/
app.get('/profile', function (req,res)    {
    res.render('profile');
});

/****  user/id/edit   ****/
app.get('/profile/edit', function (req,res)    {
    res.render('edit');
});

/****  user/id(delete)   ****/
app.get('/profile/delete', function (req,res)    {
    res.render('delete');

```

Removed features that may be added later:

## APP.Js

```js

// ADD FUNCTIONALITY FOR DELETE IN APP.USE
  	// req.delete = function () {
  	// 	return db.User.
  	// 		find({ 
  	// 			where: {
  	// 			id: req.session.userId
  	// 			}
  	// 		})
  	// 		.then(function(deleter){
   //  		deleter.destroy().then(function() {})
  	// 		})



/****  ROUTE for : user/id(delete)   ****/

// app.get('/profile/delete', function (req,res)	{
// 	res.render('delete');
// });


// app.post('/delete', function(req,res){
// 	req.delete();
// 	var email = req.body.email;
// 	var password = req.body.password;
// 	db.User.createSecure(email,password)
// 	.then(function(signupUser) {
// 		res.redirect('profile');
// 	});
// });

```

##delete.ejs

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Flyable</title>

</head>
<body>

	<h1>Sorry to see you leave</h1>
		<div>
			Sign Up below if you have changed your mind.
		</div>
				<div>
		<form method="POST" action="/signup"?_method=DELETE>
			<div>
				<input type="email" name="email" placeholder="email">
			</div>
			<div>
				<input type="password" name="password" placeholder="password">
			</div>
			<button>Sign Up</button>
		</form>

</body>
</html>

```

<% if (err) { %>
			<div style="color:red;">
				<%= err %>
			</div>
		<% } %>



