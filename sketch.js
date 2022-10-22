let grid;
let grid_new;
let score = 0;
let mode;
let n = 0;
let hardcore = false;
let buttonHardcore;

function setup() {
  createCanvas(500, 500);
  noLoop();

  buttonHardcore = createButton("Hardcore");
  buttonHardcore.position(0, 650);
  buttonHardcore.mousePressed(modeHardcore);
  buttonClassic = createButton("Classic");
  buttonClassic.position(100, 650);
  buttonClassic.mousePressed(modeClassic);
  button5x5 = createButton("5x5");
  button5x5.position(200, 650);
  button5x5.mousePressed(mode5x5);
  buttonReplay = createButton("Replay");
  buttonReplay.position(0,600);
  buttonReplay.mousePressed(startGame);
  buttonReplay.hide();

  //updateCanvas();
}
function startGame() {
  buttonReplay.hide();
  grid = blankGrid(mode);
  grid_new = blankGrid(mode);
  addNumber();
  addNumber();
  score = 0;
  updateCanvas();
}

function modeHardcore() {
  if (hardcore == false) {
    hardcore = true;
    buttonHardcore.style("background-color", "#FF0000");
  }
  else {
    buttonHardcore.style("background-color", "#9E9E9E");
    hardcore = false;
  }
}

function mode5x5() {
  mode = "5x5";
  n = 5;
  button5x5.hide();
  buttonClassic.show();
  startGame();
}
function modeClassic() {
  mode = "classic";
  n = 4;
  button5x5.show();
  buttonClassic.hide();
  startGame();
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score);
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
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < n; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compareGrid(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) addNumber();
    if (hardcore == true) addNumber();
    
    let gameover=isGameOver();
    if(gameover==true){
      console.log("Game Over !");
      buttonReplay.show();
    }
    
    updateCanvas();
    console.log("Score : " + score);
  }
}

function drawGrid() {
  background(255);
  let w = (500/n);
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
      rect(i * w, j * w, w, w, 25);
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
