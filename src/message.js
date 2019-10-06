class Message {
  constructor(ctx) {
    this.ctx = ctx;
    this.showMessage = this.showMessage.bind(this);
    this.winMessage = this.winMessage.bind(this);
    this.canvas = document.getElementById("gameboard");
  }
  showMessage() {
    this.ctx.clearRect(200, 150, 350, 250);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
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
  }
  winMessage() {
    this.ctx.clearRect(200, 150, 350, 250);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
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
  }
}

module.exports = Message;
