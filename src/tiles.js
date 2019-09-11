const Tile = function Tile(options) {
  this.pos = options.pos;
  this.shape = options.shape;
  // this.orientation = options.oritentation
};

// direction/shape

// Tile.prototype.drawTile = function drawTile(ctx) {
//   // ctx.fillStyle = this.color;
//   return ctx.fillRect(this.pos[0], this.pos[1], this.width, this.height);
//   // ctx.fill()
// };

Tile.prototype.rotate = function rotate(deg) {};

module.exports = Tile;
