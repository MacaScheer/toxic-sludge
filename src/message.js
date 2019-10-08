class Message {
  constructor(ctx) {
    this.ctx = ctx;
    this.showMessage = this.showMessage.bind(this);
    this.canvas = document.getElementById("gameboard");
  }
  showMessage(type) {
    this.ctx.clearRect(200, 150, 350, 250);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
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
          "Rotate the pipes to route the sludge",
          this.canvas.width / 2,
          (this.canvas.height * 2) / 5
        );
        this.ctx.fillText(
          "Press 'Play' to start",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
    }
  }
}

module.exports = Message;
