const canvas = require('./canvas');
const xform = require('./xform');
const modifiers = require('./modifiers');

const w = 600, h = 600;

let frameTime;

let state = {
  dot: {
    x: w / 2,
    y: h / 2
  },
  mouse: {
    x: 100,
    y: 100
  },
  move: {
    left: false,
    right: false,
    top: false,
    bottom: false
  }
};

//setup events
modifiers.events(state);

const tick = function() {
  const newFrameTime = performance.now();
  const frameTimeDiff = newFrameTime - frameTime;

  const newState = modifiers.update(state, frameTimeDiff);

  canvas.update(xform.appToCanvas(newState));
  window.requestAnimationFrame(tick);

  state = newState;
  frameTime = newFrameTime;
}

canvas.init('#canvas', w, h);
frameTime = performance.now();
tick();
