const Elbow = require("./elbow");
const Board = require("./board");
// const DblElbow = require("./dblElbow");
const Straight = require("./straight");
const Cross = require("./cross");
class Shape {
  constructor(type, id, xRange, yRange, ctx) {
    this.xRange = xRange;
    this.yRange = yRange;
    this.type = type;
    this.orientationIndex = id;
    this.ctx = ctx;
    this.frozenShapes = {};
    this.drawEntry = this.drawEntry.bind(this);
    this.drawExit = this.drawExit.bind(this);
    this.drawSludgeEntry = this.drawSludgeEntry.bind(this);
    this.asyncDrawSludgeEntry = this.asyncDrawSludgeEntry.bind(this);
  }
}

Shape.prototype.drawSludgeEntry = async function(ctx, sludgeStep = 5) {
  await this.sleepFunction(10);
  sludgeStep += 0.25;
  ctx.beginPath();
  ctx.moveTo(5, 325);
  ctx.lineTo(sludgeStep, 325);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#32CD32";
  ctx.stroke();
  ctx.strokeStyle = "#000000";

  if (sludgeStep < 55) {
    return this.asyncDrawSludgeEntry(ctx, sludgeStep);
  } else {
    return "0,55,105,300,350";
  }
};

Shape.prototype.sleepFunction = function(ms) {
  return new Promise(res => setTimeout(res, ms));
};

Shape.prototype.asyncDrawSludgeEntry = function(ctx, sludgeStep) {
  return this.drawSludgeEntry(ctx, sludgeStep);
};

Shape.prototype.drawSludgeExit = async function(
  ctx,
  direction,
  sludgeStep = 5
) {
  await this.sleepFunction(10);
  sludgeStep += 0.3;
  ctx.beginPath();
  ctx.strokeStyle = "#32CD32";
  ctx.lineWidth = 10;
  switch (direction) {
    case 0:
      ctx.moveTo(1205, 325);
      ctx.lineTo(1230, 325);
      return;
    case 1:
      ctx.moveTo(1230, 300);
      ctx.lineTo(1230, 325);
      return;
    case 3:
      ctx.lineTo(1230, 350);
      ctx.moveTo(1230, 325);
      return;
  }
  ctx.stroke();

  ctx.strokeStyle = "#000000";

  if (sludgeStep < 55) {
    return this.asyncDrawSludgeExit(ctx, direction, sludgeStep);
  } else {
    return "YOU WIN";
  }
};

Shape.prototype.asyncDrawSludgeExit = function(ctx, direction, sludgeStep) {
  return this.drawSludgeExit(ctx, direction, sludgeStep);
};
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
  let twoPi = 2 * Math.PI;
  ctx.beginPath();
  // ctx.moveTo(x + 50, y + 25);
  // ctx.lineTo(x + 5, y + 25);
  // ctx.moveTo(x + 5, y + 10);
  // ctx.lineTo(x + 5, y + 40);
  ctx.arc(1230, 325, 23, 0, twoPi);
  ctx.fillStyle = "#FCC201";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1230, 325, 15, 0, twoPi);
  ctx.lineWidth = 0.75;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1230, 325, 14.5, 0, twoPi);
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1230, 325, 13, 0, twoPi);
  ctx.lineWidth = 1.25;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1230, 325, 12, 0, twoPi);
  ctx.lineWidth = 1.38;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1230, 325, 10, 0, twoPi);
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(1230, 325, 8.75, 0, twoPi);
  ctx.fillStyle = "#383838";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1230, 325, 8, 0, twoPi);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.strokeStyle = "#000000";
};

Shape.prototype.reDraw = function(selectId, range, ctx, type) {
  let coords = range.split(",").map(s => parseInt(s));
  switch (type) {
    case "elbow":
      if (!this.frozenShapes[[coords[0], coords[2]]]) {
        let elbow = new Elbow(selectId, ctx, false);
        elbow.draw(ctx, coords[0], coords[2]);
      }
      break;
    case "straight":
      if (!this.frozenShapes[[coords[0], coords[2]]]) {
        let straight = new Straight(selectId, ctx, false);
        straight.draw(ctx, coords[0], coords[2]);
      }
      break;
  }
};

Shape.prototype.drawShape = async function(ctx, x, y) {
  switch (this.type) {
    case "cross":
      let cross = new Cross(ctx);
      cross.draw(ctx, x, y);
      break;
    case "elbow":
      let elbowIndex = this.orientationIndex;
      let elbow = new Elbow(elbowIndex, ctx, false);
      elbow.draw(ctx, x, y);
      break;
    case "straight":
      let straightIndex = this.orientationIndex;
      let straight = new Straight(straightIndex, ctx, false);
      straight.draw(ctx, x, y);
      break;
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
      let straight = new Straight(index, this.ctx, false);
      return straight.validFlow(prevDir);
    case "elbow":
      let elbow = new Elbow(index, this.ctx, false);
      return elbow.validFlow(prevDir);
    case "cross":
      return true;
  }
};
Shape.prototype.drawSludge = async function(nextPipe, prevDir, ctx) {
  let index = nextPipe.orientationIndex;
  let x = nextPipe.xRange[0];
  let y = nextPipe.yRange[0];
  let returnVal;
  switch (nextPipe.type) {
    case "straight":
      let straight = new Straight(index, ctx, true);
      this.frozenShapes[[x, y]] = straight;
      returnVal = await straight.drawSludge(ctx, x, y, prevDir, 1, index);
      return returnVal;
    case "elbow":
      let elbow = new Elbow(index, ctx, true);
      this.frozenShapes[[x, y]] = elbow;

      returnVal = await elbow.drawSludge(
        ctx,
        x,
        y,
        prevDir,
        (0.5 * Math.PI) / 200,
        index
      );
      return returnVal;
    case "cross":
      let cross = new Cross(index, ctx);
      returnVal = await cross.drawSludge(ctx, x, y, prevDir, 1, index);
      return returnVal;
  }
};

module.exports = Shape;
