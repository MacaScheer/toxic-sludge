// const Shape = require("./shape");

class Elbow {
  constructor() {
    this.orientationIndex = Math.floor(Math.random() * 4);
    this.radius = 25;
    this.orientationArr = [
      {
        offset_x: 0,
        offset_y: 0,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["left", "top"],
        corner: "topLeft"
      }, //offset_x, offset_y, start, end
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
  onClick() {
    this.orientationIndexndex =
      (this.orientationIndex + 1) % orientationArr.length;
  }
  draw(ctx, x, y) {
    let orientation = this.orientationArr[this.orientationIndex];
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

  reDraw() {
    
  }

  
  validFlow(inPoint) {
    let openPoints = this.orientationArr[this.orientationIndex].openPoints;
    return openPoints.includes(inPoint);
  }
  //having an outDir and outPoint in this case is pointless, but not so with the straight and cross
  direction(inPoint) {
    let corner = this.orientationArr[this.orientationIndex].corner;
    if (corner === "topRight" && inPoint === "top") {
      this.outPoint = "right";
      this.outDir = "right";
    }
    if (corner === "topRight" && inPoint === "right") {
      this.outDir = "up";
      this.outPoint = "top";
    }
    if (corner === "topLeft" && inPoint === "top") {
      this.outDir = "left";
      this.outPoint = "left";
    }
    if (corner === "topLeft" && inPoint === "left") {
      this.outDir = "up";
      this.outPoint = "top";
    }
    if (corner === "bottomLeft" && inPoint === "left") {
      this.outDir = "down";
      this.outPont = "bottom";
    }
    if (corner === "bottomLeft" && inPoint === "bottom") {
      this.outDir = "left";
      this.outPoint = "left";
    }
    if (corner === "bottomRight" && inPoint === "right") {
      this.outDir = "down";
      this.outPoint = "bottom";
    }
    if (corner === "bottomRight" && inPoint === "bottom") {
      this.outDir = "right";
      this.outPoint = "right";
    }
  }
}

module.exports = Elbow;
