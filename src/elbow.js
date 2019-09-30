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
  drawSludge(ctx, x, y, prevDir, sludgeStep, index) {
    let orientation = this.orientationArr[index];
    let newStart, newEnd;
    ctx.beginPath();
    // positive arc direction
    if (prevDir === "right" && orientation.corner === "bottomLeft") {
      newStart = 1.5 * Math.PI;
      newEnd = newStart + sludgeStep;
    }
    if (prevDir === "down" && orientation.corner === "topLeft") {
      newStart = 0;
      newEnd = sludgeStep;
    }
    if (prevDir === "up" && orientation.corner === "bottomRight") {
      newStart = 1 * Math.PI;
      newEnd = newStart + sludgeStep;
    }
    if (prevDir === "left" && orientation.corner === "topRight") {
      newStart = 0.5 * Math.PI;
      newEnd = newStart + sludgeStep;
    }
    // negative arc direction
    if (prevDir === "up" && orientation.corner === "bottomLeft") {
      newStart = 0 * Math.PI;
      newEnd = newStart - sludgeStep;
    }
    if (prevDir === "left" && orientation.corner === "bottomRight") {
      newStart = 1.5 * Math.PI;
      newEnd = newStart - sludgeStep;
    }
    if (prevDir === "right" && orientation.corner === "topLeft") {
      newStart = 0.5 * Math.PI;
      newEnd = newStart - sludgeStep;
    }
    if (prevDir === "down" && orientation.corner === "topRight") {
      newStart = 1 * Math.PI;
      newEnd = newStart - sludgeStep;
    }
    ctx.arc(
      x + orientation.offset_x,
      y + orientation.offset_y,
      this.radius,
      newStart,
      newEnd
    );

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#65FF00";
    ctx.stroke();
    ctx.strokeStyle = "#000000";
    let nextSpace = {
      0: prevDir,
      1: index,
      3: x + orientation.offset_x_2,
      4: y + orientation.offset_y_2
    };

    if (sludgeStep < 0.5 * Math.PI) {
      setTimeout(
        this.asyncDrawSludge,
        30,
        x,
        y,
        prevDir,
        sludgeStep + (0.5 * Math.PI) / 200,
        index
      );
    } else {
      console.log("Done filling!", nextSpace);
      return nextSpace;
    }
  }
  //sludgeStep should be (.5 * Math.PI)/200

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
    console.log(openPoints.includes(inPoint));
    return openPoints.includes(inPoint);
  }
  //having an outDir and outPoint in this case is pointless, but not so with the straight and cross
  direction(inDir) {
    let corner = this.orientationArr[this.orientationIndex].corner;
    if (
      (corner === "topLeft" && inDir === "down") ||
      (corner === "bottomLeft" && inDir === "up")
    ) {
      this.outDir = "left";
    }
    if (
      (corner === "topRight" && inDir === "left") ||
      (corner === "topLeft" && inDir === "right")
    ) {
      this.outDir = "up";
    }

    if (
      (corner === "topRight" && inDir === "down") ||
      (corner === "bottomRight" && inDir === "up")
    ) {
      this.outDir = "right";
    }

    if (
      (corner === "bottomLeft" && inDir === "right") ||
      (corner === "bottomRight" && inDir === "left")
    ) {
      this.outDir = "down";
    }
  }
}

module.exports = Elbow;
