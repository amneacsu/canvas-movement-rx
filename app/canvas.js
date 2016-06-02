let canvas, context;

const resize = function() {
  setTimeout(function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }, 10);
};

const init = function(selector, width, height) {
  console.info('init canvas');
  canvas = document.querySelector(selector);
  context = canvas.getContext('2d');
}

const update = function(state) {
  context.fillStyle = state.dot.fill;
  context.fillRect(state.dot.x, state.dot.y, state.dot.size, state.dot.size);
}

window.onresize = resize;

window.onload = function() {
  resize();
}

module.exports = {
  init,
  update
};
