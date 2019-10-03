const Board = require("./board");

class Game {
  constructor(board) {
    this.board = board;
    this.isGameOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.dirString = "";
    this.directionOptionsObj = {
      0: "right",
      1: "down",
      2: "left",
      3: "up"
    };
  }
  start() {
    let date = new Date();
    let timeNow = date.getTime();
    this.play();
  }

  async play() {
    let entryReturn = await this.board.fillEntryPipe();
    console.log("RETURN FORM ASYNC:", entryReturn);
    let coordinateArr = entryReturn.split(",");
    let direction = this.directionOptionsObj[coordinateArr[0]];
    console.log("direction", direction);
    let nextShape = this.board.findDirection(coordinateArr.slice(1), direction);
    console.log("nextShape", nextShape);

    while (this.board.getValidFlow(direction, nextShape)) {
      let coordinateArr = await this.board.fillPipes(direction, nextShape);
      console.log("COORDINATEARR", coordinateArr);

      console.log("check", coordinateArr[0]);
      direction = this.directionOptionsObj[coordinateArr[0]];
      console.log("direction", direction);
      console.log("slice: ", coordinateArr.slice(1));
      nextShape = this.board.findDirection(coordinateArr.slice(1));
      await this.sleepFunction(30);
      console.log("AFTER SLEEP");
    }
    console.log("game over");
    return;
  }

  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

module.exports = Game;
