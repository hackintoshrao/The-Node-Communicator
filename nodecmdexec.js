var spawn = require('child_process').spawn,
find = spawn('find',['.','-ls']),
grep = spawn('grep',['test']);
grep.stdout.setEncoding('utf8');
// direct results of find to grep
find.stdout.on('data', function(data) {
grep.stdin.write(data);
});
// now run grep and output results
grep.stdout.on('data', function (data) {
console.log(data);
});

