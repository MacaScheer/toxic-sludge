const Elbow = require("./elbow");
const DblElbow = require("./dblElbow");
const Straight = require("./straight");
const Cross = require("./cross");

class Shape {
  constructor(type, id, xRange, yRange) {
    this.xRange = xRange;
    this.yRange = yRange;
    this.type = type;
    this.orientationIndex = id;
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

Shape.prototype.drawEntry = function(ctx, x, y) {
  ctx.clearRect(x + 1, y + 1, 49, 49);
  ctx.beginPath();
  ctx.moveTo(x + 0, y + 25);
  ctx.lineTo(x + 45, y + 25);
  ctx.moveTo(x + 45, y + 10);
  ctx.lineTo(x + 45, y + 40);
  ctx.lineWidth = 15;
  ctx.strokeStyle = "#FCC201";
  ctx.stroke();
  ctx.strokeStyle = "#000000";
};

Shape.prototype.drawExit = function(ctx, x, y) {
  ctx.clearRect(x + 1, y + 1, 49, 49);
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 25);
  ctx.lineTo(x + 5, y + 25);
  ctx.moveTo(x + 5, y + 10);
  ctx.lineTo(x + 5, y + 40);
  ctx.lineWidth = 15;
  ctx.strokeStyle = "#FCC201";
  ctx.stroke();
  ctx.strokeStyle = "#000000";
};

Shape.prototype.reDraw = function(selectId, range, ctx, type) {
  let coords = range.split(",").map(s => parseInt(s));
  switch (type) {
    case "elbow":
      let elbow = new Elbow(selectId);
      elbow.draw(ctx, coords[0], coords[2]);
      break;
    case "straight":
      let straight = new Straight(selectId);
      straight.draw(ctx, coords[0], coords[2]);
      break;
  }
};

Shape.prototype.drawShape = function(ctx, x, y) {
  switch (this.type) {
    case "cross":
      let cross = new Cross();
      cross.draw(ctx, x, y);
      break;
    case "elbow":
      let elbowIndex = this.orientationIndex;
      let elbow = new Elbow(elbowIndex);
      elbow.draw(ctx, x, y);
      break;
    case "straight":
      let straightIndex = this.orientationIndex;
      let straight = new Straight(straightIndex);
      straight.draw(ctx, x, y);
      break;
    // case "dblElbow":
    //   this.drawDblElbow(ctx, x, y);
    //   break;
    // case "barrier":
    //this could be a wildcard space
    //that fills with sludge and routes to all contiguous openings
    //   this.drawBarrier(ctx, x, y);
    //   break;
    case "entry":
      this.drawEntry(ctx, x, y);
      break;
    case "exit":
      this.drawExit(ctx, x, y);
  }
};

Shape.prototype.validPipeFlow = function(nextPipe, prevDir) {
  let type = nextPipe.type;
  let index = nextPipe.orientationIndex;
  switch (type) {
    case "straight":
      let straight = new Straight(index);
      return straight.validFlow(prevDir);
    case "elbow":
      let elbow = new Elbow(index);
      return elbow.validFlow(prevDir);
  }
};
Shape.prototype.drawSludge = function(nextPipe, prevDir, ctx) {
  let index = nextPipe.orientationIndex;
  let x = nextPipe.xRange[0];
  let y = nextPipe.yRange[0];
  switch (nextPipe.type) {
    case "straight":
      let straight = new Straight(index);
      straight.drawSludge(ctx, x, y, prevDir);
      break;
    case "elbow":
      let elbow = new Elbow(index);
      elbow.drawSludge(ctx, x, y, prevDir);
      break;
    case "cross":
      let cross = new Cross();
      cross.drawSludge(ctx, x, y, prevDir);
      break;
  }
};

module.exports = Shape;
