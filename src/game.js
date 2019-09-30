const Board = require("./board");

class Game {
  constructor(board) {
    this.board = board;
    this.isGameOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.dirString = "";
    this.directionOptionsObj = {
      right: 0,
      down: 1,
      left: 2,
      up: 3
    };
  }
  start() {
    this.dirString = "0,0,50,250,300";
    let date = new Date();
    let timeNow = date.getTime();
    this.play(0);
  }

  async play(timestep) {
    let dirPackage = this.board.findDirection(this.dirString);
    console.log(dirPackage);
    let nextPipe = dirPackage[1];
    let prevDir = dirPackage[0];
    if (this.board.getValidFlow(prevDir, nextPipe)) {
      let val = await this.board.fillPipes(prevDir, nextPipe);
      // if (before spill){
      console.log("VAL: ", val);
      let dirNum = this.directionOptionsObj[prevDir];
      let newDirArr = [dirNum]
        .concat(nextPipe["xRange"])
        .concat(nextPipe["yRange"]);
      this.dirString = newDirArr.join(",");
      console.log("dirstring: ", this.dirString);
      // dirPackage = this.board.findDirection(this.dirString);
      //   console.log(dirPackage);
      //}
      //   setTimeout(this.play.bind(null, timestep + 500), 500);
    } else {
      console.log("game over");
    }
  }

  //async call fillPipes
}

module.exports = Game;
