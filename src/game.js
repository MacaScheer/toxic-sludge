const Board = require("./board");

class Game {
  constructor(board, background, message) {
    this.board = board;
    this.message = message;
    this.background = background;
    this.isGameOver = false;
    this.start = this.start.bind(this);
    this.play = this.play.bind(this);
    this.dirString = "";
    this.points = 0;
    this.directionOptionsObj = {
      0: "right",
      1: "down",
      2: "left",
      3: "up"
    };
  }
  start() {
    this.play();
  }

  async play(
    board = this.board,
    directionOptionsObj = this.directionOptionsObj
  ) {
    let entryReturn = await board.fillEntryPipe();
    let coordinateArr = entryReturn.split(",");
    let direction = directionOptionsObj[coordinateArr[0]];
    let nextShape = board.findDirection(coordinateArr.slice(1));

    while (this.board.getValidFlow(direction, nextShape) && !this.isGameOver) {
      console.log("gameOver?: ", this.isGameOver);
      this.points += 1;
      let coordinateArr = await this.board.fillPipes(direction, nextShape);

      direction = this.directionOptionsObj[coordinateArr[0]];
      nextShape = this.board.findDirection(coordinateArr.slice(1));
      await this.sleepFunction(7);
      if (!nextShape) {
        console.log("YOU WENT OFF-GRID!");
        this.message.showMessage("offGrid", this.points);
        return;
      }
      if (nextShape.xRange[0] >= 1205 && nextShape.yRange[0] === 300) {
        await board.fillExitPipe(direction);
        console.log("YOU SAVED THE CITY");
        this.message.showMessage("win", this.points);
        return;
      }
    }
    this.background.spillOut(nextShape, direction, this.points);
    console.log("game over");

    return;
  }

  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

module.exports = Game;
