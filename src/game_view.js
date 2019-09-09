const Space = function (shape, increment) {
    this.id = (Math.random() * 10000) % 10000;
    this.shape = shape || "elbow"
    this.makeCanvas();
    this.increment = increment;
};


Space.prototype.makeCanvas = function () {
    spaceCanvas = document.createElement("canvas");
    // spaceCanvas.setAttribute("id", this.id);
    spaceCanvas.setAttribute("class", "spaceCanvas");
    spaceCanvas.setAttribute("width", "50px");
    spaceCanvas.setAttribute("height", "50px");
    if (this.shape !== "empty" && this.shape !== "entry") { $(spaceCanvas).mousedown(this.addRotationHandler.bind(this)) }
    this.canvas = spaceCanvas;
    this.drawShape();
};