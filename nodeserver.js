var net = require('net');
var server = net.createServer( function() {
	console.log('Connection Established');
	conn.on('data',function(data) {
		console.log(data + 'from' + conn.remoteAddress +  ' ' +  conn.remotePort );
		conn.write('Thank you , data successfully accepted');
	
	});
	conn.on('close' , function() ( 
		console.log('Client Closed the connection');
	});
}).listen(9225);
	console.log('Listening to port 9225');
