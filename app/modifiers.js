const playerSpeed = 50; // px / s

const events  = (state) => {
  //setup keyboard events
  document.addEventListener('keydown', (event) => {
    switch(event.key){
      case 'a':
        state.move.left = true;
        break;
      case 's':
        state.move.bottom = true;
        break;
      case 'd':
        state.move.right = true;
        break;
      case 'w':
        state.move.top = true;
        break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch(event.key){
      case 'a':
        state.move.left = false;
        break;
      case 's':
        state.move.bottom = false;
        break;
      case 'd':
        state.move.right = false;
        break;
      case 'w':
        state.move.top = false;
        break;
    }
  });
};

const update = (state, diff) => {
  const movement = playerSpeed / 1000 * diff;

  newState = Object.assign({}, state);
  const dot = Object.assign({}, state.dot);
  //handle movement
  if (state.move.left && !state.move.right) {
    dot.x = dot.x - movement;
  }
  if (state.move.right && !state.move.left) {
    dot.x = dot.x + movement;
  }
  if (state.move.top && !state.move.bottom) {
    dot.y = dot.y - movement;
  }
  if (state.move.bottom && !state.move.top) {
    dot.y = dot.y + movement;
  }
  newState.dot = dot;

  return newState;
};

module.exports = {
  events,
  update
}