class Background {
  constructor(ctx2) {
    this.ctx2 = ctx2;
    this.spillOut = this.spillOut.bind(this);
    this.createBG = this.createBG.bind(this);
  }
  createBG() {
    this.ctx2.beginPath();
    this.ctx2.rect(0, 0, 2500, 2500);
    this.ctx2.stroke();
  }
  spillOut(nextShape, direction) {
    console.log("NEXTSHAPE", nextShape);
    console.log("DIRECTION", direction);
    let ctx2 = this.ctx2;
    let offset_x, offset_y;
    if (direction === "right" || direction === "left") offset_y = 25;
    if (direction === "down" || direction === "up") offset_x = 25;
    if (direction === "down") offset_y = 50;
    if (direction === "up") offset_y = 0;
    if (direction === "right") offset_x = 50;
    if (direction === "left") offset_x = 0;
    ctx2.beginPath();
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = "#32CD32";
    for (let i = 0; i < 500; i += 0.25) {
      console.log("I", i);
      ctx2.arc(offset_x, offset_y, i, 0, 2 * Math.PI);
      ctx2.stroke();
    }
  }
}

module.exports = Background;
