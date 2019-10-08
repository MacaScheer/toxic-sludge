// const Shape = require("./shape");

class Elbow {
  constructor(index, ctx) {
    this.orientationIndex = index;
    this.radius = 25;
    this.ctx = ctx;
    this.drawSludge = this.drawSludge.bind(this);
    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);
    this.orientationArr = [
      {
        offset_x: 0,
        offset_y: 0,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["left", "top"],
        corner: "topLeft"
      },
      {
        offset_x: 50,
        offset_y: 0,
        start: 0.5 * Math.PI,
        end: 1 * Math.PI,
        openPoints: ["top", "right"],
        corner: "topRight"
      },
      {
        offset_x: 0,
        offset_y: 50,
        start: 1.5 * Math.PI,
        end: 2 * Math.PI,
        openPoints: ["left", "bottom"],
        corner: "bottomLeft"
      },
      {
        offset_x: 50,
        offset_y: 50,
        start: 1 * Math.PI,
        end: 1.5 * Math.PI,
        openPoints: ["right", "bottom"],
        corner: "bottomRight"
      }
    ];
    this.outDir = "";
    this.outPoint = "";
  }

  draw(ctx, x, y) {
      let orientation = this.orientationArr[this.orientationIndex];
      ctx.clearRect(x + 1, y + 1, 49, 49);
      ctx.beginPath();
      ctx.arc(
        x + orientation.offset_x,
        y + orientation.offset_y,
        this.radius,
        orientation.start,
        orientation.end
      );
      ctx.lineWidth = 15;
      ctx.stroke();
  }

  async drawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    let orientation = this.orientationArr[index];
    let newStart, newEnd;
    await this.sleepFunction(5);
    ctx.beginPath();
    const nextSpaceArr = new Array(5);
    // positive arc direction
    if (prevDir === "right" && orientation.corner === "bottomLeft") {
      newStart = 1.5 * Math.PI;
      newEnd = newStart + sludgeStep;
      nextSpaceArr[0] = 1;
      nextSpaceArr[1] = x + orientation.offset_x;
      nextSpaceArr[2] = x + orientation.offset_x + 50;
      nextSpaceArr[3] = y + orientation.offset_y;
      nextSpaceArr[4] = y + orientation.offset_y + 50;
    }
    if (prevDir === "down" && orientation.corner === "topLeft") {
      newStart = 0;
      newEnd = newStart + sludgeStep;
      nextSpaceArr[0] = 2;
      nextSpaceArr[1] = x + orientation.offset_x - 50;
      nextSpaceArr[2] = x + orientation.offset_x;
      nextSpaceArr[3] = y + orientation.offset_y;
      nextSpaceArr[4] = y + orientation.offset_y + 50;
    }
    if (prevDir === "up" && orientation.corner === "bottomRight") {
      newStart = 1 * Math.PI;
      newEnd = newStart + sludgeStep;
      nextSpaceArr[0] = 0;
      nextSpaceArr[1] = x + orientation.offset_x;
      nextSpaceArr[2] = x + orientation.offset_x + 50;
      nextSpaceArr[3] = y + orientation.offset_y - 50;
      nextSpaceArr[4] = y + orientation.offset_y;
    }
    if (prevDir === "left" && orientation.corner === "topRight") {
      newStart = 0.5 * Math.PI;
      newEnd = newStart + sludgeStep;
      nextSpaceArr[0] = 3;
      nextSpaceArr[1] = x + orientation.offset_x - 50;
      nextSpaceArr[2] = x + orientation.offset_x;
      nextSpaceArr[3] = y + orientation.offset_y - 50;
      nextSpaceArr[4] = y + orientation.offset_y;
    }
    // negative arc direction
    if (prevDir === "up" && orientation.corner === "bottomLeft") {
      newEnd = 0 * Math.PI;
      newStart = newEnd - sludgeStep;

      nextSpaceArr[0] = 2;
      nextSpaceArr[1] = x + orientation.offset_x - 50;
      nextSpaceArr[2] = x + orientation.offset_x;
      nextSpaceArr[3] = y + orientation.offset_y - 50;
      nextSpaceArr[4] = y + orientation.offset_y;
    }
    if (prevDir === "left" && orientation.corner === "bottomRight") {
      newEnd = 1.5 * Math.PI;
      newStart = newEnd - sludgeStep;
      nextSpaceArr[0] = 1;
      nextSpaceArr[1] = x + orientation.offset_x - 50;
      nextSpaceArr[2] = x + orientation.offset_x;
      nextSpaceArr[3] = y + orientation.offset_y;
      nextSpaceArr[4] = y + orientation.offset_y + 50;
    }
    if (prevDir === "right" && orientation.corner === "topLeft") {
      newEnd = 0.5 * Math.PI;
      newStart = newEnd - sludgeStep;
      nextSpaceArr[0] = 3;
      nextSpaceArr[1] = x + orientation.offset_x;
      nextSpaceArr[2] = x + orientation.offset_x + 50;
      nextSpaceArr[3] = y + orientation.offset_y - 50;
      nextSpaceArr[4] = y + orientation.offset_y;
    }
    if (prevDir === "down" && orientation.corner === "topRight") {
      newEnd = 1 * Math.PI;
      newStart = newEnd - sludgeStep;
      nextSpaceArr[0] = 0;
      nextSpaceArr[1] = x + orientation.offset_x;
      nextSpaceArr[2] = x + orientation.offset_x + 50;
      nextSpaceArr[3] = y + orientation.offset_y;
      nextSpaceArr[4] = y + orientation.offset_y + 50;
    }
    ctx.arc(
      x + orientation.offset_x,
      y + orientation.offset_y,
      this.radius,
      newStart,
      newEnd
    );

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#32CD32";
    ctx.stroke();
    ctx.strokeStyle = "#000000";

    if (sludgeStep < 0.5 * Math.PI) {
      return this.asyncDrawSludge(
        x,
        y,
        prevDir,
        sludgeStep + (0.5 * Math.PI) / 200,
        index
      );
    } else {
      return nextSpaceArr;
    }
  }
  //sludgeStep should be (.5 * Math.PI)/200
  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
  asyncDrawSludge(x, y, prevDir, sludgeStep, index) {
    return this.drawSludge(this.ctx, x, y, prevDir, sludgeStep, index);
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
}

module.exports = Elbow;
