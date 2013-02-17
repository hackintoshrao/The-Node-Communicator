var http=require('http'),
	url = require('url'),
	mime = require('mime'),
	fs = require('fs'),
	search_path='/home/karthic/mydata/codes/node_support';
http.createServer(function(req,res) {
	 pathname = search_path + req.url;
	 console.log(pathname);

	fs.stat(pathname , function(err,stats){
	  if(err) { 
		res.writeHead(404);
		res.write('Bad Request , Request cannot be accepted');
		res.end()
		}
	else if(stats.isFile()) {
