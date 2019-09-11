const Shape = require("./shape");

class Elbow {
  constructor() {
    this.orientationIndex = Math.floor(Math.random() * 5);
    this.radius = 25;
    this.orientationArr = [
      {
        offset_x: 0,
        offset_y: 0,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["left", "up"],
        corner: "topLeft"
      }, //offset_x, offset_y, start, end
      {
        offset_x: 50,
        offset_y: 0,
        start: 0.5 * Math.PI,
        end: 1 * Math.PI,
        openPoints: ["up", "right"],
        corner: "topRight"
      },
      {
        offset_x: 0,
        offset_y: 50,
        start: 1.5 * Math.PI,
        end: 2 * Math.PI,
        openPoints: ["left", "down"],
        corner: "bottomLeft"
      },
      {
        offset_x: 50,
        offset_y: 50,
        start: 1 * Math.PI,
        end: 1.5 * Math.PI,
        openPoints: ["right", "down"],
        corner: "bottomRight"
      }
    ];
  }
  draw(x, y, index) {
    let orientation = this.orientationArr[this.orientationIndex];
    ctx.beginPath();
    ctx.arc(
      x + orientation.offset_x,
      y + orientation.offset_y,
      radius,
      orientation.start,
      orientation.end
    );
  }

  validFlow(inDir) {
    let openPoints = this.orientationArr[this.orientationIndex].openPoints;
    return openPoints.includes(inDir);
  }

  onClick() {
    index = (index + 1) % orientationArr.length;
  }
  //draw(x, y, orientationArr[orientationIndex])
}

module.exports = Elbow;
