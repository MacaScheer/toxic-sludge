const Shape = require("./shape");

class Straight {
  constructor() {
    this.orientationIndex = MAth.floor(Math.random() * 3);
    this.orientationArr = [
      {
        offset_x_1: 25,
        offset_y_1: 0,
        offset_x_2: 25,
        offset_y_2: 50,
        openPoints: ["up", "down"]
      },
      {
        offset_x_1: 0,
        offset_y_1: 25,
        offset_x_2: 50,
        offset_y_2: 25,
        openPoints: ["left", "right"]
      }
    ];
  }

  draw(x, y) {
    let orientation = this.orientationArr[this.orientationIndex];
    ctx.beginPath();
    ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);
    ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);
    ctx.lineWidth = 15;
    ctx.stroke();
  }
  validFlow(inDir) {
    let openPoints = this.orientationArr[this.orientationIndex].openPoints;
    return openPoints.includes(inDir);
  }

  onClick() {
    index = (index + 1) % this.orientationArr.length;
  }
}

module.exports = Straight;
