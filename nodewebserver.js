var http=require('http'),
	url = require('url'),
	mime = require('mime'),//npm install mime
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes';
http.createServer(function(req,res) {
	 pathname = "/char/mychar0;
	 console.log(pathname);

	fs.stat(pathname , function(err,stats){
	  if(err) { 
		res.writeHead(404);
		res.write('Bad Request , Request cannot be accepted');
		res.end()
		}
	else if(stats.isCharacterDevice()) {
		//content-type
		var type = mime.lookup(pathname);
		console.log(type);
		res.setHeader('Content-Type',type);

		// 200 status - found , no errors 
		res.statusCode = 200;
	
		//create a readable stream and pipe to the http response 
		var file = fs.createReadStream(pathname);
		file.on("open",function() { 
			file.pipe(res);
		});
		file.on("error",function(err) {
			cosole.log(err);
		});
	     }
	else {
		res.writeHead(403);
		res.write('Driver not yet loaded , error in the server ');
		res.end();
		}
	});
}).listen(8124);
console.log('Server running at 8124');
		
