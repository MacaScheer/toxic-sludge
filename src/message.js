class Message {
  constructor(ctx) {
    this.ctx = ctx;
    this.showMessage = this.showMessage.bind(this);
    this.canvas = document.getElementById("gameboard");
  }
  showMessage(type, points, ctx = this.ctx, canvas = this.canvas) {
    ctx.clearRect(100, 100, 1050, 450);
    ctx.font = "35px Arial";
    ctx.fillStyle = "#32CD32";
    ctx.textAlign = "center";
    switch (type) {
      case "win":
        ctx.fillText("You Win!", canvas.width / 2, (canvas.height * 2) / 5);
        ctx.fillText(
          "You saved the city from contamination!",
          canvas.width / 2,
          canvas.height / 2
        );
        ctx.strokeStyle = "#FCC201";
        ctx.font = "25px Arial";
        ctx.fillText(
          `SCORE: ${points}`,
          canvas.width / 2,
          (canvas.height * 2) / 3
        );
        ctx.strokeStyle = "#000000";

        break;
      case "lose":
        ctx.fillText("Game Over!", canvas.width / 2, (canvas.height * 2) / 5);
        ctx.fillText(
          "Ground water has been contaminated!",
          canvas.width / 2,
          (canvas.height * 3) / 5
        );
        ctx.strokeStyle = "#FCC201";
        ctx.font = "25px Arial";
        ctx.fillText(
          `SCORE: ${points}`,
          canvas.width / 2,
          (canvas.height * 2) / 3
        );
        break;
      case "offGrid":
        ctx.fillText("Game Over!", canvas.width / 2, (canvas.height * 2) / 5);
        ctx.fillText(
          "You went off-grid, ya dingus!",
          canvas.width / 2,
          canvas.height / 2
        );
        ctx.strokeStyle = "#FCC201";
        ctx.font = "25px Arial";
        ctx.fillText(
          `SCORE: ${points}`,
          canvas.width / 2,
          (canvas.height * 2) / 3
        );
        ctx.strokeStyle = "#000000";
        break;
      case "start":
        ctx.fillText(
          "Welcome to Toxic-Sludge!",
          canvas.width / 2,
          (canvas.height * 2) / 7
        );
        ctx.font = "25px Arial";
        ctx.fillText(
          "Route the sludge from the entry-pipe to the exit-pipe",
          canvas.width / 2,
          (canvas.height * 3.5) / 7
        );
        ctx.fillText(
          "Each square contains a pipe-piece that rotates",
          canvas.width / 2,
          (canvas.height * 4) / 7
        );
        ctx.fillText(
          "Click on the squares to rotate the pipes.",
          canvas.width / 2,
          (canvas.height * 4.5) / 7
        );
    }
  }
}

module.exports = Message;
