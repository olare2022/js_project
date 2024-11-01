var fs = require('fs');

//create a file named mynewfiles1.txt:
fs.open('mynewfiles2.txt', 'w', function (err, file){
	if (err) throw err;
	console.log('Saved!');
});