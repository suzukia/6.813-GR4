// TODO: Must make it server persistent
// Source: http://www.createjs.com/Demos/EaselJS/CurveTo
function SketchPad(canvasID) {
	var canvas, stage;
	var drawingCanvas;
	var oldPt;
	var oldMidPt;
	var title;
	var color;
	var stroke;
	var colors;
	var index;
	var users;
	var yOffset;

	this.init = function(userID) {
		canvas = document.getElementById(canvasID);
		console.log(canvas);
		index = 0;
		users = {userID: index};
		yOffset = 20; //px

		// Have yet to decide a color, but it should match our layout somehow
		colors = ["#828b20"];

		//check to see if we are running in a browser with touch support
		stage = new createjs.Stage(canvas);
		stage.autoClear = false;
		stage.enableDOMEvents(true);

		createjs.Touch.enable(stage);
		createjs.Ticker.setFPS(24);

		drawingCanvas = new createjs.Shape();

		stage.addEventListener("stagemousedown", handleMouseDown);
		stage.addEventListener("stagemouseup", handleMouseUp);

		title = new createjs.Text("SketchPad", "36px Arial", "#777777");
		title.x = canvas.width/2 - title.getMeasuredWidth()/2;
		title.y = canvas.height/2 - yOffset;
		stage.addChild(title);

		stage.addChild(drawingCanvas);
		stage.update();
	}

	function stop() {
	}

	function handleMouseDown(event) {
		if (stage.contains(title)) {
			stage.clear();
			stage.removeChild(title);
		}

		// TODO: Should be based upon the person using the sketchpad
		color = colors[index];
		stroke = 5;
		oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
		oldMidPt = oldPt.clone();
		stage.addEventListener("stagemousemove", handleMouseMove);
	}

	function handleMouseMove(event) {
		var midPt = new createjs.Point(oldPt.x + stage.mouseX >> 1, oldPt.y + stage.mouseY >> 1);

		drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

		oldPt.x = stage.mouseX;
		oldPt.y = stage.mouseY;

		oldMidPt.x = midPt.x;
		oldMidPt.y = midPt.y;

		stage.update();
	}

	function handleMouseUp(event) {
		stage.removeEventListener("stagemousemove", handleMouseMove);
	}

	return this;
}