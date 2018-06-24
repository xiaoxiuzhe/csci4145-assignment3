/**
 * http://usejsdoc.org/
 */
var http = require("http");
var cloudinary = require('cloudinary');
var qs = require('querystring');
var firebase = require('firebase');

//firebase config
var firebaseconfig = {
	    apiKey: "AIzaSyAgDIpMAIwzwrjycBYmoosAQOUeG6WWIOs",
	    authDomain: "csci4145-assignment3.firebaseapp.com",
	    databaseURL: "https://csci4145-assignment3.firebaseio.com",
	    projectId: "csci4145-assignment3",
	    storageBucket: "csci4145-assignment3.appspot.com",
	    messagingSenderId: "1062433217138"
	  };
	  firebase.initializeApp(firebaseconfig);
	  //log database activities
	  firebase.database.enableLogging(function(message) {
		  console.log("[FIREBASE]", message);
		});
	  
//cloudinary config
cloudinary.config({ 
	  cloud_name: 'shawnx', 
	  api_key: '171542994931613', 
	  api_secret: 'BLbxRKPLq1lrmYgKst2pvO_RBmI' 
	});

//start the server 
var server = http.createServer(function(request, response){
	
//	console.log(request.method);
	
	//answer preflight request
	//cited from https://gist.github.com/nilcolor/816580
	if (request.method === "OPTIONS") {
//	      console.log('!OPTIONS');
	      var headers = {};
	      // IE8 does not allow domains to be specified, just the *
	      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
	      headers["Access-Control-Allow-Origin"] = "*";
	      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	      headers["Access-Control-Allow-Credentials"] = false;
	      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	      response.writeHead(200, headers);
	      response.end();
	}
	

	//answer DELETE request
	if(request.method == "DELETE"){
		
		
		//parse request.body
		//cited from https://stackoverflow.com/questions/4295782/how-do-you-extract-post-data-in-node-js
		var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });
        
        request.on('end', function () {
            var data = qs.parse(body);
//            console.log(data);
            for (var key in data) {
        		var pieces =  key.split("#");
        		var img_id = pieces[0];
        		var student_id = pieces[1];
        		var nickName = pieces[2];
        		
//        		console.log(student_id);
        		
        		//remover user in firebase
        		var query = firebase.database().ref("users").orderByKey();
        		query.once("value")
        		  .then(function(snapshot) {
        		    snapshot.forEach(function(childSnapshot) {
        		      if(childSnapshot.val().StudentID == student_id){
        		    	  var ref = firebase.database().ref("users").child(childSnapshot.key);
        		    	  ref.remove();
        		      }
        		  });
        		});
        		
        		//remove user img in cloudinary
            	cloudinary.v2.api.delete_resources([img_id],
            		    function(error, result){
//            		console.log(result);
            		});
            	
    			response.writeHead(200,{"Content-Type":"text/json;"});
    			response.end();
        	}

        });
	}
	
}).listen(8888);
