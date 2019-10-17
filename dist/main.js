!function(n){var e={};function t(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return n[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:r})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var i in n)t.d(r,i,function(e){return n[e]}.bind(null,i));return r},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=2)}([function(module,exports,__webpack_require__){"use strict";eval('\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Elbow = __webpack_require__(5);\n// const DblElbow = require("./dblElbow");\nvar Straight = __webpack_require__(6);\nvar Cross = __webpack_require__(7);\n\nvar Shape = function Shape(type, id, xRange, yRange, ctx) {\n  _classCallCheck(this, Shape);\n\n  this.xRange = xRange;\n  this.yRange = yRange;\n  this.type = type;\n  this.orientationIndex = id;\n  this.ctx = ctx;\n  this.frozenShapes = {};\n  this.drawEntry = this.drawEntry.bind(this);\n  this.drawExit = this.drawExit.bind(this);\n  this.drawSludgeEntry = this.drawSludgeEntry.bind(this);\n  this.asyncDrawSludgeEntry = this.asyncDrawSludgeEntry.bind(this);\n};\n\nShape.prototype.drawSludgeEntry = async function (ctx) {\n  var sludgeStep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n  await this.sleepFunction(10);\n  sludgeStep += 0.25;\n  ctx.beginPath();\n  ctx.moveTo(0, 375);\n  ctx.lineTo(sludgeStep, 375);\n  ctx.lineWidth = 10;\n  ctx.strokeStyle = "#32CD32";\n  ctx.stroke();\n  ctx.strokeStyle = "#000000";\n\n  if (sludgeStep < 50) {\n    return this.asyncDrawSludgeEntry(ctx, sludgeStep);\n  } else {\n    return "0,50,100,350,400";\n  }\n};\n\nShape.prototype.sleepFunction = function (ms) {\n  return new Promise(function (res) {\n    return setTimeout(res, ms);\n  });\n};\n\nShape.prototype.asyncDrawSludgeEntry = function (ctx, sludgeStep) {\n  return this.drawSludgeEntry(ctx, sludgeStep);\n};\n\nShape.prototype.drawEntry = function (ctx, x, y) {\n  ctx.clearRect(x + 1, y + 1, 49, 49);\n  ctx.beginPath();\n  ctx.moveTo(x + 0, y + 25);\n  ctx.lineTo(x + 45, y + 25);\n  ctx.moveTo(x + 45, y + 10);\n  ctx.lineTo(x + 45, y + 40);\n  ctx.lineWidth = 15;\n  ctx.strokeStyle = "#FCC201";\n  ctx.stroke();\n  ctx.strokeStyle = "#000000";\n};\n\nShape.prototype.drawExit = function (ctx, x, y) {\n  ctx.clearRect(x + 1, y + 1, 49, 49);\n  ctx.beginPath();\n  ctx.moveTo(x + 50, y + 25);\n  ctx.lineTo(x + 5, y + 25);\n  ctx.moveTo(x + 5, y + 10);\n  ctx.lineTo(x + 5, y + 40);\n  ctx.lineWidth = 15;\n  ctx.strokeStyle = "#FCC201";\n  ctx.stroke();\n  ctx.strokeStyle = "#000000";\n};\n\nShape.prototype.reDraw = function (selectId, range, ctx, type) {\n  var coords = range.split(",").map(function (s) {\n    return parseInt(s);\n  });\n  switch (type) {\n    case "elbow":\n      if (!this.frozenShapes[[coords[0], coords[2]]]) {\n        var elbow = new Elbow(selectId, ctx, false);\n        elbow.draw(ctx, coords[0], coords[2]);\n      }\n      break;\n    case "straight":\n      if (!this.frozenShapes[[coords[0], coords[2]]]) {\n        var straight = new Straight(selectId, ctx, false);\n        straight.draw(ctx, coords[0], coords[2]);\n      }\n      break;\n  }\n};\n\nShape.prototype.drawShape = async function (ctx, x, y) {\n  switch (this.type) {\n    case "cross":\n      var cross = new Cross(ctx);\n      cross.draw(ctx, x, y);\n      break;\n    case "elbow":\n      var elbowIndex = this.orientationIndex;\n      var elbow = new Elbow(elbowIndex, ctx, false);\n      elbow.draw(ctx, x, y);\n      break;\n    case "straight":\n      var straightIndex = this.orientationIndex;\n      var straight = new Straight(straightIndex, ctx, false);\n      straight.draw(ctx, x, y);\n      break;\n    case "entry":\n      this.drawEntry(ctx, x, y);\n      break;\n    case "exit":\n      this.drawExit(ctx, x, y);\n  }\n};\n\nShape.prototype.validPipeFlow = function (nextPipe, prevDir) {\n  var type = nextPipe.type;\n  var index = nextPipe.orientationIndex;\n  switch (type) {\n    case "straight":\n      var straight = new Straight(index, this.ctx, false);\n      return straight.validFlow(prevDir);\n    case "elbow":\n      var elbow = new Elbow(index, this.ctx, false);\n      return elbow.validFlow(prevDir);\n    case "cross":\n      return true;\n  }\n};\nShape.prototype.drawSludge = async function (nextPipe, prevDir, ctx) {\n  var index = nextPipe.orientationIndex;\n  var x = nextPipe.xRange[0];\n  var y = nextPipe.yRange[0];\n  var returnVal = void 0;\n  switch (nextPipe.type) {\n    case "straight":\n      var straight = new Straight(index, ctx, true);\n      this.frozenShapes[[x, y]] = straight;\n      returnVal = await straight.drawSludge(ctx, x, y, prevDir, 1, index);\n      return returnVal;\n    case "elbow":\n      var elbow = new Elbow(index, ctx, true);\n      this.frozenShapes[[x, y]] = elbow;\n\n      returnVal = await elbow.drawSludge(ctx, x, y, prevDir, 0.5 * Math.PI / 200, index);\n      return returnVal;\n    case "cross":\n      var cross = new Cross(index, ctx);\n      returnVal = await cross.drawSludge(ctx, x, y, prevDir, 1, index);\n      return returnVal;\n  }\n};\n\nmodule.exports = Shape;\n\n//# sourceURL=webpack:///./src/shape.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Message = function () {\n  function Message(ctx) {\n    _classCallCheck(this, Message);\n\n    this.ctx = ctx;\n    this.showMessage = this.showMessage.bind(this);\n    this.canvas = document.getElementById("gameboard");\n  }\n\n  _createClass(Message, [{\n    key: "showMessage",\n    value: function showMessage(type) {\n      this.ctx.clearRect(200, 100, 1250, 600);\n      this.ctx.font = "35px Arial";\n      this.ctx.fillStyle = "#32CD32";\n      this.ctx.textAlign = "center";\n      switch (type) {\n        case "win":\n          this.ctx.fillText("You Win!", this.canvas.width / 2, this.canvas.height * 2 / 5);\n          this.ctx.fillText("You saved the city from contamination!", this.canvas.width / 2, this.canvas.height / 2);\n          break;\n        case "lose":\n          this.ctx.fillText("Game Over!", this.canvas.width / 2, this.canvas.height * 2 / 5);\n          this.ctx.fillText("Ground water has been contaminated!", this.canvas.width / 2, this.canvas.height / 2);\n          break;\n        case "offGrid":\n          this.ctx.fillText("Game Over!", this.canvas.width / 2, this.canvas.height * 2 / 5);\n          this.ctx.fillText("You went off-grid, ya dingus!", this.canvas.width / 2, this.canvas.height / 2);\n          break;\n        case "start":\n          this.ctx.fillText("Welcome to Toxic-Sludge!", this.canvas.width / 2, this.canvas.height * 1.5 / 7);\n          this.ctx.fillText("Route the sludge from the entry-pipe to the exit-pipe", this.canvas.width / 2, this.canvas.height * 2.5 / 7);\n          this.ctx.fillText("Each square contains a pipe-piece that rotates", this.canvas.width / 2, this.canvas.height * 3.5 / 7);\n          this.ctx.fillText("Click on the squares to rotate the pipes.", this.canvas.width / 2, this.canvas.height * 4.5 / 7);\n          this.ctx.fillText("click here to PLAY", this.canvas.width / 2, this.canvas.height * 5.5 / 7);\n      }\n    }\n  }]);\n\n  return Message;\n}();\n\nmodule.exports = Message;\n\n//# sourceURL=webpack:///./src/message.js?')},function(module,exports,__webpack_require__){eval("module.exports = __webpack_require__(3);\n\n\n//# sourceURL=webpack:///multi_./src/index.js?")},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar Board = __webpack_require__(4);\nvar Game = __webpack_require__(8);\nvar Background = __webpack_require__(9);\nvar Message = __webpack_require__(1);\ndocument.addEventListener("DOMContentLoaded", function () {\n  var canvasEl = document.getElementById("gameboard");\n  var playButton = document.getElementById("play");\n  var ctx = canvasEl.getContext("2d");\n  var message = new Message(ctx);\n  var background = new Background(ctx, message);\n  var board = new Board(ctx);\n  board.createGrid(ctx);\n  message.showMessage("start");\n  canvasEl.addEventListener("click", function () {\n    var game = new Game(board, background, message);\n    board.createGrid(ctx);\n    game.start();\n  }, { once: true });\n  canvasEl.addEventListener("click", function (params) {\n    var clickSpot = [event.pageX, event.pageY];\n    board.rotateShape(clickSpot);\n  });\n});\n\n//# sourceURL=webpack:///./src/index.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Shape = __webpack_require__(0);\nvar Message = __webpack_require__(1);\n\nvar Board = function () {\n  function Board(ctx) {\n    _classCallCheck(this, Board);\n\n    this.types = ["elbow", "straight", "straight", "cross", "elbow"];\n    this.shapesObj = {};\n    this.ctx = ctx;\n    this.message = new Message(ctx);\n  }\n\n  _createClass(Board, [{\n    key: "createGrid",\n    value: function createGrid(ctx) {\n      ctx.beginPath();\n\n      for (var x = 0, i = 0; i < 24; x += 50, i++) {\n        ctx.moveTo(0, x);\n        ctx.lineTo(1650, x);\n        ctx.lineWidth = 1;\n        ctx.stroke();\n      }\n      for (var _x = 0, _i = 0; _i < 37; _x += 50, _i++) {\n        ctx.moveTo(_x, 0);\n        ctx.lineTo(_x, 800);\n        ctx.stroke();\n      }\n\n      for (var _x2 = 0, _i2 = 0; _i2 < 33; _x2 += 50, _i2++) {\n        for (var y = 0, j = 0; j < 16; y += 50, j++) {\n          var type = this.types[Math.floor(Math.random() * 5)];\n          var xRange = [_x2, _x2 + 50];\n          var yRange = [y, y + 50];\n          if (_x2 === 0 && y === 350) {\n            var entry = new Shape("entry", 1, xRange, yRange, this.ctx);\n            entry.drawShape(ctx, _x2, y);\n            this.shapesObj[[xRange, yRange]] = entry;\n          } else if (_x2 === 1600 && y === 350) {\n            var exit = new Shape("exit", 0, xRange, yRange, this.ctx);\n            exit.drawShape(ctx, _x2, y);\n            this.shapesObj[[xRange, yRange]] = exit;\n          } else {\n            var id = void 0;\n            if (type === "elbow") {\n              id = Math.floor(Math.random() * 4);\n            }\n            if (type === "straight") {\n              id = Math.floor(Math.random() * 2);\n            }\n            var shape = new Shape(type, id, xRange, yRange, ctx);\n            shape.drawShape(ctx, _x2, y);\n            this.shapesObj[[xRange, yRange]] = shape;\n          }\n        }\n      }\n      ctx.fill();\n    }\n  }, {\n    key: "rotateShape",\n    value: function rotateShape(clickSpot) {\n      var _this = this;\n\n      var _ref = [clickSpot[0], clickSpot[1]],\n          x = _ref[0],\n          y = _ref[1];\n\n      var ranges = Object.keys(this.shapesObj);\n      var selectShape = void 0;\n      ranges.forEach(function (range) {\n        var rangeArr = range.split(",").map(function (s) {\n          return parseInt(s);\n        });\n        if (x >= rangeArr[0] && x <= rangeArr[1] && y >= rangeArr[2] && y <= rangeArr[3]) {\n          selectShape = _this.shapesObj[range];\n          var selectId = selectShape.orientationIndex;\n\n          if (selectShape.type === "elbow") {\n            selectId = Math.floor((selectId + 1) % 4);\n            selectShape.reDraw(selectId, range, _this.ctx, selectShape.type);\n            _this.shapesObj[range].orientationIndex = selectId;\n          }\n          if (selectShape.type === "straight") {\n            selectId = Math.floor((selectId + 1) % 2);\n            selectShape.reDraw(selectId, range, _this.ctx, selectShape.type);\n            _this.shapesObj[range].orientationIndex = selectId;\n          }\n        }\n      });\n    }\n  }, {\n    key: "findDirection",\n    value: function findDirection(coordinates, direction) {\n      var nextShape = this.shapesObj[coordinates];\n      return nextShape;\n    }\n  }, {\n    key: "getValidFlow",\n    value: function getValidFlow(prevDir, nextPipe) {\n      var nextType = nextPipe.type;\n      if (nextType === "cross") {\n        return true;\n      } else {\n        return nextPipe.validPipeFlow(nextPipe, prevDir);\n      }\n    }\n  }, {\n    key: "fillEntryPipe",\n    value: async function fillEntryPipe() {\n      var entry = new Shape("entry", 1, [0, 50], [350, 400], this.ctx);\n      var returnVal = await entry.drawSludgeEntry(this.ctx);\n      return returnVal;\n    }\n  }, {\n    key: "fillPipes",\n    value: async function fillPipes(direction, nextShape) {\n      var returnVal = await nextShape.drawSludge(nextShape, direction, this.ctx);\n      return returnVal;\n    }\n  }]);\n\n  return Board;\n}();\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\n// const Shape = require("./shape");\n\nvar Elbow = function () {\n  function Elbow(index, ctx) {\n    _classCallCheck(this, Elbow);\n\n    this.orientationIndex = index;\n    this.radius = 25;\n    this.ctx = ctx;\n    this.drawSludge = this.drawSludge.bind(this);\n    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);\n    this.orientationArr = [{\n      offset_x: 0,\n      offset_y: 0,\n      start: 0 * Math.PI,\n      end: 0.5 * Math.PI,\n      openPoints: ["left", "top"],\n      corner: "topLeft"\n    }, {\n      offset_x: 50,\n      offset_y: 0,\n      start: 0.5 * Math.PI,\n      end: 1 * Math.PI,\n      openPoints: ["top", "right"],\n      corner: "topRight"\n    }, {\n      offset_x: 0,\n      offset_y: 50,\n      start: 1.5 * Math.PI,\n      end: 2 * Math.PI,\n      openPoints: ["left", "bottom"],\n      corner: "bottomLeft"\n    }, {\n      offset_x: 50,\n      offset_y: 50,\n      start: 1 * Math.PI,\n      end: 1.5 * Math.PI,\n      openPoints: ["right", "bottom"],\n      corner: "bottomRight"\n    }];\n    this.outDir = "";\n    this.outPoint = "";\n  }\n\n  _createClass(Elbow, [{\n    key: "draw",\n    value: function draw(ctx, x, y) {\n      var orientation = this.orientationArr[this.orientationIndex];\n      ctx.clearRect(x + 1, y + 1, 49, 49);\n      ctx.beginPath();\n      ctx.arc(x + orientation.offset_x, y + orientation.offset_y, this.radius, orientation.start, orientation.end);\n      ctx.lineWidth = 15;\n      ctx.stroke();\n    }\n  }, {\n    key: "drawSludge",\n    value: async function drawSludge(ctx, x, y, prevDir, sludgeStep, index) {\n      var orientation = this.orientationArr[index];\n      var newStart = void 0,\n          newEnd = void 0;\n      await this.sleepFunction(7);\n      ctx.beginPath();\n      var nextSpaceArr = new Array(5);\n      // positive arc direction\n      if (prevDir === "right" && orientation.corner === "bottomLeft") {\n        newStart = 1.5 * Math.PI;\n        newEnd = newStart + sludgeStep;\n        nextSpaceArr[0] = 1;\n        nextSpaceArr[1] = x + orientation.offset_x;\n        nextSpaceArr[2] = x + orientation.offset_x + 50;\n        nextSpaceArr[3] = y + orientation.offset_y;\n        nextSpaceArr[4] = y + orientation.offset_y + 50;\n      }\n      if (prevDir === "down" && orientation.corner === "topLeft") {\n        newStart = 0;\n        newEnd = newStart + sludgeStep;\n        nextSpaceArr[0] = 2;\n        nextSpaceArr[1] = x + orientation.offset_x - 50;\n        nextSpaceArr[2] = x + orientation.offset_x;\n        nextSpaceArr[3] = y + orientation.offset_y;\n        nextSpaceArr[4] = y + orientation.offset_y + 50;\n      }\n      if (prevDir === "up" && orientation.corner === "bottomRight") {\n        newStart = 1 * Math.PI;\n        newEnd = newStart + sludgeStep;\n        nextSpaceArr[0] = 0;\n        nextSpaceArr[1] = x + orientation.offset_x;\n        nextSpaceArr[2] = x + orientation.offset_x + 50;\n        nextSpaceArr[3] = y + orientation.offset_y - 50;\n        nextSpaceArr[4] = y + orientation.offset_y;\n      }\n      if (prevDir === "left" && orientation.corner === "topRight") {\n        newStart = 0.5 * Math.PI;\n        newEnd = newStart + sludgeStep;\n        nextSpaceArr[0] = 3;\n        nextSpaceArr[1] = x + orientation.offset_x - 50;\n        nextSpaceArr[2] = x + orientation.offset_x;\n        nextSpaceArr[3] = y + orientation.offset_y - 50;\n        nextSpaceArr[4] = y + orientation.offset_y;\n      }\n      // negative arc direction\n      if (prevDir === "up" && orientation.corner === "bottomLeft") {\n        newEnd = 0 * Math.PI;\n        newStart = newEnd - sludgeStep;\n\n        nextSpaceArr[0] = 2;\n        nextSpaceArr[1] = x + orientation.offset_x - 50;\n        nextSpaceArr[2] = x + orientation.offset_x;\n        nextSpaceArr[3] = y + orientation.offset_y - 50;\n        nextSpaceArr[4] = y + orientation.offset_y;\n      }\n      if (prevDir === "left" && orientation.corner === "bottomRight") {\n        newEnd = 1.5 * Math.PI;\n        newStart = newEnd - sludgeStep;\n        nextSpaceArr[0] = 1;\n        nextSpaceArr[1] = x + orientation.offset_x - 50;\n        nextSpaceArr[2] = x + orientation.offset_x;\n        nextSpaceArr[3] = y + orientation.offset_y;\n        nextSpaceArr[4] = y + orientation.offset_y + 50;\n      }\n      if (prevDir === "right" && orientation.corner === "topLeft") {\n        newEnd = 0.5 * Math.PI;\n        newStart = newEnd - sludgeStep;\n        nextSpaceArr[0] = 3;\n        nextSpaceArr[1] = x + orientation.offset_x;\n        nextSpaceArr[2] = x + orientation.offset_x + 50;\n        nextSpaceArr[3] = y + orientation.offset_y - 50;\n        nextSpaceArr[4] = y + orientation.offset_y;\n      }\n      if (prevDir === "down" && orientation.corner === "topRight") {\n        newEnd = 1 * Math.PI;\n        newStart = newEnd - sludgeStep;\n        nextSpaceArr[0] = 0;\n        nextSpaceArr[1] = x + orientation.offset_x;\n        nextSpaceArr[2] = x + orientation.offset_x + 50;\n        nextSpaceArr[3] = y + orientation.offset_y;\n        nextSpaceArr[4] = y + orientation.offset_y + 50;\n      }\n      ctx.arc(x + orientation.offset_x, y + orientation.offset_y, this.radius, newStart, newEnd);\n\n      ctx.lineWidth = 10;\n      ctx.strokeStyle = "#32CD32";\n      ctx.stroke();\n      ctx.strokeStyle = "#000000";\n\n      if (sludgeStep < 0.5 * Math.PI) {\n        return this.asyncDrawSludge(x, y, prevDir, sludgeStep + 0.5 * Math.PI / 200, index);\n      } else {\n        return nextSpaceArr;\n      }\n    }\n    //sludgeStep should be (.5 * Math.PI)/200\n\n  }, {\n    key: "sleepFunction",\n    value: function sleepFunction(ms) {\n      return new Promise(function (res) {\n        return setTimeout(res, ms);\n      });\n    }\n  }, {\n    key: "asyncDrawSludge",\n    value: function asyncDrawSludge(x, y, prevDir, sludgeStep, index) {\n      return this.drawSludge(this.ctx, x, y, prevDir, sludgeStep, index);\n    }\n  }, {\n    key: "validFlow",\n    value: function validFlow(inDir) {\n      var inPoint = void 0;\n      switch (inDir) {\n        case "up":\n          inPoint = "bottom";\n          break;\n        case "down":\n          inPoint = "top";\n          break;\n        case "right":\n          inPoint = "left";\n          break;\n        case "left":\n          inPoint = "right";\n          break;\n      }\n      var openPoints = this.orientationArr[this.orientationIndex].openPoints;\n      return openPoints.includes(inPoint);\n    }\n  }]);\n\n  return Elbow;\n}();\n\nmodule.exports = Elbow;\n\n//# sourceURL=webpack:///./src/elbow.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Shape = __webpack_require__(0);\n\nvar Straight = function () {\n  function Straight(index, ctx) {\n    _classCallCheck(this, Straight);\n\n    this.orientationIndex = index;\n    this.ctx = ctx;\n    this.drawSludge = this.drawSludge.bind(this);\n    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);\n    this.orientationArr = [{\n      offset_x_1: 25,\n      offset_y_1: 0,\n      offset_x_2: 25,\n      offset_y_2: 50,\n      openPoints: ["top", "bottom"],\n      corner: "upDown"\n    }, {\n      offset_x_1: 0,\n      offset_y_1: 25,\n      offset_x_2: 50,\n      offset_y_2: 25,\n      openPoints: ["left", "right"],\n      corner: "leftRight"\n    }];\n    this.corner = this.orientationArr[this.orientationIndex].corner;\n    this.outPoint = "";\n    this.outDir = "";\n    this.startX = null;\n    this.startY = null;\n  }\n\n  _createClass(Straight, [{\n    key: "draw",\n    value: function draw(ctx, x, y) {\n      var orientation = this.orientationArr[this.orientationIndex];\n      ctx.clearRect(x + 1, y + 1, 49, 49);\n      ctx.beginPath();\n      ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);\n      ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);\n      ctx.lineWidth = 15;\n      ctx.stroke();\n    }\n  }, {\n    key: "drawSludge",\n    value: async function drawSludge(ctx, x, y, prevDir, sludgeStep, index) {\n      var orientation = this.orientationArr[index];\n      var nextSpaceArr = new Array(5);\n      if (prevDir === "right") {\n        nextSpaceArr[0] = 0;\n        nextSpaceArr[1] = x + 50;\n        nextSpaceArr[2] = x + 100;\n        nextSpaceArr[3] = y;\n        nextSpaceArr[4] = y + 50;\n      }\n      if (prevDir === "left") {\n        nextSpaceArr[0] = 2;\n        nextSpaceArr[1] = x - 50;\n        nextSpaceArr[2] = x;\n        nextSpaceArr[3] = y;\n        nextSpaceArr[4] = y + 50;\n      }\n      if (prevDir === "down") {\n        nextSpaceArr[0] = 1;\n        nextSpaceArr[1] = x;\n        nextSpaceArr[2] = x + 50;\n        nextSpaceArr[3] = y + 50;\n        nextSpaceArr[4] = y + 100;\n      }\n      if (prevDir === "up") {\n        nextSpaceArr[0] = 3;\n        nextSpaceArr[1] = x;\n        nextSpaceArr[2] = x + 50;\n        nextSpaceArr[3] = y - 50;\n        nextSpaceArr[4] = y;\n      }\n      var newOffset = void 0;\n      if (prevDir === "down" || prevDir === "right") {\n        newOffset = sludgeStep;\n      }\n      if (prevDir === "up" || prevDir === "left") {\n        newOffset = 50 - sludgeStep;\n      }\n\n      await this.sleepFunction(7);\n      ctx.beginPath();\n      if (prevDir === "down") {\n        ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);\n        ctx.lineTo(x + orientation.offset_x_2, y + newOffset);\n        nextSpaceArr[0] = 1;\n      } else if (prevDir === "up") {\n        ctx.moveTo(x + orientation.offset_x_1, y + newOffset);\n        ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);\n        nextSpaceArr[0] = 3;\n      } else if (prevDir === "left") {\n        ctx.moveTo(x + orientation.offset_x_2, y + orientation.offset_y_2);\n        ctx.lineTo(x + newOffset, y + orientation.offset_y_1);\n        nextSpaceArr[0] = 2;\n      } else if (prevDir === "right") {\n        ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);\n        ctx.lineTo(x + newOffset, y + orientation.offset_y_2);\n        nextSpaceArr[0] = 0;\n      }\n\n      ctx.lineWidth = 10;\n      ctx.strokeStyle = "#32CD32";\n      ctx.stroke();\n      ctx.strokeStyle = "#000000";\n      if (sludgeStep < 50) {\n        return this.asyncDrawSludge(this.ctx, x, y, prevDir, sludgeStep + 0.25, index);\n      } else {\n        return nextSpaceArr;\n      }\n    }\n  }, {\n    key: "sleepFunction",\n    value: function sleepFunction(ms) {\n      return new Promise(function (res) {\n        return setTimeout(res, ms);\n      });\n    }\n  }, {\n    key: "asyncDrawSludge",\n    value: function asyncDrawSludge(ctx, x, y, prevDir, sludgeStep, index) {\n      return this.drawSludge(ctx, x, y, prevDir, sludgeStep, index);\n    }\n  }, {\n    key: "validFlow",\n    value: function validFlow(inDir) {\n      var inPoint = void 0;\n      switch (inDir) {\n        case "up":\n          inPoint = "bottom";\n          break;\n        case "down":\n          inPoint = "top";\n          break;\n        case "right":\n          inPoint = "left";\n          break;\n        case "left":\n          inPoint = "right";\n          break;\n      }\n      var openPoints = this.orientationArr[this.orientationIndex].openPoints;\n      return openPoints.includes(inPoint);\n    }\n  }, {\n    key: "direction",\n    value: function direction(inDir) {\n      if (inDir === "down" && this.orientationIndex === 0) {\n        this.outDir = "down";\n      }\n      if (inDir === "up" && this.orientationIndex === 0) {\n        this.outDir = "up";\n      }\n      if (inDir === "right" && this.orientationIndex === 1) {\n        this.outDir = "right";\n      }\n      if (this.inDir === "left" && this.orientationIndex === 1) {\n        this.outDir = "left";\n      }\n    }\n  }]);\n\n  return Straight;\n}();\n\nmodule.exports = Straight;\n\n//# sourceURL=webpack:///./src/straight.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Shape = __webpack_require__(0);\n\nvar Cross = function () {\n  function Cross(id, ctx) {\n    _classCallCheck(this, Cross);\n\n    this.ctx = ctx;\n    this.orientationIndex = id;\n\n    this.drawSludge = this.drawSludge.bind(this);\n    this.asyncDrawSludge = this.asyncDrawSludge.bind(this);\n  }\n\n  _createClass(Cross, [{\n    key: "draw",\n    value: function draw(ctx, x, y) {\n      ctx.clearRect(x + 1, y + 1, 49, 49);\n      ctx.beginPath();\n      ctx.moveTo(x + 25, y + 0);\n      ctx.lineTo(x + 25, y + 50);\n      ctx.moveTo(x + 0, y + 25);\n      ctx.lineTo(x + 50, y + 25);\n      ctx.lineWidth = 15;\n      ctx.stroke();\n    }\n  }, {\n    key: "direction",\n    value: function direction(inDir) {\n      return inDir;\n    }\n  }, {\n    key: "drawSludge",\n    value: async function drawSludge(ctx, x, y, prevDir, sludgeStep, index) {\n      var newOffset = void 0;\n      var offset_x_1 = void 0,\n          offset_y_1 = void 0,\n          offset_x_2 = void 0,\n          offset_y_2 = void 0;\n      var nextSpaceArr = new Array(5);\n      if (prevDir === "down" || prevDir === "right") {\n        newOffset = sludgeStep;\n      }\n      if (prevDir === "up" || prevDir === "left") {\n        newOffset = 50 - sludgeStep;\n      }\n      if (prevDir === "left") {\n        offset_x_1 = 50;\n        offset_x_2 = newOffset;\n        nextSpaceArr[0] = 2;\n        nextSpaceArr[1] = x - 50;\n        nextSpaceArr[2] = x;\n        nextSpaceArr[3] = y;\n        nextSpaceArr[4] = y + 50;\n      }\n      if (prevDir === "right") {\n        offset_x_1 = 0;\n        offset_x_2 = newOffset;\n        nextSpaceArr[0] = 0;\n        nextSpaceArr[1] = x + 50;\n        nextSpaceArr[2] = x + 100;\n        nextSpaceArr[3] = y;\n        nextSpaceArr[4] = y + 50;\n      }\n      if (prevDir === "up") {\n        offset_y_1 = 50;\n        offset_y_2 = newOffset;\n        nextSpaceArr[0] = 3;\n        nextSpaceArr[1] = x;\n        nextSpaceArr[2] = x + 50;\n        nextSpaceArr[3] = y - 50;\n        nextSpaceArr[4] = y;\n      }\n      if (prevDir === "down") {\n        offset_y_1 = 0;\n        offset_y_2 = newOffset;\n        nextSpaceArr[0] = 1;\n        nextSpaceArr[1] = x;\n        nextSpaceArr[2] = x + 50;\n        nextSpaceArr[3] = y + 50;\n        nextSpaceArr[4] = y + 100;\n      }\n      await this.sleepFunction(7);\n\n      ctx.beginPath();\n      if (prevDir === "up" || prevDir === "down") {\n        offset_x_1 = 25;\n        offset_x_2 = 25;\n      }\n      if (prevDir === "left" || prevDir === "right") {\n        offset_y_1 = 25;\n        offset_y_2 = 25;\n      }\n      ctx.moveTo(x + offset_x_1, y + offset_y_1);\n      ctx.lineTo(x + offset_x_2, y + offset_y_2);\n\n      ctx.lineWidth = 10;\n      ctx.strokeStyle = "#32CD32";\n      ctx.stroke();\n      ctx.strokeStyle = "#000000";\n\n      if (sludgeStep < 50) {\n        return this.asyncDrawSludge(x, y, prevDir, sludgeStep + 0.25, index);\n      } else {\n        return nextSpaceArr;\n      }\n    }\n  }, {\n    key: "sleepFunction",\n    value: function sleepFunction(ms) {\n      return new Promise(function (res) {\n        return setTimeout(res, ms);\n      });\n    }\n  }, {\n    key: "asyncDrawSludge",\n    value: function asyncDrawSludge(x, y, prevDir, sludgeStep, index) {\n      return this.drawSludge(this.ctx, x, y, prevDir, sludgeStep, index);\n    }\n  }]);\n\n  return Cross;\n}();\n\nmodule.exports = Cross;\n\n//# sourceURL=webpack:///./src/cross.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Game = function () {\n  function Game(board, background, message) {\n    _classCallCheck(this, Game);\n\n    this.board = board;\n    this.message = message;\n    this.background = background;\n    this.isGameOver = false;\n    this.start = this.start.bind(this);\n    this.play = this.play.bind(this);\n    this.dirString = "";\n    this.directionOptionsObj = {\n      0: "right",\n      1: "down",\n      2: "left",\n      3: "up"\n    };\n  }\n\n  _createClass(Game, [{\n    key: "start",\n    value: function start() {\n      this.play();\n    }\n  }, {\n    key: "play",\n    value: async function play() {\n      var entryReturn = await this.board.fillEntryPipe();\n      var coordinateArr = entryReturn.split(",");\n      var direction = this.directionOptionsObj[coordinateArr[0]];\n      var nextShape = this.board.findDirection(coordinateArr.slice(1), direction);\n\n      while (this.board.getValidFlow(direction, nextShape)) {\n        var _coordinateArr = await this.board.fillPipes(direction, nextShape);\n\n        direction = this.directionOptionsObj[_coordinateArr[0]];\n        nextShape = this.board.findDirection(_coordinateArr.slice(1));\n        await this.sleepFunction(7);\n        if (!nextShape) {\n          console.log("YOU WENT OFF-GRID!");\n          this.message.showMessage("offGrid");\n          return;\n        }\n        if (nextShape.xRange[0] >= 1600 && nextShape.yRange[0] === 350) {\n          console.log("YOU SAVED THE CITY");\n          this.message.showMessage("win");\n          return;\n        }\n      }\n      this.background.spillOut(nextShape, direction);\n      console.log("game over");\n      return;\n    }\n  }, {\n    key: "sleepFunction",\n    value: function sleepFunction(ms) {\n      return new Promise(function (res) {\n        return setTimeout(res, ms);\n      });\n    }\n  }]);\n\n  return Game;\n}();\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?')},function(module,exports,__webpack_require__){"use strict";eval('\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nvar Background = function () {\n  function Background(ctx, message) {\n    _classCallCheck(this, Background);\n\n    this.ctx = ctx;\n    this.spillOut = this.spillOut.bind(this);\n    this.message = message;\n  }\n\n  _createClass(Background, [{\n    key: "spillOut",\n    value: async function spillOut(nextShape, direction) {\n      var x = nextShape.xRange[0];\n      var y = nextShape.yRange[0];\n      var ctx = this.ctx;\n      var offset_x = void 0,\n          offset_y = void 0;\n      if (direction === "right" || direction === "left") offset_y = 25;\n      if (direction === "down" || direction === "up") offset_x = 25;\n      if (direction === "down") offset_y = 0;\n      if (direction === "up") offset_y = 50;\n      if (direction === "right") offset_x = 0;\n      if (direction === "left") offset_x = 50;\n      ctx.beginPath();\n      ctx.lineWidth = 5;\n      ctx.strokeStyle = "#32CD32";\n      for (var i = 0; i < 400; i += 3) {\n        await this.sleepFunction(4);\n        ctx.arc(x + offset_x, y + offset_y, i, 0, 2 * Math.PI);\n        ctx.stroke();\n      }\n      this.message.showMessage("lose");\n    }\n  }, {\n    key: "sleepFunction",\n    value: function sleepFunction(ms) {\n      return new Promise(function (res) {\n        return setTimeout(res, ms);\n      });\n    }\n  }]);\n\n  return Background;\n}();\n\nmodule.exports = Background;\n\n//# sourceURL=webpack:///./src/background.js?')}]);