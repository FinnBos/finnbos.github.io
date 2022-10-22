let grid;
let grid_new;
let score=0;
let hardcore=false;
let n=0;

function setup() {
  n=5;
  createCanvas(n*100, n*100);
  noLoop();
  hardcore=true;
  grid = blankGrid(hardcore);
  console.table(grid);
  grid_new = blankGrid(hardcore);
  addNumber();
  addNumber();
  updateCanvas();
}

function updateCanvas() {
  background(255);
  drawGrid();
  select('#score').html(score);
}

function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;

  switch (keyCode) {
    case DOWN_ARROW:
      //do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);  
      flipped = true;
      rotated = true;
      break;
      case 72:
      if(hardcore == true){
        hardcore = false;
        console.log("Mode Hardcore désactive !")
      } 
      else{
        hardcore = true;
        console.log("Mode Hardcore activé !");
      }
      played = false;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < n; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compareGrid(past, grid);
    if(flipped){
      grid = flipGrid(grid);
    }
    if(rotated){
      grid = transposeGrid(grid);
    }
    if (changed) addNumber();
    if(hardcore==true) addNumber();
    updateCanvas();
    console.log("Score : "+score);
  }
}

function drawGrid() {
  background(255);
  let w = 100;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) {
        stroke(200, 0, 200);
        strokeWeight(3);
        grid_new[i][j] = 0;
      } else {
        strokeWeight(1);
        stroke(0);
      }
      if (val != 0) {
        fill(colorsSizes[s].color);
      } else {
        noFill();
      }
      rect(i * w, j * w, w, w,10);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
