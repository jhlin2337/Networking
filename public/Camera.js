var camPanX = 0.0;
var camPanY = 0.0;

function panForTranslation() {
	if (blob.moveUpKeyHeld == true && blob.yPos >= canvas.height/2 && blob.yPos <= GAME_HEIGHT - canvas.height/2) {
		camPanY = 5;
	}
	if (blob.moveLeftKeyHeld == true && blob.xPos >= canvas.width/2 && blob.xPos <= GAME_WIDTH - canvas.width/2) {
		camPanX = 5;
	}
	if (blob.moveDownKeyHeld == true && blob.yPos <= GAME_HEIGHT - canvas.height/2 && blob.yPos >= canvas.height/2) {
		camPanY = -5;
	}
	if (blob.moveRightKeyHeld == true && blob.xPos <= GAME_WIDTH - canvas.width/2 && blob.xPos >= canvas.width/2) {
		camPanX = -5;
	}

	moveCamera()
}

function moveCamera() {
	canvasContext.translate(camPanX, camPanY)
	camPanX = 0;
	camPanY = 0;
}