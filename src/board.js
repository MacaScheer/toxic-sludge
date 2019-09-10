const Space = require('./space.js');


const Board = {
    spaces: [],
    positions: {},
    over: false,
    started: false,

    checkGameWon() { },
    
    addToScore() { },

    createSpaces(difficultyLevel) {
        while (this.spaces.length < 150) {
            let randomization;
            randomization = Math.floor(Math.random()*4 + difficultyLevel)
        }
    }




}

