const GAME_WIDTH = 1600;
const GAME_HEIGHT = 1200;

var canvas;
var canvasContext;
var socket;

var blobs = Array();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	socket = io.connect('https://protected-shelf-57293.herokuapp.com/');
	socket.on('blob', newDrawing)

	// blob = new Blob(Math.floor(Math.random() * GAME_WIDTH), Math.floor(Math.random() * GAME_HEIGHT));
	blob = new Blob(canvas.width/2, canvas.height/2);

	console.log('Sending: ' + this.xPos + ', ' + this.yPos);
	var data = {
		x: this.xPos,
		y: this.yPos
	}
	socket.emit('start', data);

	socket.on('heartbeat',
		function(data) {
			// console.log(data);
			blobs = data;
		}
	)

	setupInput()

	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
}

function newDrawing(data) {
	console.log('wat')
	blob2 = new blob(data.x, data.y);
	blob2.show();
}

function updateAll() {
	drawAll();
	blob.move();
}

function drawAll() {
	drawBackground();
	panForTranslation();
	blob.show();
	for (var i = 0; i < blobs.length; i++) {
		if (blobs[i].id !== socket.id) {
			canvasContext.fillStyle = 'white'
			canvasContext.beginPath()
			canvasContext.arc(blobs[i].xPos, blobs[i].yPos, 10, 0,Math.PI*2, true);
			canvasContext.fill();
		}
	}
}

function drawBackground() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}