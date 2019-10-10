class Message {
  constructor(ctx) {
    this.ctx = ctx;
    this.showMessage = this.showMessage.bind(this);
    this.canvas = document.getElementById("gameboard");
  }
  showMessage(type) {
    this.ctx.clearRect(25, 150, 700, 250);
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
          this.canvas.height / 2
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
        break;
      case "start":
        this.ctx.fillText(
          "Click on the squares to rotate the pipes.",
          this.canvas.width / 2,
          (this.canvas.height * 3) / 7
        );
        this.ctx.fillText(
          "Route the sludge through the town",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
        this.ctx.fillText(
          "PLAY",
          this.canvas.width / 2,
          (this.canvas.height * 5) / 7
        );
    }
  }
}

module.exports = Message;
