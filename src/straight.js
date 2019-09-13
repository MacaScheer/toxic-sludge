const Shape = require("./shape");

class Straight {
  constructor(index) {
    this.orientationIndex = index;
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

  drawSludge(ctx, x, y, prevDir) {}

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
    console.log("straight", openPoints.includes(inPoint));
    return openPoints.includes(inPoint);
  }
  direction(inDir) {
    //unnecessary check—-only necessary to make inPoint and outDir opposites
    if (inDir === "down" && this.orientationIndex === 0) {
      this.outPoint = "bottom";
      this.outDir = "down";
    }
    if (inDir === "up" && this.orientationIndex === 0) {
      this.outPoint = "top";
      this.outDir = "up";
    }
    if (inDir === "right" && this.orientationIndex === 1) {
      this.outDir = "right";
      this.outPoint = "right";
    }
    if (this.inDir === "left" && this.orientationIndex === 1) {
      this.outDir = "left";
      this.outPoint = "left";
    }
  }
}

module.exports = Straight;
