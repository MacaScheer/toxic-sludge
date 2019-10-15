const Board = require("./board");
const Game = require("./game");
const Background = require("./background");
const Message = require("./message");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  const playButton = document.getElementById("play");
  const ctx = canvasEl.getContext("2d");
  const message = new Message(ctx);
  const background = new Background(ctx, message);
  const board = new Board(ctx);
  board.createGrid(ctx);
  message.showMessage("start");
  canvasEl.addEventListener(
    "click",
    function() {
      const game = new Game(board, background, message);
      board.createGrid(ctx);
      game.start();
    },
    { once: true }
  );
  canvasEl.addEventListener("click", function(params) {
    let clickSpot = [event.pageX, event.pageY];
    board.rotateShape(clickSpot);
  });
});
