# Flyable 

###Description:
FlyAble is a simple Weather application catering for paragliders. It gives paragliders and hanggliders information about wind (& weather) conditions at their usual flying spot.  

The weather underground api (http://www.wunderground.com/weather/api/) provides information about wind direction and wind speed at specific weather stations. Weather stations have been selected only when in close proximity to the launch site to increase accuracy of wind predictions. 

Sign up/login connects the user to a profile site that lets you pick one or more locations and then shows the weather conditions for this location.
Locations will be stored in a database and connected to the user database. 

Bonus && || future Add-ons: 
*	Hardcode an algorithm that determines if it is flyable or not instead of just showing the wind conditions.
*	Add more stations and make it possible for Users to recommend launch locations and weather stations
*	Add another sport that is weather dependent, such as any form of surfing

###API used:

Weather Underground API


* delete Route

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




