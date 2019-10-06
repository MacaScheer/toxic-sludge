const Board = require("./board");
const Game = require("./game");
const Background = require("./background");
const Message = require("./message");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  // const backgroundCanvas = document.getElementById("background");
  const ctx = canvasEl.getContext("2d");
  // const ctx2 = backgroundCanvas.getContext("2d");
  const startMessage = new Message(ctx);
  const background = new Background(ctx);
  const board = new Board(ctx);
  // background.createBG();
  board.createGrid(ctx);
  canvasEl.addEventListener("click", function(params) {
    let clickSpot = [event.pageX, event.pageY];
    board.rotateShape(clickSpot);
  });
  const game = new Game(board, background);
  game.start();
});
