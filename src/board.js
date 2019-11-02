const Shape = require("./shape.js");
const Message = require("./message");

class Board {
  constructor(ctx) {
    this.types = ["elbow", "straight", "straight", "cross", "elbow"];
    this.shapesObj = {};
    this.ctx = ctx;
    this.message = new Message(ctx);
  }

  createGrid(ctx, shapesObj = this.shapesObj) {
    ctx.beginPath();

    for (let x = 0, i = 0; i < 14; x += 50, i++) {
      ctx.moveTo(5, x);
      ctx.lineTo(1255, x);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.moveTo(1256, 0);
    ctx.lineTo(1256, 650);
    ctx.lineWidth = 1;
    ctx.stroke();
    for (let x = 5, i = 0; i < 26; x += 50, i++) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 650);
      ctx.stroke();
    }

    for (let x = 5, i = 0; i < 25; x += 50, i++) {
      for (let y = 0, j = 0; j < 13; y += 50, j++) {
        let type = this.types[Math.floor(Math.random() * 5)];
        let xRange = [x, x + 50];
        let yRange = [y, y + 50];
        if (x === 5 && y === 300) {
          const entry = new Shape("entry", 1, xRange, yRange, ctx);
          entry.drawShape(ctx, x, y);
          shapesObj[[xRange, yRange]] = entry;
        } else if (x === 1205 && y === 300) {
          const exit = new Shape("exit", 0, xRange, yRange, ctx);
          exit.drawShape(ctx, x, y);
          shapesObj[[xRange, yRange]] = exit;
        } else {
          let id;
          if (type === "elbow") {
            id = Math.floor(Math.random() * 4);
          }
          if (type === "straight") {
            id = Math.floor(Math.random() * 2);
          }
          const shape = new Shape(type, id, xRange, yRange, ctx);
          shape.drawShape(ctx, x, y);
          shapesObj[[xRange, yRange]] = shape;
        }
      }
    }
    ctx.fill();
  }

  rotateShape(clickSpot, shapesObj = this.shapesObj, ctx = this.ctx) {
    let [x, y] = [clickSpot[0], clickSpot[1]];
    const ranges = Object.keys(shapesObj);
    let selectShape;
    ranges.forEach(range => {
      let rangeArr = range.split(",").map(s => parseInt(s));
      if (
        x >= rangeArr[0] &&
        x <= rangeArr[1] &&
        y >= rangeArr[2] &&
        y <= rangeArr[3]
      ) {
        selectShape = shapesObj[range];
        let selectId = selectShape.orientationIndex;

        if (selectShape.type === "elbow") {
          selectId = Math.floor((selectId + 1) % 4);
          selectShape.reDraw(selectId, range, ctx, selectShape.type);
          shapesObj[range].orientationIndex = selectId;
        }
        if (selectShape.type === "straight") {
          selectId = Math.floor((selectId + 1) % 2);
          selectShape.reDraw(selectId, range, ctx, selectShape.type);
          shapesObj[range].orientationIndex = selectId;
        }
      }
    });
  }

  findDirection(coordinates, shapesObj = this.shapesObj) {
    let nextShape = shapesObj[coordinates];
    return nextShape;
  }

  getValidFlow(prevDir, nextPipe) {
    let nextType = nextPipe.type;
    if (nextType === "cross") {
      return true;
    } else {
      return nextPipe.validPipeFlow(nextPipe, prevDir);
    }
  }
  async fillEntryPipe(ctx = this.ctx) {
    const entry = new Shape("entry", 1, [5, 55], [300, 350], ctx);
    let returnVal = await entry.drawSludgeEntry(ctx);
    return returnVal;
  }
  async fillExitPipe(ctx = this.ctx, direction) {
    const exit = new Shape("exit", direction, [1205, 1255], [300, 350], ctx);
    console.log("EXIT: ", exit);
    console.log("DIRECTION: ", direction);
    exit.drawSludgeExit(ctx, direction);
  }
  async fillPipes(direction, nextShape, ctx = this.ctx) {
    let returnVal = await nextShape.drawSludge(nextShape, direction, ctx);
    return returnVal;
  }
}

module.exports = Board;
