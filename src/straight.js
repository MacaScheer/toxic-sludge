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

  drawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    let orientation = this.orientationArr[index];
    if (prevDir === "down" || prevDir === "right") {
      sludgeStep = sludgeStep;
    }
    if (prevDir === "up" || prevDir === "left") {
      sludgeStep = 50 - sludgeStep;
    }

    let nextSpace = {
      0: prevDir,
      1: index,
      3: "",
      4: ""
    };
    await this.sleepFunction(30);
    ctx.beginPath();
    if (prevDir === "down") {
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + orientation.offset_x_2, y + sludgeStep);
      nextSpace[3] = x + orientation.offset_x_2;
      nextSpace[4] = y + sludgeStep;
    } else if (prevDir === "up") {
      ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineTo(x + orientation.offset_x_1, y + sludgeStep);
      nextSpace[3] = x + orientation.offset_x_1;
      nextSpace[4] = y + sludgeStep;
    } else if (prevDir === "left") {
      ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineTo(x + sludgeStep, y + orientation.offset_y_1);
      nextSpace[3] = x + sludgeStep;
      nextSpace[4] = y + orientation.offset_y_1;
    } else if (prevDir === "right") {
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + sludgeStep, y + orientation.offset_y_2);
      nextSpace[3] = x + sludgeStep;
      nextSpace[4] = y + orientation.offset_y_2;
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#65FF00";
    ctx.stroke();
    ctx.strokeStyle = "#000000";
    if (sludgeStep < 50) {
      setTimeout(
        this.asyncDrawSludge,
        30,
        this.ctx,
        x,
        y,
        prevDir,
        sludgeStep + 0.25,
        index
      );
    } else {
      console.log("done filling!", nextSpace);
      return nextSpace;
    }
  }
sleepFunction = function(ms) {
  return new Promise(res => setTimeout(res, ms));
};
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
    // console.log("straight", openPoints.includes(inPoint));
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
