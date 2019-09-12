const Shape = require("./shape");

class Cross {
  constructor() {}

  draw(ctx, x, y) {
    debugger;
    ctx.beginPath();
    ctx.moveTo(x + 25, y + 0);
    ctx.lineTo(x + 25, y + 50);
    ctx.moveTo(x + 0, y + 25);
    ctx.lineTo(x + 50, y + 25);
    ctx.lineWidth = 15;
    ctx.stroke();
  }
  validFlow(inPoint) {
    //will always be true
    let openPoints = ["up", "down", "left", "right"];
    return openPoints.includes(inPoint);
  }
  direction(inDir) {
    return inDir;
  }
  drawSlime(inDir, inPoint) {}
}

module.exports = Cross;
