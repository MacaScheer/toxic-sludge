class Message {
  constructor(ctx) {
    this.ctx = ctx;
    this.showMessage = this.showMessage.bind(this);
    this.canvas = document.getElementById("gameboard");
  }
  showMessage(type, points) {
    this.ctx.clearRect(100, 100, 1050, 450);
    this.ctx.font = "35px Arial";
    this.ctx.fillStyle = "#32CD32";
    this.ctx.textAlign = "center";
    switch (type) {
      case "win":
        this.ctx.fillText(
          "You Win!",
          this.canvas.width / 2,
          (this.canvas.height * 2) / 5
        );
        this.ctx.fillText(
          "You saved the city from contamination!",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
        this.ctx.strokeStyle = "#FCC201";
        this.ctx.font = "25px Arial";
        this.ctx.fillText(
          `SCORE: ${points}`,
          this.canvas.width / 2,
          (this.canvas.height * 2) / 3
        );
        break;
      case "lose":
        this.ctx.fillText(
          "Game Over!",
          this.canvas.width / 2,
          (this.canvas.height * 2) / 5
        );
        this.ctx.fillText(
          "Ground water has been contaminated!",
          this.canvas.width / 2,
          (this.canvas.height * 3) / 5
        );
        this.ctx.strokeStyle = "#FCC201";
        this.ctx.font = "25px Arial";
        this.ctx.fillText(
          `SCORE: ${points}`,
          this.canvas.width / 2,
          (this.canvas.height * 2) / 3
        );
        break;
      case "offGrid":
        this.ctx.fillText(
          "Game Over!",
          this.canvas.width / 2,
          (this.canvas.height * 2) / 5
        );
        this.ctx.fillText(
          "You went off-grid, ya dingus!",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
        this.ctx.strokeStyle = "#FCC201";
        this.ctx.font = "25px Arial";
        this.ctx.fillText(
          `SCORE: ${points}`,
          this.canvas.width / 2,
          (this.canvas.height * 2) / 3
        );
        break;
      case "start":
        this.ctx.fillText(
          "Welcome to Toxic-Sludge!",
          this.canvas.width / 2,
          (this.canvas.height * 2) / 7
        );
        this.ctx.font = "25px Arial";
        this.ctx.fillText(
          "Route the sludge from the entry-pipe to the exit-pipe",
          this.canvas.width / 2,
          (this.canvas.height * 3.5) / 7
        );
        this.ctx.fillText(
          "Each square contains a pipe-piece that rotates",
          this.canvas.width / 2,
          (this.canvas.height * 4) / 7
        );
        this.ctx.fillText(
          "Click on the squares to rotate the pipes.",
          this.canvas.width / 2,
          (this.canvas.height * 4.5) / 7
        );
    }
  }
}

module.exports = Message;
