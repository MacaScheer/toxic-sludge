const Shape = require("./shape");

class Straight {
  constructor(index, ctx) {
    this.orientationIndex = index;
    this.ctx = ctx;
    this.drawSludge = this.drawSludge.bind(this);
    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);
    this.orientationArr = [
      {
        offset_x_1: 25,
        offset_y_1: 0,
        offset_x_2: 25,
        offset_y_2: 50,
        openPoints: ["top", "bottom"],
        corner: "upDown"
      },
      {
        offset_x_1: 0,
        offset_y_1: 25,
        offset_x_2: 50,
        offset_y_2: 25,
        openPoints: ["left", "right"],
        corner: "leftRight"
      }
    ];
    this.corner = this.orientationArr[this.orientationIndex].corner;
    this.outPoint = "";
    this.outDir = "";
    this.startX = null;
    this.startY = null;
  }

  draw(ctx, x, y) {
      let orientation = this.orientationArr[this.orientationIndex];
      ctx.clearRect(x + 1, y + 1, 49, 49);
      ctx.beginPath();
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineWidth = 15;
      ctx.stroke();
  }

  async drawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    let orientation = this.orientationArr[index];
    let nextSpaceArr = new Array(5);
    if (prevDir === "right") {
      nextSpaceArr[0] = 0;
      nextSpaceArr[1] = x + 50;
      nextSpaceArr[2] = x + 100;
      nextSpaceArr[3] = y;
      nextSpaceArr[4] = y + 50;
    }
    if (prevDir === "left") {
      nextSpaceArr[0] = 2;
      nextSpaceArr[1] = x - 50;
      nextSpaceArr[2] = x;
      nextSpaceArr[3] = y;
      nextSpaceArr[4] = y + 50;
    }
    if (prevDir === "down") {
      nextSpaceArr[0] = 1;
      nextSpaceArr[1] = x;
      nextSpaceArr[2] = x + 50;
      nextSpaceArr[3] = y + 50;
      nextSpaceArr[4] = y + 100;
    }
    if (prevDir === "up") {
      nextSpaceArr[0] = 3;
      nextSpaceArr[1] = x;
      nextSpaceArr[2] = x + 50;
      nextSpaceArr[3] = y - 50;
      nextSpaceArr[4] = y;
    }
    let newOffset;
    if (prevDir === "down" || prevDir === "right") {
      newOffset = sludgeStep;
    }
    if (prevDir === "up" || prevDir === "left") {
      newOffset = 50 - sludgeStep;
    }

    await this.sleepFunction(5);
    ctx.beginPath();
    if (prevDir === "down") {
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + orientation.offset_x_2, y + newOffset);
      nextSpaceArr[0] = 1;
    } else if (prevDir === "up") {
      ctx.moveTo(x + orientation.offset_x_1, y + newOffset);
      ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      nextSpaceArr[0] = 3;
    } else if (prevDir === "left") {
      ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineTo(x + newOffset, y + orientation.offset_y_1);
      nextSpaceArr[0] = 2;
    } else if (prevDir === "right") {
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + newOffset, y + orientation.offset_y_2);
      nextSpaceArr[0] = 0;
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#32CD32";
    ctx.stroke();
    ctx.strokeStyle = "#000000";
    if (sludgeStep < 50) {
      return this.asyncDrawSludge(
        this.ctx,
        x,
        y,
        prevDir,
        sludgeStep + 0.25,
        index
      );
    } else {
      return nextSpaceArr;
    }
  }
  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
  asyncDrawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    return this.drawSludge(ctx, x, y, prevDir, sludgeStep, index);
  }

  validFlow(inDir) {
    let inPoint;
    switch (inDir) {
      case "up":
        inPoint = "bottom";
        break;
      case "down":
        inPoint = "top";
        break;
      case "right":
        inPoint = "left";
        break;
      case "left":
        inPoint = "right";
        break;
    }
    let openPoints = this.orientationArr[this.orientationIndex].openPoints;
    return openPoints.includes(inPoint);
  }
  direction(inDir) {
    if (inDir === "down" && this.orientationIndex === 0) {
      this.outDir = "down";
    }
    if (inDir === "up" && this.orientationIndex === 0) {
      this.outDir = "up";
    }
    if (inDir === "right" && this.orientationIndex === 1) {
      this.outDir = "right";
    }
    if (this.inDir === "left" && this.orientationIndex === 1) {
      this.outDir = "left";
    }
  }
}

module.exports = Straight;
