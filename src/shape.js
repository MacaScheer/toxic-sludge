const Elbow = require("./elbow");
const DblElbow = require("./dblElbow");
const Straight = require("./straight");
const Cross = require("./cross");

class Shape {
  constructor(type, xRange, yRange) {
    this.xRange = xRange;
    this.yRange = yRange;
    this.dimensions = [this.x, this.y, this.x + 50, this.y + 50];
    this.type = type;
    this.canvas = document.getElementById("gameboard");
    this.ctx = this.canvas.getContext("2d");
    // this.ctx.canvas.width = 50;
    // this.ctx.canvas.height = 50;
    this.canvas.addEventListener("click", function(params) {
      let clickSpot = [event.pageX, event.pageY];
      console.log(clickSpot);
    });
  }
}

// Shape.prototype.drawBarrier = function(ctx, x, y) {
//   ctx.rect(0, 0, 50, 50);
//   ctx.fillStyle = "black";
//   ctx.fill();
//   ctx.stroke();
// };

// Shape.prototype.drawDblElbow = function(ctx, x, y) {
//   ctx.beginPath();
//   ctx.arc(x + 0, y + 0, 20, 0, 0.5 * Math.PI);
//   ctx.moveTo(x + 25, y + 50);
//   ctx.arc(x + 50, y + 50, 20, 1.5 * Math.PI, 2 * Math.PI);
//   ctx.stroke();
// };

// Shape.prototype.drawStraight = function(ctx, x, y) {
//   ctx.beginPath();
//   ctx.moveTo(x + 25, y + 0);
//   ctx.lineTo(x + 25, y + 50);
//   ctx.lineWidth = 15;
//   ctx.stroke();
// };
// Shape.prototype.drawCross = function(ctx, x, y) {
//   ctx.beginPath();
//   ctx.moveTo(x + 25, y + 0);
//   ctx.lineTo(x + 25, y + 50);
//   ctx.moveTo(x + 0, y + 25);
//   ctx.lineTo(x + 50, y + 25);
//   ctx.lineWidth = 15;
//   ctx.stroke();
// };

Shape.prototype.drawEntry = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x + 0, y + 25);
  ctx.lineTo(x + 45, y + 25);
  ctx.moveTo(x + 45, y + 10);
  ctx.lineTo(x + 45, y + 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawExit = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 25);
  ctx.lineTo(x + 5, y + 25);
  ctx.moveTo(x + 5, y + 10);
  ctx.lineTo(x + 5, y + 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawShape = function(ctx, x, y) {
  switch (this.type) {
    case "dblElbow":
      this.drawDblElbow(ctx, x, y);
      break;
    case "cross":
      let cross = new Cross();
      cross.draw(ctx, x, y);
      break;
    case "elbow":
      let elbow = new Elbow();
      elbow.draw(ctx, x, y);
      break;
    // case "barrier":
    //   this.drawBarrier(ctx, x, y);
    //   break;
    case "entry":
      this.drawEntry(ctx, x, y);
      break;
    case "exit":
      this.drawExit(ctx, x, y);
      break;
    case "straight":
      let straight = new Straight();
      straight.draw(ctx, x, y);
  }
};

Shape.prototype.rotatable = function() {
  return (
    this.shape != "entry" &&
    this.shape != "exit" &&
    this.shape != "cross" &&
    this.shape != "barrier" &&
    !this.locked
  );
};

module.exports = Shape;
