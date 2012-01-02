/**
 * Simple server example
 * 
 * All pages get the old hello world, stuff is logged for your convenience
 */

// Require the http library
var http	= require('http');
var fs		= require('fs');

// Create the server
var server = http.createServer(function (request, response) {
	// Log the request
	console.log(new Date() + ' [' + request.method + '] ' + request.url);
	// Serve static files
	if (request.method === "GET"){
		// Manually translate "/" into "/index.html"
		var url = '.' + (request.url == '/' ? '/index.html' : request.url);
		// Read the file and return it
		fs.readFile(url, function(error, content) {
			if (error) {
				// Oh dear.
				console.log('error loading file ' + url + ': ', error);
				// Lets just say missing for now
				response.writeHead(404);
				response.end();
			} else {
				// Lookup the mimetype of the file
				var tmp		= url.lastIndexOf(".");
				var ext		= url.substring((tmp + 1));
				var mime	= mimes[ext] || 'text/plain';
				// Write the file
				response.writeHead(200, { 'Content-Type': mime });
				response.end(content, 'utf-8');
			}
		});
	}
});
// It listens on port 1337 and IP 127.0.0.1
server.listen(1337, "127.0.0.1");
// For the joy
console.log('Server running at http://127.0.0.1:1337/');

/********************* MIME TABLE *********************/

var mimes = {
	'css':	'text/css',
	'js':	'text/javascript',
	'htm':	'text/html',
	'html':	'text/html',
};


