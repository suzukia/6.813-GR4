function BasicGameMap(w, h, map, milestones) {

  var map_grid = {
    width:  w,
    height: h
  }

  this.width = function() {
    return map_grid.width;
  }
 
  this.height = function() {
    return map_grid.height;
  }
 
  // Initialize and start our game
  this.start = function(stage) {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(w, h, stage);
    Crafty.canvas.init();
    Crafty.background(bgColor);

    var ctx = Crafty.canvas.context;

    // draw all milestone componenets and
    // add extra componenets to the screen

    Crafty.e('Milestone')
    .attr({
      x: 2 * tileSize.width,
      y: 2 * tileSize.height,
      w: diameter,
      h: diameter
    }).drawStone();
 
 }

 return this;
}

function Milestone(incompleteColor, completeColor, ctx) {
	var c = incompleteColor;

	this.init = function() {
    this.requires("2D, DOM, Mouse");
    this.bind('Click', function(MouseEvent) {
		this.drawCompletedStone();
	});
    return this;
  }

  this.drawStone = function() {
    ctx.beginPath();
  	ctx.arc(this._x + this._w/2, this._y + this._h/2, Math.min(this._w, this.h)/2, 0, 2 * Math.PI);
  	ctx.fillStyle = c;
  	ctx.fill();
  	ctx.stroke();
    return this;
  }

  this.drawCompletedStone = function() {
  	c = completeColor;
  	this.drawStone();
  	return this;
  }

  return this;
}