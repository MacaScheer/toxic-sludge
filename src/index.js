const Board = require("./board");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementById("gameboard");
  const ctx = canvasEl.getContext("2d");
  let board = new Board(400, 800);
  board.createGrid(ctx);
});
