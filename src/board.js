const Shape = require("./shape.js");

class Board {
  constructor(height, width, ctx) {
    this.width = width;
    this.height = height;
    this.types = ["elbow", "straight", "cross", "elbow"]; //cross, dblElbow
    this.shapesObj = {};
    this.ctx = ctx;
  }

  createGrid(ctx) {
    ctx.beginPath();

    for (let x = 0, i = 0; i < 14; x += 50, i++) {
      ctx.moveTo(0, x);
      ctx.lineTo(750, x);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let x = 0, i = 0; i < 16; x += 50, i++) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 650);
      ctx.stroke();
    }

    for (let x = 0, i = 0; i < 15; x += 50, i++) {
      for (let y = 0, j = 0; j < 13; y += 50, j++) {
        let type = this.types[Math.floor(Math.random() * 3)];
        let xRange = [x, x + 50];
        let yRange = [y, y + 50];
        if (x === 0 && y === 250) {
          const entry = new Shape("entry", 1, xRange, yRange);
          entry.drawShape(ctx, x, y);
          this.shapesObj[[xRange, yRange]] = entry;
        } else if (x === 700 && y === 250) {
          const exit = new Shape("exit", 0, xRange, yRange);
          exit.drawShape(ctx, x, y);
          this.shapesObj[[xRange, yRange]] = exit;
        } else {
          let id;
          if (type === "elbow") {
            id = Math.floor(Math.random() * 4);
          }
          if (type === "straight") {
            id = Math.floor(Math.random() * 2);
          }
          const shape = new Shape(type, id, xRange, yRange);
          shape.drawShape(ctx, x, y);
          this.shapesObj[[xRange, yRange]] = shape;
        }
      }
    }
    ctx.fill();
  }

  rotateShape(clickSpot) {
    let [x, y] = [clickSpot[0], clickSpot[1]];
    const ranges = Object.keys(this.shapesObj);
    let selectShape;
    ranges.forEach(range => {
      let rangeArr = range.split(",").map(s => parseInt(s));
      if (
        x >= rangeArr[0] &&
        x <= rangeArr[1] &&
        y >= rangeArr[2] &&
        y <= rangeArr[3]
      ) {
        selectShape = this.shapesObj[range];

        let selectId = selectShape.orientationIndex;
        if (selectShape.type === "elbow") {
          selectId = Math.floor((selectId + 1) % 4);
          selectShape.reDraw(selectId, range, this.ctx, selectShape.type);
          this.shapesObj[range].orientationIndex = selectId;
        }
        if (selectShape.type === "straight") {
          selectId = Math.floor((selectId + 1) % 2);
          selectShape.reDraw(selectId, range, this.ctx, selectShape.type);
          this.shapesObj[range].orientationIndex = selectId;
        }
      }
    });
  }

  findDirection(dirString) {
    const directionOptionsObj = {
      0: "right",
      1: "down",
      2: "left",
      3: "up"
    };
    let coordinateArr = dirString.split(",");
    let direction = directionOptionsObj[parseInt(coordinateArr.shift())];
    let coordinates = coordinateArr.map(s => parseInt(s));
    let newX1, newX2, newY1, newY2;
    let [x1, x2, y1, y2] = coordinates;
    let newCoordinateString;
    switch (direction) {
      case "right":
        newX1 = x1 + 50;
        newX2 = x2 + 50;
        newCoordinateString = [newX1, newX2, y1, y2].join(",");
        break;
      case "left":
        newX1 = x1 - 50;
        newX2 = x2 - 50;
        newCoordinateString = [newX1, newX2, y1, y2].join(",");
        break;
      case "up":
        newY1 = y1 + 50;
        newY2 = y2 + 50;
        newCoordinateString = [x1, x2, newY1, newY2].join(",");
        break;
      case "down":
        newY1 = y1 - 50;
        newY2 = y2 - 50;
        newCoordinateString = [x1, x2, newY1, newY2].join(",");
        break;
    }
    let nextShapeObj = this.shapesObj[newCoordinateString];
    return [direction, nextShapeObj];
  }

  getValidFlow(prevDir, nextPipe) {
    let nextType = nextPipe.type;
    if (nextType === "cross") {
      return true;
    } else {
      return nextPipe.validPipeFlow(nextPipe, prevDir);
    }
  }

  fillPipes(prevDir, nextPipe) {
    nextPipe.drawSludge(nextPipe, prevDir, this.ctx);
  }
}

module.exports = Board;
