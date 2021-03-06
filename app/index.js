const canvas = require('./canvas');
const xform = require('./xform');
const modifiers = require('./modifiers');
//const modifiers = require('./modifiers-rx.js');

const w = 600, h = 600;
const frameCap = 60;

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
  },
  projectiles: [
  ]
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

window.onmousemove = function(e) {
  state.mouse.x = e.pageX;
  state.mouse.y = e.pageY;
}

//setInterval(function() {
//  canvas.update(xform.appToCanvas(newState));
//}, 1000 / frameCap);
