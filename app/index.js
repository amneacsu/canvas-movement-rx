const canvas = require('./canvas');
const xform = require('./xform');

const w = 600, h = 600;
let frameTime;

const state = {
  dot: {
    x: w / 2,
    y: h / 2,
    o: 0
  },
  mouse: {
    x: 0,
    y: 0
  }
}

const tick = function() {
  let newFrameTime = performance.now();
  frameTime = newFrameTime;
  canvas.update(xform.appToCanvas(state, newFrameTime - frameTime));
  window.requestAnimationFrame(tick);
}

canvas.init('#canvas', w, h);
frameTime = performance.now();
tick();
