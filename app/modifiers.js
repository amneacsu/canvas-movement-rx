const playerSpeed = 100; // px / s

const events  = (state) => {
  //add projectile at click
  document.addEventListener('click', (e) => {
    state.projectiles.push({
      empty: true
    });
    console.log(state.projectiles.length);
  });
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

  let newState = Object.assign({}, state);
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

  //handle projectiles
  console.log(state.projectiles.length);
  const projectiles = state.projectiles.map((p) => {
    if (p.empty) {
      p.coords = [dot.x, dot.y];
      p.dir = [state.mouse.x, state.mouse.y];
      p.empty = false;
      p.ticks = 0;
    }
    else {
      p.ticks++;
    }
    return p;
  }).filter((p) => {
    const r = p.ticks < 100;
    if (!r) {
      ///debugger;
    }
    return r;
  });

  newState.projectiles = projectiles;

  return newState;
};

module.exports = {
  events,
  update
}