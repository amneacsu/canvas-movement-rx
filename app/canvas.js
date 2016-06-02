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
  context.fillStyle = 'rgba(0, 0, 0, .3)';
  context.fillRect(...coords);
}

const init = function(selector, width, height) {
  console.info('init canvas');
  canvas = document.querySelector(selector);
  context = canvas.getContext('2d');
}

const update = function(state) {
  clear();



  // Flashlight
  context.beginPath();
  context.moveTo(state.flashlight.x1, state.flashlight.y1);
  context.lineTo(state.flashlight.x2, state.flashlight.y2);
  context.lineWidth = 2;
  context.strokeStyle = state.flashlight.stroke;
  context.stroke();

  // Reticle position
  context.lineWidth = 1;
  context.strokeStyle = state.reticle.fill;
  context.beginPath();
  context.arc(state.reticle.x, state.reticle.y, state.reticle.size, 0, 2 * Math.PI);
  context.stroke();

  //cone
  const cone = state.gradientCone;
  context.beginPath();
  context.moveTo(...cone.origin);
  context.lineTo(...cone.left);
  context.lineTo(...cone.right);
  const grad = context.createLinearGradient(...cone.origin, ...cone.normal);
  grad.addColorStop(0, 'hsla(300, 80%, 50%, 1)');
  grad.addColorStop(0.8, 'hsla(300, 100%, 80%, 0.1)');
  grad.addColorStop(1, 'hsla(300, 100%, 80%, 0)');
  context.fillStyle = grad;
  context.fill();

  // Dot / player
  context.fillStyle = state.dot.fill;
  context.beginPath();
  context.arc(state.dot.x, state.dot.y, state.dot.size, 0, 2 * Math.PI);
  context.fill();

  //projectiles
  //console.log('p', state.projectiles.length)
  state.projectiles.forEach((p) => {

  });
};

window.onresize = resize;

window.onload = function() {
  resize();
}

module.exports = {
  init,
  update
};
