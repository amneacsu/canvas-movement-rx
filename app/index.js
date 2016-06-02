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

//setup keyboard events
document.addEventListener('keydown', (event) => {
  console.log('keydown');
});

document.addEventListener('keypress', (event) => {
  console.log('keypressed');
});

const tick = function() {
  const newFrameTime = performance.now();
  const frameTimeDiff = newFrameTime - frameTime;



  canvas.update(xform.appToCanvas(state));
  window.requestAnimationFrame(tick);

  frameTime = newFrameTime;
}

canvas.init('#canvas', w, h);
frameTime = performance.now();
tick();
