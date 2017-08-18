function Blob(x, y) {
	this.xPos = x;
	this.yPos = y;

	this.moveUpKeyHeld = false;
	this.moveLeftKeyHeld = false;
	this.moveDownKeyHeld = false;
	this.moveRightKeyHeld = false;

	this.show = function() {
		canvasContext.fillStyle = 'white'
		canvasContext.beginPath()
		canvasContext.arc(this.xPos, this.yPos, 10, 0,Math.PI*2, true);
		canvasContext.fill();

		console.log('Sending: ' + this.xPos + ', ' + this.yPos);
		var data = {
			x: this.xPos,
			y: this.yPos
		}

		socket.emit('update', data);
	}

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