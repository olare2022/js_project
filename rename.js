var fs = require('fs');

fs.rename('mynewfiles1.txt', 'myrenamedfile.txt', function (err){
	if (err) throw err;
	console.log('File Renamed!');
});