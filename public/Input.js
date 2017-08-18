const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
	document.addEventListener('keydown', keyPressed);
	document.addEventListener('keyup', keyReleased);
	console.log('wat')
} 

function keySet(keyEvent, setTo) {
	if(keyEvent.keyCode == KEY_W || keyEvent.keyCode == KEY_UP_ARROW) {
		blob.moveUpKeyHeld = setTo;
	}
	if(keyEvent.keyCode == KEY_A || keyEvent.keyCode == KEY_LEFT_ARROW) {
		blob.moveLeftKeyHeld = setTo;
	}
	if(keyEvent.keyCode == KEY_S || keyEvent.keyCode == KEY_DOWN_ARROW) {
		blob.moveDownKeyHeld = setTo;
	}
	if(keyEvent.keyCode == KEY_D || keyEvent.keyCode == KEY_RIGHT_ARROW) {
		blob.moveRightKeyHeld = setTo;
	}
}

function keyPressed(evt) {
	keySet(evt, true);

	// evt.preventDefault();
}

function keyReleased(evt) {
	keySet(evt, false);
}