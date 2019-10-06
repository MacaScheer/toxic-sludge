class Game {
  constructor(board, background, message) {
    this.board = board;
    this.message = message;
    this.background = background;
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
    let coordinateArr = entryReturn.split(",");
    let direction = this.directionOptionsObj[coordinateArr[0]];
    let nextShape = this.board.findDirection(coordinateArr.slice(1), direction);

    while (this.board.getValidFlow(direction, nextShape)) {
      let coordinateArr = await this.board.fillPipes(direction, nextShape);

      direction = this.directionOptionsObj[coordinateArr[0]];
      nextShape = this.board.findDirection(coordinateArr.slice(1));
      await this.sleepFunction(5);
    }
    if (nextShape[xRange] === [700, 750] && nextShape[yRange] === [250, 300]) {
      console.log("YOU SAVED THE CITY FROM TOXICITY!!!");
      this.message.winMessage();
    } else {
      this.background.spillOut(nextShape, direction);
      console.log("game over");
    }
    return;
  }

  sleepFunction(ms) {
    return new Promise(res => setTimeout(res, ms));
  }
}

module.exports = Game;
