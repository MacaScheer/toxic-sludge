const Shape = require("./shape");

class Straight {
  constructor(index) {
    this.orientationIndex = index;
    this.drawSludge = this.drawSludge.bind(this);
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

  //account for direction and orientation
  drawSludge(ctx, x, y, prevDir, sludgeStep) {
    // direction(prevDir);
    let orientation = this.orientationArr[this.orientationIndex];
    console.log(prevDir);
    let newOffset;
    if (prevDir === "down" || prevDir === "right") {
      newOffset = sludgeStep;
    }
    if (prevDir === "up" || prevDir === "left") {
      newOffset = 50 - sludgeStep;
    }
    ctx.beginPath();
    if (prevDir === "down") {
      newOffset++;
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + orientation.offset_x_2, y + newOffset);
    } else if (prevDir === "up") {
      ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineTo(x + orientation.offset_x_1, y + newOffset);
    } else if (prevDir === "left") {
      ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
      ctx.lineTo(x + newOffset, y + orientation.offset_y_1);
    } else if (prevDir === "right") {
      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
      ctx.lineTo(x + newOffset, y + orientation.offset_y_2);
    }

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#65FF00";
    ctx.stroke();
    ctx.strokeStyle = "#000000";
    if (sludgeStep < 50) {
      setTimeout(this.drawSludge.bind(ctx, x, y, prevDir, sludgeStep + 1), 100);
    }
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
      this.outPoint = "bottom";
      this.outDir = "down";
      this.startX = 25;
      this.startY = 0;
    }
    if (inDir === "up" && this.orientationIndex === 0) {
      this.outPoint = "top";
      this.outDir = "up";
      this.startX = 25;
      this.startY = 50;
    }
    if (inDir === "right" && this.orientationIndex === 1) {
      this.outDir = "right";
      this.outPoint = "right";
      this.startX = 0;
      this.startY = 25;
    }
    if (this.inDir === "left" && this.orientationIndex === 1) {
      this.outDir = "left";
      this.outPoint = "left";
      this.startX = 50;
      this.startY = 25;
    }
  }
}

module.exports = Straight;
