var http=require('http'),
	path = require('path'),
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes/node_support';
http.createServer(function(req,res) {
	 pathname = search_path + req.url;
	console.log(pathname);
	path.exists(pathname,function(exists) {
		if(!exists) {
			res.writeHead(404);
			res.write('Invalid Request , PATH doesnt exist 404 error');
			res.end();
			}
		else{
			res.setHeader('Content-Type','text/html');
			res.writeHead(200);
			
			//create a read dtream and direct it to the HTTP response
			var file = fs.createReadStream(pathname);
			file.on("open",function() { 
				file.pipe(res);
			});
			file.on("error",function(err) {
				console.log(err);
			});
		}
	});
}).listen(8124);
console.log('Server Running at 8124');
