/*
 * Represents the visual and interactive map for the player
 */



function GameMap(w, h, bgColor, bgImgPath, milestones) {

  console.log(w);

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
    Crafty.background(bgColor + " url(" + bgImgPath + ") no-repeat center center");

    var ctx = Crafty.canvas.context;

    // draw all milestone componenets and
    // add extra componenets to the screen
    milestones.forEach(function(milestone) {
      Crafty.c('Milestone', milestone.milestoneDrawing());
      Crafty.e('Milestone')
      .attr({
        x: 2 * tileSize.width,
        y: 2 * tileSize.height,
        w: milestone.w,
        h: milestone.h
      }).drawStone();
    });

 }

 return this;
}

function Milestone(x_coord, y_coord, width, height, incompleteColor, completeColor, ctx) {

  this._x = x_coord;
  this._y = y_coord;
  this._w = width;
  this._h = height;

  this.milestoneDrawing = function() {
  	var c = incompleteColor;

  	this.init = function() {
      this.requires("2D, DOM, Mouse");
      this.bind('Click', function(MouseEvent) {
  	});
      return this;
    }

    this._drawStone = function() {
      ctx.beginPath();
    	ctx.arc(this.x, this.y, Math.min(this.w, this.h)/2, 0, 2 * Math.PI);
    	ctx.fillStyle = c;
    	ctx.fill();
    	ctx.stroke();
      return this;
    }

    this._drawCompletedStone = function() {
    	c = completeColor;
    	this._drawStone();
    	return this;
    }

    return this;
  }

  return this;
}
$(document).ready(function() {


});
