const size = 20;
const half = size / 2;

const appToCanvas = function(appState) {
  const dot = {
    x: appState.dot.x - half,
    y: appState.dot.y - half,
    size,
    fill: '#f00'
  };

  return {
    dot
  };
}

module.exports = {
  appToCanvas
};
