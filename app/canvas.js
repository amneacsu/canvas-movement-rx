let canvas, context;

const fadeRate = 20;

const resize = function() {
  setTimeout(function() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }, 10);
};

/*
const clear = function() {
  const coords = [0, 0, canvas.width, canvas.height];
  context.clearRect(...coords);
}
*/

const fade = function() {
  const lastImage = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixelData = lastImage.data;

  const len = pixelData.length;
  for (let i = 3; i < len; i += 4) {
    pixelData[i] -= fadeRate;
  }

  context.putImageData(lastImage, 0, 0);
}

const init = function(selector, width, height) {
  console.info('init canvas');
  canvas = document.querySelector(selector);
  context = canvas.getContext('2d');
}

const update = function(state) {
  fade();

  // Dot / player
  context.fillStyle = state.dot.fill;
  context.beginPath();
  context.arc(state.dot.x, state.dot.y, state.dot.size, 0, 2 * Math.PI);
  context.fill();

  // Flashlight
  context.beginPath();
  context.moveTo(state.flashlight.x1, state.flashlight.y1);
  context.lineTo(state.flashlight.x2, state.flashlight.y2);
  context.lineWidth = 4;
  context.strokeStyle = state.flashlight.stroke;
  context.stroke();

  // Reticle position
  context.lineWidth = 2;
  context.strokeStyle = state.reticle.fill;
  context.beginPath();
  context.arc(state.reticle.x, state.reticle.y, state.reticle.size, 0, 2 * Math.PI);
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
