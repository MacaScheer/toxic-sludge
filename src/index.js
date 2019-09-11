const Tile = require("./tiles");
const Shape = require("./shape");
const Board = require("./board");
document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  const ctx = canvasEl.getContext("2d");
  let shape = new Shape();
  let board = new Board(400, 800);
  // space.drawBarrier(ctx);
  board.createGrid(ctx);
  // debugger;
  // space.drawElbow(ctx);
  // space.drawUturn(ctx);
  // space.drawStraight(ctx);
  // space.drawCross(ctx);
  // space.drawEntry(ctx);
  // space.drawExit(ctx);
});
