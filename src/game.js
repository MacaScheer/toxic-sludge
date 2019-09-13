const Board = require("./board");

class Game {
  constructor(board) {
    this.board = board;
    this.isGameOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.dirString = "";
  }
  start() {
    this.dirString = "0,0,50,250,300";

    let date = new Date();
    let timeNow = date.getTime();
    this.play(0);
  }
  play(timestep) {
    let nextPipe = this.board.findDirection(this.dirString);
    this.board.fillPipes(nextPipe);
    // setTimeout(this.play.bind(null, timestep + 100), 100);
  }
}

module.exports = Game;
