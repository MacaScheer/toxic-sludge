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
    //to start at beginning of entrance
    // this.dirString = "0,0,0,250,300";
    this.dirString = "0,0,50,250,300";
    let date = new Date();
    let timeNow = date.getTime();
    this.play(0);
  }

  async play(timestep) {
    let entryReturn = await this.board.fillEntryPipe("0,50,250,300");
    // console.log("RETURN FORM ASYNC:", entryReturn);

    let dirPackage = this.board.findDirection(this.dirString);

    // let dirPackage = this.board.findDirection(dirString);
    console.log("DIRPACKAGE", dirPackage);
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
