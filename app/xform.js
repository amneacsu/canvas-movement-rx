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
const translateBackArr = function(v, x, y) {
  return [
    x + v[0],
    y + v[1]
  ];
}

const reduceTo = function(v, dist) {
  var x = v[0] * (dist / v[2]);
  var y = v[1] * (dist / v[2]);

  return [x, y, dist];
}

const rotateVector = function(v, angle) {
  const x = v[0];
  const y = v[1];
  const d = v[2];

  const newVector = [
    x * Math.cos(angle) - y * Math.sin(angle),
    x * Math.sin(angle) + y * Math.cos(angle),
    d
  ];
  return newVector;
};

const appToCanvas = function(appState) {
  const dot = {
    x: appState.dot.x,
    y: appState.dot.y,
    size: 15,
    fill: '#f00'
  };

  //TODO: set the size according to dist

  const reticle = {
    x: appState.mouse.x,
    y: appState.mouse.y,
    size: 20,
    fill: '#ddd'
  };

  const vector = getVector(appState.dot.x, appState.dot.y, appState.mouse.x, appState.mouse.y);
  const reduced = reduceTo(vector, 100); //length
  const flashlightEnd = translateBack(reduced, appState.dot.x, appState.dot.y);

  const flashlight = {
    x1: appState.dot.x,
    y1: appState.dot.y,
    x2: flashlightEnd.x,
    y2: flashlightEnd.y,
    stroke: 'hsla(300, 80%, 50%, 1)'
  };

  // gradient cone
  const gradientCone = ((flashlight)=>{
    const cone = {
      origin: [0, 0],
      left: [0, 0],
      right: [0, 0],
      normal: [flashlight.x2, flashlight.y2]
    };
    cone.origin = [flashlight.x1, flashlight.y1];

    const flashVector = getVector(flashlight.x1, flashlight.y1, flashlight.x2, flashlight.y2);
    const leftVector = translateBackArr(rotateVector(flashVector, 0.3), flashlight.x1, flashlight.y1);
    const rightVector = translateBackArr(rotateVector(flashVector, -0.3), flashlight.x1, flashlight.y1);
    cone.left = leftVector;
    cone.right = rightVector;

    return cone;

  })(flashlight);

  const projectiles = appState.projectiles.map((p) => {
    const dirV = getVector(...p.coords, p.dir);
    const x = dirV[0] * (p.ticks/100);
    const y = dirV[1] * (p.ticks/100);
    return [x, y];
  });




  const canvasState = {
    dot,
    reticle,
    flashlight,
    gradientCone,
    projectiles
  };

  return canvasState;
};

module.exports = {
  appToCanvas
};
