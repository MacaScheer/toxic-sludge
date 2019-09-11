/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape.js */ \"./src/shape.js\");\n\nclass Board {\n  constructor(height, width) {\n    this.width = width;\n    this.height = height;\n  }\n  createGrid(ctx) {\n    ctx.beginPath();\n\n    for (let x = 0, i = 0; i < 14; x += 50, i++) {\n      ctx.moveTo(0, x);\n      ctx.lineTo(750, x);\n      ctx.lineWidth = 1;\n      ctx.stroke();\n    }\n    for (let x = 0, i = 0; i < 16; x += 50, i++) {\n      ctx.moveTo(x, 0);\n      ctx.lineTo(x, 650);\n      ctx.stroke();\n    }\n\n    for (let x = 0, i = 0; i < 15; x += 50, i++) {\n      for (let y = 0, j = 0; j < 13; y += 50, j++) {\n        // const shape = new Shape(types[Math.floor(Math.random() * 5)]);\n        const shape = new Shape(\"elbow\");\n        // debugger;\n        let start = 0;\n        shape.drawShape(ctx, x, y, start);\n        // shape.drawElbow(ctx, x, y)\n      }\n    }\n    ctx.fill();\n  }\n\n  randomShape() {\n    const types = [\"dblElbow\", \"elbow\", \"straight\", \"cross\"];\n    return types[Math.floor(Math.random() * 5)];\n  }\n}\n\nmodule.exports = Board;\n\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/cross.js":
/*!**********************!*\
  !*** ./src/cross.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape */ \"./src/shape.js\");\n\nclass Cross {\n  draw(x, y) {\n    ctx.beginPath();\n    ctx.moveTo(x + 0, y + 25);\n    ctx.lineTo(x + 50, y + 25);\n    ctx.moveTo(x + 25, y + 0);\n    ctx.lineTo(x + 25, y + 50);\n    ctx.lineWidth = 15;\n    ctx.stroke();\n  }\n  validFlow(inDir) {\n    let openPoints = [\"up\", \"down\", \"left\", \"right\"];\n    return openPoints.includes(inDir);\n  }\n}\n\nmodule.exports = Cross;\n\n\n//# sourceURL=webpack:///./src/cross.js?");

/***/ }),

/***/ "./src/dblElbow.js":
/*!*************************!*\
  !*** ./src/dblElbow.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape */ \"./src/shape.js\");\n\nclass dblElbow {\n  constructor() {\n    this.orientationIndex = Math.floor(Math.random() * 5);\n    this.radius = 20;\n    this.orientationArr = [\n      {\n        offset_x: 0,\n        offset_y: 0,\n        offset_x_2: 25,\n        offset_y_2: 50,\n        offset_x_3: 50,\n        offset_y_3: 50,\n        start_1: 0,\n        end_1: 0.5 * Math.PI,\n        start_2: Math.Pi,\n        openPoints: [\"left\", \"up\"]\n      }, //offset_x, offset_y, start, end\n      {\n        offset_x: 0,\n        offset_y: 0,\n        offset_x_2: 25,\n        offset_y_2: 50,\n        offset_x_3: 50,\n        offset_y_3: 50,\n        start_1: 0,\n        end_1: 2 * Math.PI,\n        start_2: 1 * Math.PI,\n        end_2: 2 * Math.PI,\n        openPoints: [\"left\", \"down\"]\n      }\n    ];\n  }\n  draw(x, y, index) {\n    let orientation = this.orientationArr[this.orientationIndex];\n    ctx.beginPath();\n    ctx.arc(\n      x + orientation.offset_x_1,\n      y + orientation.offset_y_1,\n      25,\n      orientation.start_1,\n      orientation.end_1\n    );\n    ctx.moveTo(x + offset_x_2, y + offset_y_2);\n    ctx.arc(x + offset_x_3, y + offset_y_3, 25);\n  }\n\n  validFlow(inDir) {\n    let openPoints = this.orientationArr[this.orientationIndex].openPoints;\n    return openPoints.includes(inDir);\n  }\n\n  flowDirection(inDir) {}\n  onClick() {\n    index = (index + 1) % orientationArr.length;\n  }\n  //draw(x, y, orientationArr[orientationIndex])\n}\n\nmodule.exports = dblElbow;\n\n\n//# sourceURL=webpack:///./src/dblElbow.js?");

/***/ }),

/***/ "./src/elbow.js":
/*!**********************!*\
  !*** ./src/elbow.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape */ \"./src/shape.js\");\n\nclass Elbow {\n  constructor() {\n    this.orientationIndex = Math.floor(Math.random() * 5);\n    this.radius = 25;\n    this.orientationArr = [\n      {\n        offset_x: 0,\n        offset_y: 0,\n        start: 0 * Math.PI,\n        end: 0.5 * Math.PI,\n        openPoints: [\"left\", \"up\"],\n        corner: \"topLeft\"\n      }, //offset_x, offset_y, start, end\n      {\n        offset_x: 50,\n        offset_y: 0,\n        start: 0.5 * Math.PI,\n        end: 1 * Math.PI,\n        openPoints: [\"up\", \"right\"],\n        corner: \"topRight\"\n      },\n      {\n        offset_x: 0,\n        offset_y: 50,\n        start: 1.5 * Math.PI,\n        end: 2 * Math.PI,\n        openPoints: [\"left\", \"down\"],\n        corner: \"bottomLeft\"\n      },\n      {\n        offset_x: 50,\n        offset_y: 50,\n        start: 1 * Math.PI,\n        end: 1.5 * Math.PI,\n        openPoints: [\"right\", \"down\"],\n        corner: \"bottomRight\"\n      }\n    ];\n  }\n  draw(x, y, index) {\n    let orientation = this.orientationArr[this.orientationIndex];\n    ctx.beginPath();\n    ctx.arc(\n      x + orientation.offset_x,\n      y + orientation.offset_y,\n      radius,\n      orientation.start,\n      orientation.end\n    );\n  }\n\n  validFlow(inDir) {\n    let openPoints = this.orientationArr[this.orientationIndex].openPoints;\n    return openPoints.includes(inDir);\n  }\n\n  onClick() {\n    index = (index + 1) % orientationArr.length;\n  }\n  //draw(x, y, orientationArr[orientationIndex])\n}\n\nmodule.exports = Elbow;\n\n\n//# sourceURL=webpack:///./src/elbow.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape */ \"./src/shape.js\");\nconst Board = __webpack_require__(/*! ./board */ \"./src/board.js\");\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const canvasEl = document.getElementsByTagName(\"canvas\")[0];\n  const ctx = canvasEl.getContext(\"2d\");\n  let shape = new Shape();\n  let board = new Board(400, 800);\n  // space.drawBarrier(ctx);\n  board.createGrid(ctx);\n  // debugger;\n  // space.drawElbow(ctx);\n  // space.drawUturn(ctx);\n  // space.drawStraight(ctx);\n  // space.drawCross(ctx);\n  // space.drawEntry(ctx);\n  // space.drawExit(ctx);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shape.js":
/*!**********************!*\
  !*** ./src/shape.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Elbow = __webpack_require__(/*! ./elbow */ \"./src/elbow.js\");\nconst DblElbow = __webpack_require__(/*! ./dblElbow */ \"./src/dblElbow.js\");\nconst Straight = __webpack_require__(/*! ./straight */ \"./src/straight.js\");\nconst Cross = __webpack_require__(/*! ./cross */ \"./src/cross.js\");\n\nconst Shape = function(type) {\n  this.type = type;\n\n};\n\nShape.prototype.drawBarrier = function(ctx, x, y) {\n  ctx.rect(0, 0, 50, 50);\n  ctx.fillStyle = \"black\";\n  ctx.fill();\n  ctx.stroke();\n};\n\nShape.prototype.drawElbow = function(ctx, x, y, start) {\n  ctx.beginPath();\n  ctx.arc(x, y, 25, start, 0.5 * Math.PI);\n  // ctx.arc(x, y + 50, 25, 1.5 * Math.PI, 2 * Math.PI);\n  // ctx.arc(x + 50, y + 50, 25, 1 * Math.PI, 1.5 * Math.PI);\n  // ctx.arc(x + 50, y + 0, 25, 0.5 * Math.PI, 1 * Math.PI);\n\n  ctx.lineWidth = 15;\n  ctx.stroke();\n};\n\nShape.prototype.drawDblElbow = function(ctx, x, y) {\n  ctx.beginPath();\n  ctx.arc(x + 0, y + 0, 20, 0, 0.5 * Math.PI);\n  ctx.moveTo(x + 25, y + 50);\n  ctx.arc(x + 50, y + 50, 20, 1.5 * Math.PI, 2 * Math.PI);\n  ctx.stroke();\n};\n\nShape.prototype.drawStraight = function(ctx, x, y) {\n  ctx.beginPath();\n  ctx.moveTo(x + 25, y + 0);\n  ctx.lineTo(x + 25, y + 50);\n  ctx.lineWidth = 15;\n  ctx.stroke();\n};\nShape.prototype.drawCross = function(ctx, x, y) {\n  ctx.beginPath();\n  ctx.moveTo(x + 25, y + 0);\n  ctx.lineTo(x + 25, y + 50);\n  ctx.moveTo(x + 0, y + 25);\n  ctx.lineTo(x + 50, y + 25);\n  ctx.lineWidth = 15;\n  ctx.stroke();\n};\n\nShape.prototype.drawEntry = function(ctx, x, y) {\n  ctx.beginPath();\n  ctx.moveTo(0, 25);\n  ctx.lineTo(45, 25);\n  ctx.moveTo(45, 10);\n  ctx.lineTo(45, 40);\n  ctx.lineWidth = 15;\n  ctx.stroke();\n};\n\nShape.prototype.drawExit = function(ctx, x, y) {\n  ctx.beginPath();\n  ctx.moveTo(50, 25);\n  ctx.lineTo(5, 25);\n  ctx.moveTo(5, 10);\n  ctx.lineTo(5, 40);\n  ctx.lineWidth = 15;\n  ctx.stroke();\n};\n\nShape.prototype.drawShape = function(ctx, x, y, start) {\n  switch (this.type) {\n    case \"dblElbow\":\n      this.drawDblElbow(ctx, x, y);\n      break;\n    case \"cross\":\n      this.drawCross(ctx, x, y);\n      break;\n    case \"elbow\":\n      this.drawElbow(ctx, x, y, start);\n      break;\n    case \"barrier\":\n      this.drawBarrier(ctx, x, y);\n      break;\n    case \"entryPipe\":\n      this.drawEntry(ctx, x, y);\n      break;\n    case \"exitPipe\":\n      this.drawExit(ctx, x, y);\n      break;\n    case \"straight\":\n      this.drawStraight(ctx, x, y);\n  }\n};\n\nShape.prototype.rotatable = function() {\n  return (\n    this.shape != \"entry\" &&\n    this.shape != \"exit\" &&\n    this.shape != \"cross\" &&\n    this.shape != \"barrier\" &&\n    !this.locked\n  );\n};\n\n// Shape.prototype.getRotation = function() {\n//   return this.getRotationFromMatrix($(this.getCanvas()).css(\"transform\"));\n// };\n\n// Shape.prototype.rotate = function() {\n//   if (this.rotatable()) {\n//     let currentRotation = this.getRotation();\n//     $(this.getCanvas()).css(\"transform\", `rotate(${currentRotation + 90}deg)`);\n//   }\n// };\n\n// Shape.prototype.drawDblElbow = function() {};\nmodule.exports = Shape;\n\n\n//# sourceURL=webpack:///./src/shape.js?");

/***/ }),

/***/ "./src/straight.js":
/*!*************************!*\
  !*** ./src/straight.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shape = __webpack_require__(/*! ./shape */ \"./src/shape.js\");\n\nclass Straight {\n  constructor() {\n    this.orientationIndex = MAth.floor(Math.random() * 3);\n    this.orientationArr = [\n      {\n        offset_x_1: 25,\n        offset_y_1: 0,\n        offset_x_2: 25,\n        offset_y_2: 50,\n        openPoints: [\"up\", \"down\"]\n      },\n      {\n        offset_x_1: 0,\n        offset_y_1: 25,\n        offset_x_2: 50,\n        offset_y_2: 25,\n        openPoints: [\"left\", \"right\"]\n      }\n    ];\n  }\n\n  draw(x, y) {\n    let orientation = this.orientationArr[this.orientationIndex];\n    ctx.beginPath();\n    ctx.moveTo(x + orientation.offset_x_1, y + orientation.offset_y_1);\n    ctx.lineTo(x + orientation.offset_x_2, y + orientation.offset_y_2);\n    ctx.lineWidth = 15;\n    ctx.stroke();\n  }\n  validFlow(inDir) {\n    let openPoints = this.orientationArr[this.orientationIndex].openPoints;\n    return openPoints.includes(inDir);\n  }\n\n  onClick() {\n    index = (index + 1) % this.orientationArr.length;\n  }\n}\n\nmodule.exports = Straight;\n\n\n//# sourceURL=webpack:///./src/straight.js?");

/***/ })

/******/ });