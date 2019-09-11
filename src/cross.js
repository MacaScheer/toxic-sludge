const Shape = require("./shape");

class Cross {
  draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(x + 0, y + 25);
    ctx.lineTo(x + 50, y + 25);
    ctx.moveTo(x + 25, y + 0);
    ctx.lineTo(x + 25, y + 50);
    ctx.lineWidth = 15;
    ctx.stroke();
  }
  validFlow(inDir) {
    let openPoints = ["up", "down", "left", "right"];
    return openPoints.includes(inDir);
  }
}

module.exports = Cross;
