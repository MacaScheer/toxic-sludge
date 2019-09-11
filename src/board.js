const Shape = require("./shape.js");

class Board {
  constructor(height, width) {
    this.width = width;
    this.height = height;
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
        // const shape = new Shape(types[Math.floor(Math.random() * 5)]);
        const shape = new Shape("elbow");
        // debugger;
        let start = 0;
        shape.drawShape(ctx, x, y, start);
        // shape.drawElbow(ctx, x, y)
      }
    }
    ctx.fill();
  }

  randomShape() {
    const types = ["dblElbow", "elbow", "straight", "cross"];
    return types[Math.floor(Math.random() * 5)];
  }
}

module.exports = Board;
