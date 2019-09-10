const Pipe = function Pipe(options) {
  this.pos = options.pos;
  this.width = options.width;
  this.height = options.height;
  // this.shape = options.shape;
  // this.color = options.color;
  // this.game = options.game;
  // this.durability = options.durability;
}

Pipe.prototype.drawPipe = function drawPipe(ctx) {
  // ctx.fillStyle = this.color;
  return ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
  // ctx.fill()
};

Pipe.prototype.rotate = function rotate(deg) {};

module.exports = Pipe;
