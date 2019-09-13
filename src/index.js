const Board = require("./board");
const Game = require("./game");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  const ctx = canvasEl.getContext("2d");
  let board = new Board(400, 800, ctx);
  board.createGrid(ctx);
  canvasEl.addEventListener("click", function(params) {
    let clickSpot = [event.pageX, event.pageY];
    board.rotateShape(clickSpot);
  });
  const game = new Game(board);
  game.start();
});
