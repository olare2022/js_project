var fs = require('fs');

fs.writeFile('mynewfiles3.txt', 'Hello there my friend!', function (err){
	if (err) throw err;
	console.log('Saved!');
});