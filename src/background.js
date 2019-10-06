class Background {
  constructor(ctx, message) {
    this.ctx = ctx;
    this.spillOut = this.spillOut.bind(this);
    this.message = message;
  }

  async spillOut(nextShape, direction) {
    let x = nextShape.xRange[0];
    let y = nextShape.yRange[0];
    let ctx = this.ctx;
    let offset_x, offset_y;
    if (direction === "right" || direction === "left") offset_y = 25;
    if (direction === "down" || direction === "up") offset_x = 25;
    if (direction === "down") offset_y = 0;
    if (direction === "up") offset_y = 50;
    if (direction === "right") offset_x = 0;
    if (direction === "left") offset_x = 50;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#32CD32";
    for (let i = 0; i < 400; i += 3) {
      await this.sleepFunction(4);
      ctx.arc(x + offset_x, y + offset_y, i, 0, 2 * Math.PI);
      ctx.stroke();
    }
    this.message.showMessage();
  }

  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

module.exports = Background;
