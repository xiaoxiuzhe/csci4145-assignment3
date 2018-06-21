/**
 * http://usejsdoc.org/
 */
var http = require("http");
var cloudinary = require('cloudinary');
var qs = require('querystring');

cloudinary.config({ 
	  cloud_name: 'shawnx', 
	  api_key: '171542994931613', 
	  api_secret: 'BLbxRKPLq1lrmYgKst2pvO_RBmI' 
	});

var server = http.createServer(function(request, response){
	
	console.log(request.method);
	
	//answer preflight request
	//cited from https://gist.github.com/nilcolor/816580
	if (request.method === "OPTIONS") {
	      console.log('!OPTIONS');
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
	
	//answer get request
	if(request.method == "GET"){
		cloudinary.v2.api.resources(function(error, result){
			for(var i = 0; i < result.resources.length; i++) {
				var obj = result.resources[i];
			    console.log(obj.url);
			}
//			console.log(result);
			response.writeHead(200,{"Content-Type":"text/json;"});
			response.write(JSON.stringify(result));
			response.end();
			});
	}

	//answer get request
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
            var DELETE = qs.parse(body);
            for (var key in DELETE) {
            	cloudinary.v2.api.delete_resources([key],
            		    function(error, result){console.log(result);});
            	console.log(key + "deleted");
    			response.writeHead(200,{"Content-Type":"text/json;"});
    			response.end();
            }
        });
	}
	
}).listen(8888);

