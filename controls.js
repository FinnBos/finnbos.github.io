function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function slide(row) {
  let arr = row.filter((val) => val);
  let missing = n - arr.length;
  let zeros = Array(missing).fill(0);
  arr = zeros.concat(arr);
  return arr;
}

function combine(row) {
  for (let i = n-1; i >= 1; i--) {
    let a = row[i];
    let b = row[i - 1];
    if (a == b) {
      row[i] = a + b;
      score = score + row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

function isGameOver() {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 0) {
        return false;
      }
      if (i !== n-1 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== n-1 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}