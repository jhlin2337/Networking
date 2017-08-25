var blobs = [];

function Blob(id, x, y) {
	this.id = id;
	this.x = x;
	this.y = y
}

var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 5000)
app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');
var io = socket(server);

var framesPerSecond = 30;
setInterval(heartbeat, 1000/framesPerSecond);
function heartbeat() {
	io.sockets.emit('heartbeat', blobs);
}

io.sockets.on('connection', newConnection);
function newConnection(socket) {
	console.log('New Connection ' + socket.id);

	socket.on('start', 
		function(data) {
			//socket.broadcast.emit('blob', data)
			console.log(socket.id + " " + data.x + " " + data.y);

			var blob = new Blob(socket.id, 400, 300);
			blobs.push(blob);	
		}
	);

	socket.on('update',
		function(data) {
			// console.log(socket.id + " " + data.x + " " + data.y);

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