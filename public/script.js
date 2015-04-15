
 $(function()	{

$('button').on('click', function() {
	$('.info ul').remove();
	$('<i class ="fa fa-refresh fa-spin"/>').appendTo('body');
	var station = $('select option:selected').text().substring(1,9);
$getJSON('http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:' + station + '.json', function (parsed_json) {
			var wind_dir = parsed_json['current_observation']['wind_dir'];
			var temp_f = parsed_json['current_observation']['temp_f'];
			var wind_string = parsed_json['current_observation']['wind_string'];
			var wind_degrees = parsed_json['current_observation']['wind_degrees'];
			var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
			var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
			var items=[wind_dir, temp_f] 
			$('.inner').append(items);
		});
});




// $('button').on('click', function() {
// 	$('.info ul').remove();
// 	$('<i class ="fa fa-refresh fa-spin"/>').appendTo('body');

// 	var station = $('select option:selected').text().substring(1,9);
// 		$.ajax({
// 		  url : 'http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:' + station + '.json',
// 		  dataType : "jsonp",
// 		  success : function(parsed_json) {
// 		  		console.log("it works");
// 			  var wind_dir = parsed_json['current_observation']['wind_dir'];
// 			  var temp_f = parsed_json['current_observation']['temp_f'];
// 			  var wind_string = parsed_json['current_observation']['wind_string'];
// 			  var wind_degrees = parsed_json['current_observation']['wind_degrees'];
// 			  var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
// 			  var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
// 			  var items=[wind_dir, temp_f] }
		 

// 		$('.inner').append(items);
// 	});
// });




// 	$.getJSON('http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:' + station + '.json', function (data) {
// 		var items = [],
// 			$ul;

			
// 			})
// 	})

// 	//alert( $(this).val() );
//  	$.ajax({
//   url : "http://api.wunderground.com/api/4a708c684d4f6a6b/geolookup/conditions/q/pws:KCADALYC1.json",
//   dataType : "jsonp",
//   success : function(parsed_json) {
//   var wind_dir = parsed_json['current_observation']['wind_dir'];
//   var temp_f = parsed_json['current_observation']['temp_f'];
//   var wind_string = parsed_json['current_observation']['wind_string'];
//   var wind_degrees = parsed_json['current_observation']['wind_degrees'];
//   var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
//   var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];


//   //var cam_view = parsed_json['webcams']['27']['city'];
//   var items = []
//   }
// });
// }); //close select function

//pws.station.id: KCADALYC1












 //	$('select').on('change', function() {
//   alert( $(this).val() ); // or $(this).val()
//   	$.ajax({
//   		url: "http://api.wunderground.com/api/4a708c684d4f6a6b/conditions/q/CA/"+$(this).val()+"temp_c.json" }).then(function(data, body){
//   				$('.conditions').append(data);
//   				var data = JSON.parse(body);
//   				console.log(data);

//   		});
//   	});
// });


// app.get('/', function (req,res) {
// 	$('select').on('change', function() {
//   		var displaycity = $(this).val();
// 		var url = "http://api.wunderground.com/api/4a708c684d4f6a6b/conditions/q/CA/"+displaycity	
//  		request(url, function(err, response, body) {
//    		 if (!err && response.statusCode == 200) {
//       		var jsonData = JSON.parse(body);

//       			console.log("THIS IS THE RESPONSE", response);
//       			console.log("\n\n\n\n\n\n\n\n\n\nTHIS IS THE BODY", body);
//     		}
//     	})		
// 	});
// });

});













/*
instead of alert use ajax
url & parameters( or alias -> tacos or my locations) here it is already $(this).val


url setup in app.js similar to routes setup
create function eg app.get  --> link to url


*/
