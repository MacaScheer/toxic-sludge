const Pipe = require("./pipe");

const pipes = [];

window.Game = function (xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;

    for (let i = 0; i < Game.NUM_PIPES; i++) {
        pipes.push(Pipe.drawPipe)
    }
}