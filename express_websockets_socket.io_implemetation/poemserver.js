var  http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function() {
	app.use(express.static(__dirname + '/public'));
	app.use(app.router);
	});
app.get('/',function(req,res) {
	res.send('<h1>WelCome To DIG DESIGN POETRY<br>By Shyam,Sneha and Karthic Rao :D</h1>');

	});

server.listen(9000);

io.sockets.on('connection',function(socket) { 
	
	socket.on('addUser',function(username) { 
		socket.username = username ; 
	});
	socket.on('sendPoem',function(data) { 
		io.sockets.emit('Poem_Post',socket.username,data);
	});
});	
