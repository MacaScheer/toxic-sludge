const Shape = require("./shape.js");

class Board {
  constructor(height, width) {
    this.width = width;
    this.height = height;
  }
  createGrid(ctx) {
    ctx.beginPath();
    const types = ["uTurn", "elbow", "straight", "cross"];

    for (let x = 0, i = 0; i < 6; x += 55, i++) {
      ctx.moveTo(0, x);
      ctx.lineTo(385, x);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    for (let x = 0, i = 0; i < 8; x += 55, i++){
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 275);
      ctx.stroke();

    }

    for (let x = 0, i = 0; i < 7; x += 55, i++) {
      for (let y = 0, j = 0; j < 5; y += 55, j++) {
        // const shape = new Shape(types[Math.floor(Math.random() * 5)]);
        const shape = new Shape("elbow");
        // debugger;
        let start = 0;
        shape.drawShape(ctx, x, y, start);
      }
    }
    ctx.fill();
  }
}

module.exports = Board;
