function Blob(x, y) {
	// Position of the blob on the game canvas
	this.xPos = x;
	this.yPos = y;

	// Direction in which the player wants the blob to move
	this.moveUpKeyHeld = false;
	this.moveLeftKeyHeld = false;
	this.moveDownKeyHeld = false;
	this.moveRightKeyHeld = false;

	// Draws the blob onto the screen
	this.show = function() {
		// Draws the blob
		canvasContext.fillStyle = 'white';
		canvasContext.beginPath();
		canvasContext.arc(this.xPos, this.yPos, 10, 0,Math.PI*2, true);
		canvasContext.fill();

		// Sends the blob's data to the server
		var data = {
			x: this.xPos,
			y: this.yPos
		}
		socket.emit('update', data);
	}

	// Updates the blob's position according to the player's key input
	this.move = function() {
		if (this.moveUpKeyHeld && this.yPos > 0) {
			this.yPos -= 5;
		}
		if (this.moveLeftKeyHeld && this.xPos > 0) {
			this.xPos -= 5;
		}
		if (this.moveDownKeyHeld && this.yPos < GAME_HEIGHT) {
			this.yPos += 5;
		}
		if (this.moveRightKeyHeld && this.xPos < GAME_WIDTH) {
			this.xPos += 5;
		}
	}
}