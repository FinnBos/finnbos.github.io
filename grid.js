function blankGrid(hardcore) {
  if (hardcore == false)
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  else {
    return [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
  }
}

function addNumber() {
  let options = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        options.push({ x: i, y: j });
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options);
    let r = random(1);
    grid[spot.x][spot.y] = r > 0.5 ? 4 : 8;
    grid_new[spot.x][spot.y] = 1;
  }
}

function copyGrid(grid) {
  let extra = blankGrid();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      extra[i][j] = grid[i][j];
    }
  }
  return extra;
}

function compareGrid(a, b) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function flipGrid(grid) {
  for (let i = 0; i < n; i++) {
    grid[i].reverse();
  }
  return grid;
}

function transposeGrid(grid) {
  let newGrid = blankGrid();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}
