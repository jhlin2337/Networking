const GAME_WIDTH = 1600;
const GAME_HEIGHT = 1200;

var canvas;
var canvasContext;
var socket;

var playerData = Array();
var blob;

window.onload = function() {
	// Retrieves the game canvas that the code will work in
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	// Connects the web socket to the url address that the game is hosted on
	socket = io.connect('https://protected-shelf-57293.herokuapp.com');
	// socket = io.connect('http://localhost:5000');

	// Creates the blob and sends the blob data to the server
	blob = new Blob(canvas.width/2, canvas.height/2);
	var data = {
		x: this.xPos,
		y: this.yPos
	}
	socket.emit('start', data);

	// Retrieves data for each of the playerData from the server and updates the playerData' data
	// in the client
	socket.on('heartbeat',
		function(data) {
			playerData = data;
		}
	)

	// Sets up input so that players can use 'wasd' to move
	setupInput();

	// Updates everything on the game canvas framesPerSecond times per second
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
}

// Update the properties of all objects in the game
function updateAll() {
	drawAll();
	blob.move();
}

// Draw everything that should be in the game
function drawAll() {
	drawBackground();
	drawMarkers();
	panForTranslation();
	blob.show();

	for (var i = 0; i < playerData.length; i++) {
		if (playerData[i].id !== socket.id) {
			canvasContext.fillStyle = 'white';
			canvasContext.beginPath();
			canvasContext.arc(playerData[i].xPos, playerData[i].yPos, 10, 0,Math.PI*2, true);
			canvasContext.fill();
		}
	}
}

// Draw the background for the game
function drawBackground() {
	canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

// Draws a marker in the middle of the game
function drawMarkers() {
	canvasContext.fillStyle = 'red';
	canvasContext.fillRect(canvas.width, canvas.height, 16, 16);
}