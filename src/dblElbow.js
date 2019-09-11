const Shape = require("./shape");

class dblElbow {
  constructor() {
    this.orientationIndex = Math.floor(Math.random() * 5);
    this.radius = 20;
    this.orientationArr = [
      {
        offset_x: 0,
        offset_y: 0,
        offset_x_2: 25,
        offset_y_2: 50,
        offset_x_3: 50,
        offset_y_3: 50,
        start_1: 0,
        end_1: 0.5 * Math.PI,
        start_2: Math.Pi,
        openPoints: ["left", "up"]
      }, //offset_x, offset_y, start, end
      {
        offset_x: 0,
        offset_y: 0,
        offset_x_2: 25,
        offset_y_2: 50,
        offset_x_3: 50,
        offset_y_3: 50,
        start_1: 0,
        end_1: 2 * Math.PI,
        start_2: 1 * Math.PI,
        end_2: 2 * Math.PI,
        openPoints: ["left", "down"]
      }
    ];
  }
  draw(x, y, index) {
    let orientation = this.orientationArr[this.orientationIndex];
    ctx.beginPath();
    ctx.arc(
      x + orientation.offset_x_1,
      y + orientation.offset_y_1,
      25,
      orientation.start_1,
      orientation.end_1
    );
    ctx.moveTo(x + offset_x_2, y + offset_y_2);
    ctx.arc(x + offset_x_3, y + offset_y_3, 25);
  }

  validFlow(inDir) {
    let openPoints = this.orientationArr[this.orientationIndex].openPoints;
    return openPoints.includes(inDir);
  }

  flowDirection(inDir) {}
  onClick() {
    index = (index + 1) % orientationArr.length;
  }
  //draw(x, y, orientationArr[orientationIndex])
}

module.exports = dblElbow;
