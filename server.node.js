/**
 * Another node chat
 */

// Required libraries
var http	= require('http');
var fs		= require('fs');
var io		= require('socket.io');

/***************** Simple file server *****************/

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

// Listen on port 1337 and IP 127.0.0.1
server.listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');

/***************** Simple Chat Server *****************/

// Start listening to our server (note that we override io with the return of the listen method)
io = io.listen(server);
console.log('This is from the recipes of https://github.com/LearnBoost/socket.io < keep reading it!');
// Add some events...
io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
});

/********************* MIME TABLE *********************/

var mimes = {
	'css':	'text/css',
	'js':	'text/javascript',
	'htm':	'text/html',
	'html':	'text/html',
	'ico':	'image/vnd.microsoft.icon'
};