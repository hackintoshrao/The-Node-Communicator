var http=require('http'),
	url = require('url'),
	mime = require('mime'),//npm install mime
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes';
http.createServer(function(req,res) {
	 path = "/home/karthic/codes/driver/git1/linkpage.html";
	 driver_path = "/dev/mychar0";
	 console.log(pathname);

	fs.stat(path , function(err,stats){
	  if(err) { 
		res.writeHead(404);
		res.write('Bad Request , Request cannot be accepted');
		res.end()
		}
	else (path.exits('/dev/mychar0')) {
		
		fs.stat(driver_path		
			
		
		
		
	 	
	
	
		//create a readable stream and pipe to the http response 
		var file = fs.createWriteStream(pathname);
		file.on("open",function() { 
			file.pipe(res);
		});
		file.on("error",function(err) {
			cosole.log(err);
		});
	     }
	else if(!path.exits('/dev/char0')){
		res.writeHead(403);
		res.write('Driver not yet loaded , error in the server ');
		res.end();
		}
	else { 
		res.writeHead(404);
		res.write('Directory cannot be accessed');
		res.end();
		}	
	});
}).listen(8124);
console.log('Server running at 8124');
		
