var fs = require('fs');

fs.unlink('mynewfiles2.txt', function (err){
	if (err) throw err;
	console.log('File deleted!');
});