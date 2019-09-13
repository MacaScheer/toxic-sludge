// const Shape = require("./shape");

class Elbow {
  constructor(index) {
    this.orientationIndex = index;
    this.radius = 25;
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
  drawSludge(ctx, x, y, prevDir) {
    
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
    console.log(openPoints.includes(inPoint));
    return openPoints.includes(inPoint);
  }
  //having an outDir and outPoint in this case is pointless, but not so with the straight and cross
  direction(inDir) {
    let corner = this.orientationArr[this.orientationIndex].corner;
    if (corner === "topRight" && inDir === "down") {
      this.outPoint = "right";
      this.outDir = "right";
    }
    if (corner === "topRight" && inDir === "left") {
      this.outDir = "up";
      this.outPoint = "top";
    }
    if (corner === "topLeft" && inDir === "down") {
      this.outDir = "left";
      this.outPoint = "left";
    }
    if (corner === "topLeft" && inDir === "right") {
      this.outDir = "up";
      this.outPoint = "top";
    }
    if (corner === "bottomLeft" && inDir === "right") {
      this.outDir = "down";
      this.outPont = "bottom";
    }
    if (corner === "bottomLeft" && inDir === "up") {
      this.outDir = "left";
      this.outPoint = "left";
    }
    if (corner === "bottomRight" && inDir === "left") {
      this.outDir = "down";
      this.outPoint = "bottom";
    }
    if (corner === "bottomRight" && inDir === "up") {
      this.outDir = "right";
      this.outPoint = "right";
    }
  }
}

module.exports = Elbow;
