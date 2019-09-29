!function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";var o=n(4),r=(n(5),n(6)),i=n(7),a=function t(e,n,o,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.xRange=o,this.yRange=r,this.type=e,this.orientationIndex=n,this.ctx=i};a.prototype.drawEntry=function(t,e,n){t.clearRect(e+1,n+1,49,49),t.beginPath(),t.moveTo(e+0,n+25),t.lineTo(e+45,n+25),t.moveTo(e+45,n+10),t.lineTo(e+45,n+40),t.lineWidth=15,t.strokeStyle="#FCC201",t.stroke(),t.strokeStyle="#000000"},a.prototype.drawExit=function(t,e,n){t.clearRect(e+1,n+1,49,49),t.beginPath(),t.moveTo(e+50,n+25),t.lineTo(e+5,n+25),t.moveTo(e+5,n+10),t.lineTo(e+5,n+40),t.lineWidth=15,t.strokeStyle="#FCC201",t.stroke(),t.strokeStyle="#000000"},a.prototype.reDraw=function(t,e,n,i){var a=e.split(",").map((function(t){return parseInt(t)}));switch(i){case"elbow":new o(t,n).draw(n,a[0],a[2]);break;case"straight":new r(t,n).draw(n,a[0],a[2])}},a.prototype.drawShape=function(t,e,n){switch(this.type){case"cross":new i(t).draw(t,e,n);break;case"elbow":var a=this.orientationIndex;new o(a,t).draw(t,e,n);break;case"straight":var s=this.orientationIndex;new r(s,t).draw(t,e,n);break;case"entry":this.drawEntry(t,e,n);break;case"exit":this.drawExit(t,e,n)}},a.prototype.validPipeFlow=function(t,e){var n=t.type,i=t.orientationIndex;switch(n){case"straight":return new r(i,this.ctx).validFlow(e);case"elbow":return new o(i,this.ctx).validFlow(e);case"cross":return!0}},a.prototype.drawSludge=function(t,e,n){var a=t.orientationIndex,s=t.xRange[0],f=t.yRange[0];switch(t.type){case"straight":return new r(a,n).drawSludge(n,s,f,e,1,a);case"elbow":return new o(a,n).drawSludge(n,s,f,e,.5*Math.PI/200,a);case"cross":return new i(n).drawSludge(n,s,f,e,1,a)}},t.exports=a},function(t,e,n){"use strict";var o=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],o=!0,r=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(o=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);o=!0);}catch(t){r=!0,i=t}finally{try{!o&&s.return&&s.return()}finally{if(r)throw i}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var i=n(0),a=function(){function t(e,n,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.width=n,this.height=e,this.types=["elbow","straight","cross","elbow"],this.shapesObj={},this.ctx=o}return r(t,[{key:"createGrid",value:function(t){t.beginPath();for(var e=0,n=0;n<14;e+=50,n++)t.moveTo(0,e),t.lineTo(750,e),t.lineWidth=1,t.stroke();for(var o=0,r=0;r<16;o+=50,r++)t.moveTo(o,0),t.lineTo(o,650),t.stroke();for(var a=0,s=0;s<15;a+=50,s++)for(var f=0,u=0;u<13;f+=50,u++){var c=this.types[Math.floor(3*Math.random())],l=[a,a+50],h=[f,f+50];if(0===a&&250===f){var d=new i("entry",1,l,h);d.drawShape(t,a,f),this.shapesObj[[l,h]]=d}else if(700===a&&250===f){var p=new i("exit",0,l,h);p.drawShape(t,a,f),this.shapesObj[[l,h]]=p}else{var y=void 0;"elbow"===c&&(y=Math.floor(4*Math.random())),"straight"===c&&(y=Math.floor(2*Math.random()));var v=new i(c,y,l,h);v.drawShape(t,a,f),this.shapesObj[[l,h]]=v}}t.fill()}},{key:"rotateShape",value:function(t){var e=this,n=[t[0],t[1]],o=n[0],r=n[1],i=Object.keys(this.shapesObj),a=void 0;i.forEach((function(t){var n=t.split(",").map((function(t){return parseInt(t)}));if(o>=n[0]&&o<=n[1]&&r>=n[2]&&r<=n[3]){var i=(a=e.shapesObj[t]).orientationIndex;"elbow"===a.type&&(i=Math.floor((i+1)%4),a.reDraw(i,t,e.ctx,a.type),e.shapesObj[t].orientationIndex=i),"straight"===a.type&&(i=Math.floor((i+1)%2),a.reDraw(i,t,e.ctx,a.type),e.shapesObj[t].orientationIndex=i)}}))}},{key:"findDirection",value:function(t){var e=t.split(","),n={0:"right",1:"down",2:"left",3:"up"}[parseInt(e.shift())],r=e.map((function(t){return parseInt(t)})),i=o(r,4),a=i[0],s=i[1],f=i[2],u=i[3],c=void 0;switch(n){case"right":c=[a+50,s+50,f,u].join(",");break;case"left":c=[a-50,s-50,f,u].join(",");break;case"up":c=[a,s,f+50,u+50].join(",");break;case"down":c=[a,s,f-50,u-50].join(",")}return[n,this.shapesObj[c]]}},{key:"getValidFlow",value:function(t,e){return"cross"===e.type||e.validPipeFlow(e,t)}},{key:"fillPipes",value:function(t,e){e.drawSludge(e,t,this.ctx)}}]),t}();t.exports=a},function(t,e,n){t.exports=n(3)},function(t,e,n){"use strict";var o=n(1),r=n(8);document.addEventListener("DOMContentLoaded",(function(){var t=document.getElementById("gameboard"),e=t.getContext("2d"),n=new o(400,800,e);n.createGrid(e),t.addEventListener("click",(function(t){var e=[event.pageX,event.pageY];n.rotateShape(e)})),new r(n).start()}))},function(t,e,n){"use strict";var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();var r=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.orientationIndex=e,this.radius=25,this.ctx=n,this.drawSludge=this.drawSludge.bind(this),this.asyncDrawSludge=this.asyncDrawSludge.bind(this),this.orientationArr=[{offset_x:0,offset_y:0,start:0*Math.PI,end:.5*Math.PI,openPoints:["left","top"],corner:"topLeft"},{offset_x:50,offset_y:0,start:.5*Math.PI,end:1*Math.PI,openPoints:["top","right"],corner:"topRight"},{offset_x:0,offset_y:50,start:1.5*Math.PI,end:2*Math.PI,openPoints:["left","bottom"],corner:"bottomLeft"},{offset_x:50,offset_y:50,start:1*Math.PI,end:1.5*Math.PI,openPoints:["right","bottom"],corner:"bottomRight"}],this.outDir="",this.outPoint=""}return o(t,[{key:"draw",value:function(t,e,n){var o=this.orientationArr[this.orientationIndex];t.clearRect(e+1,n+1,49,49),t.beginPath(),t.arc(e+o.offset_x,n+o.offset_y,this.radius,o.start,o.end),t.lineWidth=15,t.stroke()}},{key:"drawSludge",value:function(t,e,n,o,r,i){var a=this.orientationArr[i],s=void 0,f=void 0;if(t.beginPath(),"right"===o&&"bottomLeft"===a.corner&&(f=(s=1.5*Math.PI)+r),"down"===o&&"topLeft"===a.corner&&(s=0,f=r),"up"===o&&"bottomRight"===a.corner&&(f=(s=1*Math.PI)+r),"left"===o&&"topRight"===a.corner&&(f=(s=.5*Math.PI)+r),"up"===o&&"bottomLeft"===a.corner&&(f=(s=0*Math.PI)-r),"left"===o&&"bottomRight"===a.corner&&(f=(s=1.5*Math.PI)-r),"right"===o&&"topLeft"===a.corner&&(f=(s=.5*Math.PI)-r),"down"===o&&"topRight"===a.corner&&(f=(s=1*Math.PI)-r),t.arc(e+a.offset_x,n+a.offset_y,this.radius,s,f),t.lineWidth=10,t.strokeStyle="#65FF00",t.stroke(),t.strokeStyle="#000000",!(r<.5*Math.PI))return{0:o,1:i,3:e+a.offset_x_2,4:n+a.offset_y_2};setTimeout(this.asyncDrawSludge,30,e,n,o,r+.5*Math.PI/200,i)}},{key:"asyncDrawSludge",value:function(t,e,n,o,r){this.drawSludge(this.ctx,t,e,n,o,r)}},{key:"validFlow",value:function(t){var e=void 0;switch(t){case"up":e="bottom";break;case"down":e="top";break;case"right":e="left";break;case"left":e="right"}var n=this.orientationArr[this.orientationIndex].openPoints;return console.log(n.includes(e)),n.includes(e)}},{key:"direction",value:function(t){var e=this.orientationArr[this.orientationIndex].corner;("topLeft"===e&&"down"===t||"bottomLeft"===e&&"up"===t)&&(this.outDir="left"),("topRight"===e&&"left"===t||"topLeft"===e&&"right"===t)&&(this.outDir="up"),("topRight"===e&&"down"===t||"bottomRight"===e&&"up"===t)&&(this.outDir="right"),("bottomLeft"===e&&"right"===t||"bottomRight"===e&&"left"===t)&&(this.outDir="down")}}]),t}();t.exports=r},function(t,e,n){"use strict";var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(0);var r=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.orientationIndex=Math.floor(5*Math.random()),this.radius=20,this.orientationArr=[{offset_x:0,offset_y:0,offset_x_2:25,offset_y_2:50,offset_x_3:50,offset_y_3:50,start_1:0,end_1:.5*Math.PI,start_2:Math.Pi,openPoints:["left","up"]},{offset_x:0,offset_y:0,offset_x_2:25,offset_y_2:50,offset_x_3:50,offset_y_3:50,start_1:0,end_1:2*Math.PI,start_2:1*Math.PI,end_2:2*Math.PI,openPoints:["left","down"]}]}return o(t,[{key:"draw",value:function(t,e,n){var o=this.orientationArr[this.orientationIndex];ctx.beginPath(),ctx.arc(t+o.offset_x_1,e+o.offset_y_1,25,o.start_1,o.end_1),ctx.moveTo(t+offset_x_2,e+offset_y_2),ctx.arc(t+offset_x_3,e+offset_y_3,25)}},{key:"validFlow",value:function(t){return this.orientationArr[this.orientationIndex].openPoints.includes(t)}},{key:"flowDirection",value:function(t){}},{key:"onClick",value:function(){index=(index+1)%orientationArr.length}}]),t}();t.exports=r},function(t,e,n){"use strict";var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(0);var r=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.orientationIndex=e,this.ctx=n,this.drawSludge=this.drawSludge.bind(this),this.asyncDrawSludge=this.asyncDrawSludge.bind(this),this.orientationArr=[{offset_x_1:25,offset_y_1:0,offset_x_2:25,offset_y_2:50,openPoints:["top","bottom"],corner:"upDown"},{offset_x_1:0,offset_y_1:25,offset_x_2:50,offset_y_2:25,openPoints:["left","right"],corner:"leftRight"}],this.corner=this.orientationArr[this.orientationIndex].corner,this.outPoint="",this.outDir="",this.startX=null,this.startY=null}return o(t,[{key:"draw",value:function(t,e,n){var o=this.orientationArr[this.orientationIndex];t.clearRect(e+1,n+1,49,49),t.beginPath(),t.moveTo(e+o.offset_x_1,n+o.offset_y_1),t.lineTo(e+o.offset_x_2,n+o.offset_y_2),t.lineWidth=15,t.stroke()}},{key:"drawSludge",value:function(t,e,n,o,r,i){var a=this.orientationArr[i],s=void 0;if("down"!==o&&"right"!==o||(s=r),"up"!==o&&"left"!==o||(s=50-r),t.beginPath(),"down"===o?(t.moveTo(e+a.offset_x_1,n+a.offset_y_1),t.lineTo(e+a.offset_x_2,n+s)):"up"===o?(t.moveTo(e+a.offset_x_2,n+a.offset_y_2),t.lineTo(e+a.offset_x_1,n+s)):"left"===o?(t.moveTo(e+a.offset_x_2,n+a.offset_y_2),t.lineTo(e+s,n+a.offset_y_1)):"right"===o&&(t.moveTo(e+a.offset_x_1,n+a.offset_y_1),t.lineTo(e+s,n+a.offset_y_2)),t.lineWidth=10,t.strokeStyle="#65FF00",t.stroke(),t.strokeStyle="#000000",!(r<50))return{0:o,1:i,3:e+a.offset_x_2,4:n+a.offset_y_2};setTimeout(this.asyncDrawSludge,30,e,n,o,r+.25,i)}},{key:"asyncDrawSludge",value:function(t,e,n,o,r){this.drawSludge(this.ctx,t,e,n,o,r)}},{key:"validFlow",value:function(t){var e=void 0;switch(t){case"up":e="bottom";break;case"down":e="top";break;case"right":e="left";break;case"left":e="right"}return this.orientationArr[this.orientationIndex].openPoints.includes(e)}},{key:"direction",value:function(t){"down"===t&&0===this.orientationIndex&&(this.outDir="down"),"up"===t&&0===this.orientationIndex&&(this.outDir="up"),"right"===t&&1===this.orientationIndex&&(this.outDir="right"),"left"===this.inDir&&1===this.orientationIndex&&(this.outDir="left")}}]),t}();t.exports=r},function(t,e,n){"use strict";var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(0);var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.ctx=e,this.drawSludge=this.drawSludge.bind(this),this.asyncDrawSludge=this.asyncDrawSludge.bind(this)}return o(t,[{key:"draw",value:function(t,e,n){t.clearRect(e+1,n+1,49,49),t.beginPath(),t.moveTo(e+25,n+0),t.lineTo(e+25,n+50),t.moveTo(e+0,n+25),t.lineTo(e+50,n+25),t.lineWidth=15,t.stroke()}},{key:"direction",value:function(t){return t}},{key:"drawSludge",value:function(t,e,n,o,r,i){var a=void 0,s=void 0,f=void 0,u=void 0,c=void 0;if("down"!==o&&"right"!==o||(a=r),"up"!==o&&"left"!==o||(a=50-r),"left"===o&&(s=50,u=a),"right"===o&&(s=0,u=a),"up"===o&&(f=50,c=a),"down"===o&&(f=0,c=newoffset),t.beginPath(),"up"!==o&&"down"!==o||(s=25,u=25),"left"!==o&&"right"!==o||(f=25,c=25),t.moveTo(e+s,n+f),t.lineTo(e+u,n+c),t.lineWidth=10,t.strokeStyle="#65FF00",t.stroke(),t.strokeStyle="#000000",!(r<50))return{0:o,1:i,3:e+u,4:n+c};setTimeout(this.asyncDrawSludge,30,e,n,o,r+.25,i)}},{key:"asyncDrawSludge",value:function(t,e,n,o,r){this.drawSludge(this.ctx,t,e,n,o,r)}}]),t}();t.exports=r},function(t,e,n){"use strict";var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}();n(1);var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.board=e,this.isGameOver=!1,this.start=this.start.bind(this),this.play=this.play.bind(this),this.dirString="",this.directionOptionsObj={right:0,down:1,left:2,up:3}}return o(t,[{key:"start",value:function(){this.dirString="0,0,50,250,300";(new Date).getTime();this.play(0)}},{key:"play",value:function(t){var e=this.board.findDirection(this.dirString),n=e[1],o=e[0];if(this.board.getValidFlow(o,n)){var r=this.board.fillPipes(o,n);console.log("nextShape:  ",r);var i=[this.directionOptionsObj[o]].concat(n.xRange).concat(n.yRange);this.dirString=i.join(",")}else console.log("game over")}}]),t}();t.exports=r}]);