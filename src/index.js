// const Game = require("./game");
// const GameView = require("./game_view");
const Pipe = require("./pipe");
const options = {
  pos: [200, 300],
  width: 20,
  height: 30
};
const pipe = new Pipe(options);
window.pipe = pipe;
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  // canvasEl.width = Game.DIM_X;
  // canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  pipe.drawPipe(ctx);
  // const game = new Game();
  // new GameView(game, ctx).start();
});
