var http=require('http'),
	path = require('path'),
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes/node_support';
http.createServer(function(req,res) {
	 pathname = search_path + req.url;
	console.log(pathname);

}).listen(8124);
console.log('Server Running at 8124');
