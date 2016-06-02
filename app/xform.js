const size = 20;
const half = size / 2;

const distance = function(x, y) {
  return Math.sqrt((x * x) + (y * y));
};

const getVector = function(x1, y1, x2, y2) {
  return [x2 - x1, y2 - y1, distance(x2 - x1, y2 - y1)];
}

const translateBack = function(v, x, y) {
  return {
    x: x + v[0],
    y: y + v[1]
  };
}

const reduceTo = function(v, dist) {
  var x = v[0] * (dist / v[2]);
  var y = v[1] * (dist / v[2]);

  return [x, y, dist];
}

const appToCanvas = function(appState) {
  const dot = {
    x: appState.dot.x - half,
    y: appState.dot.y - half,
    size,
    fill: '#f00'
  };

  const mouse = {
    x: appState.mouse.x,
    y: appState.mouse.y,
    size: 10
  };

  const vector = getVector(appState.dot.x, appState.dot.y, appState.mouse.x, appState.mouse.y);
  const reduced = reduceTo(vector, 100); //length
  const flashlightEnd = translateBack(reduced, appState.dot.x, appState.dot.y);

  const flashlight = {
    x1: appState.dot.x,
    y1: appState.dot.y,
    x2: flashlightEnd.x,
    y2: flashlightEnd.y,
    stroke: '#0f0'
  };

  const canvasState = {
    dot,
    mouse,
    flashlight
  };

  return canvasState;
};

module.exports = {
  appToCanvas
};
