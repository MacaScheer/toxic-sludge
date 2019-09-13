const Shape = require("./shape");

class Cross {
  constructor() {}

  draw(ctx, x, y) {
    ctx.clearRect(x + 1, y + 1, 49, 49);
    ctx.beginPath();
    ctx.moveTo(x + 25, y + 0);
    ctx.lineTo(x + 25, y + 50);
    ctx.moveTo(x + 0, y + 25);
    ctx.lineTo(x + 50, y + 25);
    ctx.lineWidth = 15;
    ctx.stroke();
  }
  direction(inDir) {
    return inDir;
  }
}

module.exports = Cross;
