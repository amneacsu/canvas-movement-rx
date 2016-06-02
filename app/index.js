const w = 600, h = 600;
const canvas = require('./canvas');
const xform = require('./xform');

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
  canvas.update(xform.appToCanvas(state));
  window.requestAnimationFrame(tick);
}

canvas.init('#canvas', w, h);
tick();
