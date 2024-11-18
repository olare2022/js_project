const http = require('http');

async function startServer(){
	const uc = await import('upper-case');

	http.createServer(function (req, res){
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(uc.upperCase('Hello World!'));
		res.end();
	}).listen(8080);
}

startServer();