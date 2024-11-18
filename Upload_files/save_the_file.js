var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('Error parsing form: ' + err);
                res.end();
                return;
            }

            // Check if file path exists and log it for debugging
            if (!files.filetoupload || !files.filetoupload.filepath) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('File path is undefined');
                res.end();
                return;
            }

            var oldpath = files.filetoupload.filepath;
            var newpath = path.join('C:/Users/Developer/Desktop/jsproject/new', files.filetoupload.originalFilename);

            fs.rename(oldpath, newpath, function (err) {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.write('Error moving file: ' + err);
                    res.end();
                    return;
                }
                
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.end();
    }
}).listen(8080);
