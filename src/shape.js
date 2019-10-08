const Elbow = require("./elbow");
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

Shape.prototype.drawSludgeEntry = async function(ctx, sludgeStep = 0) {
  await this.sleepFunction(10);
  sludgeStep += 0.25;
  ctx.beginPath();
  ctx.moveTo(0, 275);
  ctx.lineTo(sludgeStep, 275);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#32CD32";
  ctx.stroke();
  ctx.strokeStyle = "#000000";

  if (sludgeStep < 50) {
    return this.asyncDrawSludgeEntry(ctx, sludgeStep);
  } else {
    return "0,50,100,250,300";
  }
};

Shape.prototype.sleepFunction = function(ms) {
  return new Promise(res => setTimeout(res, ms));
};

Shape.prototype.asyncDrawSludgeEntry = function(ctx, sludgeStep) {
  return this.drawSludgeEntry(ctx, sludgeStep);
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
