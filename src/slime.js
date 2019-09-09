function SlimeObject() {
  this.pos = options.pos;
  this.vel = options.vel;
  this.direction = options.direction;
  this.length = options.length;
  this.color = options.color;
  this.corrosiveness = options.corrosiveness;
}

SlimeObject.prototype.flowThru = function flowThru(pipeObject) {};

SlimeObject.prototype.spillOut = function spillOut(brokenPipe) {};

SlimeObject.prototype.meltThru = function meltThru(pipeObject) {
  //some pipes will be less durable and over time will corrode
  //and need to be repaired or else the city park could become toxic
};

module.exports = SlimeObject;
