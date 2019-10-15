const Shape = require("./shape");

class Cross {
  constructor(id, ctx) {
    this.ctx = ctx;
    this.orientationIndex = id;

    this.drawSludge = this.drawSludge.bind(this);
    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);
  }

  draw(ctx, x, y) {
    ctx.clearRect(x + 1, y + 1, 49, 49);
    ctx.beginPath();
    ctx.moveTo(x + 25, y + 0);
    ctx.lineTo(x + 25, y + 50);
    ctx.moveTo(x + 0, y + 25);
    ctx.lineTo(x + 50, y + 25);
    ctx.lineWidth = 15;
    ctx.stroke();
  }
  direction(inDir) {
    return inDir;
  }
  async drawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    let newOffset;
    let offset_x_1, offset_y_1, offset_x_2, offset_y_2;
    const nextSpaceArr = new Array(5);
    if (prevDir === "down" || prevDir === "right") {
      newOffset = sludgeStep;
    }
    if (prevDir === "up" || prevDir === "left") {
      newOffset = 50 - sludgeStep;
    }
    if (prevDir === "left") {
      offset_x_1 = 50;
      offset_x_2 = newOffset;
      nextSpaceArr[0] = 2;
      nextSpaceArr[1] = x - 50;
      nextSpaceArr[2] = x;
      nextSpaceArr[3] = y;
      nextSpaceArr[4] = y + 50;
    }
    if (prevDir === "right") {
      offset_x_1 = 0;
      offset_x_2 = newOffset;
      nextSpaceArr[0] = 0;
      nextSpaceArr[1] = x + 50;
      nextSpaceArr[2] = x + 100;
      nextSpaceArr[3] = y;
      nextSpaceArr[4] = y + 50;
    }
    if (prevDir === "up") {
      offset_y_1 = 50;
      offset_y_2 = newOffset;
      nextSpaceArr[0] = 3;
      nextSpaceArr[1] = x;
      nextSpaceArr[2] = x + 50;
      nextSpaceArr[3] = y - 50;
      nextSpaceArr[4] = y;
    }
    if (prevDir === "down") {
      offset_y_1 = 0;
      offset_y_2 = newOffset;
      nextSpaceArr[0] = 1;
      nextSpaceArr[1] = x;
      nextSpaceArr[2] = x + 50;
      nextSpaceArr[3] = y + 50;
      nextSpaceArr[4] = y + 100;
    }
    await this.sleepFunction(10);

    ctx.beginPath();
    if (prevDir === "up" || prevDir === "down") {
      offset_x_1 = 25;
      offset_x_2 = 25;
    }
    if (prevDir === "left" || prevDir === "right") {
      offset_y_1 = 25;
      offset_y_2 = 25;
    }
    ctx.moveTo(x + offset_x_1, y + offset_y_1);
    ctx.lineTo(x + offset_x_2, y + offset_y_2);

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#32CD32";
    ctx.stroke();
    ctx.strokeStyle = "#000000";

    if (sludgeStep < 50) {
      return this.asyncDrawSludge(x, y, prevDir, sludgeStep + 0.25, index);
    } else {
      return nextSpaceArr;
    }
  }
  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  asyncDrawSludge(x, y, prevDir, sludgeStep, index) {
    return this.drawSludge(this.ctx, x, y, prevDir, sludgeStep, index);
  }
}

module.exports = Cross;
