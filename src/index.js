const Board = require("./board");
const Game = require("./game");
const Background = require("./background");
const Message = require("./message");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  const ctx = canvasEl.getContext("2d");
  const restartButton = document.getElementById("restart-button");
  const message = new Message(ctx);
  const background = new Background(ctx, message);
  const board = new Board(ctx);

  board.createGrid(ctx);
  message.showMessage("start");

  restartButton.addEventListener("click", function() {
    const newCanvasEl = document.getElementById("gameboard");
    const newCtx = newCanvasEl.getContext("2d");
    newCtx.clearRect(0, 0, 1265, 660);
    const newBoard = new Board(newCtx);
    const newGame = new Game(newBoard, background, message);
    newBoard.createGrid(newCtx);
    newGame.start();
    newCanvasEl.addEventListener("click", function() {
      let clickSpot = [event.pageX, event.pageY];
      newBoard.rotateShape(clickSpot);
    });
  });
  canvasEl.addEventListener("click", function() {
    let clickSpot = [event.pageX, event.pageY];
    board.rotateShape(clickSpot);
  });
});
