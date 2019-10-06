const Board = require("./board");
const Game = require("./game");
const Background = require("./background");
const Message = require("./message");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  const ctx = canvasEl.getContext("2d");
  const message = new Message(ctx);
  const background = new Background(ctx, message);
  const board = new Board(ctx);
  board.createGrid(ctx);
  canvasEl.addEventListener("click", function(params) {
    let clickSpot = [event.pageX, event.pageY];
    board.rotateShape(clickSpot);
  });
  const game = new Game(board, background, message);
  game.start();
});
