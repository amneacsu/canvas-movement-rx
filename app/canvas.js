let canvas, context;

const resize = function() {
  setTimeout(function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }, 10);
};

const clear = function() {
  const coords = [0, 0, canvas.width, canvas.height];
  context.clearRect(...coords);
}

const init = function(selector, width, height) {
  console.info('init canvas');
  canvas = document.querySelector(selector);
  context = canvas.getContext('2d');
}

const update = function(state) {
  clear();

  context.fillStyle = state.dot.fill;
  context.fillRect(state.dot.x, state.dot.y, state.dot.size, state.dot.size);

  context.fillStyle = 'magenta';
  context.fillRect(state.mouse.x, state.mouse.y, state.mouse.size, state.mouse.size);

  context.beginPath();
  context.moveTo(state.flashlight.x1, state.flashlight.y1);
  context.lineTo(state.flashlight.x2, state.flashlight.y2);

  context.lineWidth = 4;
  context.strokeStyle = state.flashlight.stroke;
  context.stroke();
}

window.onresize = resize;

window.onload = function() {
  resize();
}

module.exports = {
  init,
  update
};
