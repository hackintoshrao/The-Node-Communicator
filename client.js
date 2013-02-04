var net = require('net');

var client = new net.Socket();
client.setEncoding('utf8');

// connect to server 
client.connect('8124','localhost',function(){
   console.log('connected to the server');
   client.write('connecting through socket , no need for browser');
});

//prepare for input from terminal
process.stdin.resume();

//when recieve data , send to the server 
process.stdin.on('data',function (data) {
    client.write(data);
});

//when recieve data back , print to the console 
client.on('data',function(data) { 
    console.log(data);
});

//when server closed 
client.on('close',function() {
    console.log('connection is closed');
});
