const Elbow = require("./elbow");
const DblElbow = require("./dblElbow");
const Straight = require("./straight");
const Cross = require("./cross");

const Shape = function(type) {
  this.type = type;

};

Shape.prototype.drawBarrier = function(ctx, x, y) {
  ctx.rect(0, 0, 50, 50);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
};

Shape.prototype.drawElbow = function(ctx, x, y, start) {
  ctx.beginPath();
  ctx.arc(x, y, 25, start, 0.5 * Math.PI);
  // ctx.arc(x, y + 50, 25, 1.5 * Math.PI, 2 * Math.PI);
  // ctx.arc(x + 50, y + 50, 25, 1 * Math.PI, 1.5 * Math.PI);
  // ctx.arc(x + 50, y + 0, 25, 0.5 * Math.PI, 1 * Math.PI);

  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawDblElbow = function(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x + 0, y + 0, 20, 0, 0.5 * Math.PI);
  ctx.moveTo(x + 25, y + 50);
  ctx.arc(x + 50, y + 50, 20, 1.5 * Math.PI, 2 * Math.PI);
  ctx.stroke();
};

Shape.prototype.drawStraight = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x + 25, y + 0);
  ctx.lineTo(x + 25, y + 50);
  ctx.lineWidth = 15;
  ctx.stroke();
};
Shape.prototype.drawCross = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(x + 25, y + 0);
  ctx.lineTo(x + 25, y + 50);
  ctx.moveTo(x + 0, y + 25);
  ctx.lineTo(x + 50, y + 25);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawEntry = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.lineTo(45, 25);
  ctx.moveTo(45, 10);
  ctx.lineTo(45, 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawExit = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.lineTo(5, 25);
  ctx.moveTo(5, 10);
  ctx.lineTo(5, 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawShape = function(ctx, x, y, start) {
  switch (this.type) {
    case "dblElbow":
      this.drawDblElbow(ctx, x, y);
      break;
    case "cross":
      this.drawCross(ctx, x, y);
      break;
    case "elbow":
      this.drawElbow(ctx, x, y, start);
      break;
    case "barrier":
      this.drawBarrier(ctx, x, y);
      break;
    case "entryPipe":
      this.drawEntry(ctx, x, y);
      break;
    case "exitPipe":
      this.drawExit(ctx, x, y);
      break;
    case "straight":
      this.drawStraight(ctx, x, y);
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

// Shape.prototype.getRotation = function() {
//   return this.getRotationFromMatrix($(this.getCanvas()).css("transform"));
// };

// Shape.prototype.rotate = function() {
//   if (this.rotatable()) {
//     let currentRotation = this.getRotation();
//     $(this.getCanvas()).css("transform", `rotate(${currentRotation + 90}deg)`);
//   }
// };

// Shape.prototype.drawDblElbow = function() {};
module.exports = Shape;
