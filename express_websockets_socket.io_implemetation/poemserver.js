var  http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs').createWriteStream('/dev/mychar0');
app.configure(function() {
	app.use(express.logger('dev'));	
	app.use(express.favicon(__dirname + 'icon.ico');
	app.use(express.static(__dirname + '/public'));
	app.set('view engine','jade');
	app.set('view options',{ layout:true });
	app.set('views',__dirname + '/views');
	
	
	});
app.get('/',function(req,res) {
	res.render('index');

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
