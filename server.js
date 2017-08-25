// Blob object for storing data
var blobs = [];
function Blob(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y
}

// Sets up the requisite dependencies for running the web page
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));
app.get('*', function (request, response){
    response.sendFile(__dirname + '/public/Index.html');
});

console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server);

// Sends the data that was gathered from each of the individual clients to 
// every client and updates the game canvas using that data framesPerSecond
// times per second.
var framesPerSecond = 30;
setInterval(heartbeat, 1000/framesPerSecond);
function heartbeat() {
	io.sockets.emit('heartbeat', blobs);
}

// Executes whenever there's a new connection to the game
io.sockets.on('connection', 
	function(socket) {
		console.log('New Connection ' + socket.id);

		// Creates a new blob object that represents the new player that
		// has just connected. Pushes blob object onto an array in order
		// to keep track of the players and their positions
		socket.on('start', 
			function(data) {
				var blob = new Blob(socket.id, data.x, data.y);
				blobs.push(blob);	
			}
		);

		// Updates the position of the players using the data that's sent
		// to the server from the client 
		socket.on('update',
			function(data) {
				var blob;
				for (var i = 0; i < blobs.length; i++) {
					if (socket.id == blobs[i].id) {
						blob = blobs[i];
					}
				}
				blob.xPos = data.x;
				blob.yPos = data.y;
			}
		);
	}
);