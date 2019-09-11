const Shape = function(type) {
  this.id = (Math.random() * 10000) % 10000;
  //   this.increment = increment;
  this.type = type;
  // if (type ===) { }
  //   this.makeCanvas();
};

class Elbow {
  constructor() {
    this.orientationIndex = Math.random() * 5;
    this.radius = 25;
    this.orientationArr = [
      {
        offset_x: 25,
        offset_y: -25,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["left", "up"]
      }, //offset_x, offset_y, start, end
      {
        offset_x: 25,
        offset_y: -25,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["up", "right"]
      }, //offset_x, offset_y, start, end
      {
        offset_x: 25,
        offset_y: -25,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["right", "down"]
      }, //offset_x, offset_y, start, end
      {
        offset_x: 25,
        offset_y: -25,
        start: 0 * Math.PI,
        end: 0.5 * Math.PI,
        openPoints: ["down", "right"]
      } //offset_x, offset_y, start, end
    ];
  }
  draw(x, y, index) {
    const orientation = this.orientationArr[this.orientationIndex];
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

Shape.prototype.drawBarrier = function(ctx, x, y) {
  ctx.rect(0, 0, 50, 50);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.stroke();
};

Shape.prototype.drawElbow = function(ctx, x, y, start) {
  // debugger
  ctx.beginPath();
  ctx.arc(x, y, 20, start, 0.5 * Math.PI);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawDblElbow = function(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, 1 * Math.PI);
  ctx.moveTo(25, 50);
  ctx.arc(50, 50, 25, Math.PI, 2 * Math.PI);
  ctx.stroke();
};

Shape.prototype.drawStraight = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.lineTo(25, 50);
  ctx.lineWidth = 15;
  ctx.stroke();
};
Shape.prototype.drawCross = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(25, 0);
  ctx.lineTo(25, 50);
  ctx.moveTo(0, 25);
  ctx.lineTo(50, 25);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawEntry = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.lineTo(45, 25);
  ctx.moveTo(45, 10);
  ctx.lineTo(45, 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawExit = function(ctx, x, y) {
  ctx.beginPath();
  ctx.moveTo(50, 25);
  ctx.lineTo(5, 25);
  ctx.moveTo(5, 10);
  ctx.lineTo(5, 40);
  ctx.lineWidth = 15;
  ctx.stroke();
};

Shape.prototype.drawShape = function(ctx, x, y, start) {
  switch (this.type) {
    case "dblElbow":
      this.dblElbow(ctx, x, y);
      break;
    case "cross":
      this.drawCross(ctx, x, y);
      break;
    case "elbow":
      this.drawElbow(ctx, x, y, start);
      break;
    case "barrier":
      this.drawBarrier(ctx, x, y);
      break;
    case "entryPipe":
      this.drawEntry(ctx, x, y);
      break;
    case "exitPipe":
      this.drawExit(ctx, x, y);
      break;
    case "straight":
      this.drawStraight(ctx, x, y);
  }
};

Shape.prototype.rotatable = function() {
  return (
    this.shape != "entry" &&
    this.shape != "exit" &&
    this.shape != "cross" &&
    this.shape != "barrier" &&
    !this.locked
  );
};

// Shape.prototype.getRotation = function() {
//   return this.getRotationFromMatrix($(this.getCanvas()).css("transform"));
// };

// Shape.prototype.rotate = function() {
//   if (this.rotatable()) {
//     let currentRotation = this.getRotation();
//     $(this.getCanvas()).css("transform", `rotate(${currentRotation + 90}deg)`);
//   }
// };

// Shape.prototype.drawDblElbow = function() {};
module.exports = Shape;
