// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────
const COLS  = 6;
const ROWS  = 10;
const SPEED = 600;

// ─────────────────────────────────────────────
// GAME STATE
// ─────────────────────────────────────────────
let grid = [];
let current = {};
let nextValue = 0;
let score = 0;
let gameLoop = null;
let gameActive = false;

// ─────────────────────────────────────────────
// CREATE EMPTY GRID
// ─────────────────────────────────────────────
function createGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = 0;
    }
  }
}

// ─────────────────────────────────────────────
// RANDOM VALUE
// ─────────────────────────────────────────────
function randomValue() {
  const choices = [2,2,2,4,4,8];
  return choices[Math.floor(Math.random()*choices.length)];
}

// ─────────────────────────────────────────────
// SPAWN BLOCK
// ─────────────────────────────────────────────
function spawnBlock(){

  let possibleCols = [];

  for(let c=0;c<COLS;c++){
    if(grid[0][c] === 0){
      possibleCols.push(c);
    }
  }

  if(possibleCols.length === 0){
    endGame();
    return;
  }

  const col = possibleCols[Math.floor(Math.random()*possibleCols.length)];

  current = {
    value: nextValue,
    row: 0,
    col: col
  };

  nextValue = randomValue();
  document.getElementById("next-value").textContent = nextValue;

}

// ─────────────────────────────────────────────
// MOVE CHECK
// ─────────────────────────────────────────────
function canMoveTo(row,col){

  if(col < 0 || col >= COLS) return false;
  if(row >= ROWS) return false;
  if(grid[row][col] !== 0) return false;

  return true;
}

// ─────────────────────────────────────────────
// GRAVITY
// ─────────────────────────────────────────────
function tick(){

  if(canMoveTo(current.row+1,current.col)){
    current.row++;
    render();
  }
  else{
    landBlock();
  }

}

// ─────────────────────────────────────────────
// CHECK GAME OVER
// ─────────────────────────────────────────────
function checkGameOver(){

  for(let c=0;c<COLS;c++){
    if(grid[0][c] !== 0){
      endGame();
      return true;
    }
  }

  return false;

}

// ─────────────────────────────────────────────
// LAND BLOCK
// ─────────────────────────────────────────────
function landBlock(){

  grid[current.row][current.col] = current.value;

  mergeFrom(current.row,current.col);

  updateScore();

  if(checkGameOver()){
    render();
    return;
  }

  spawnBlock();

  render();

}

// ─────────────────────────────────────────────
// MERGE STARTING FROM LANDING CELL
// ─────────────────────────────────────────────
function mergeFrom(row,col){

  let changed = true; //it keeps track of merge happening. 

  while(changed){

    changed = false;

    // vertical merge
    if(row+1 < ROWS && grid[row][col] === grid[row+1][col] && grid[row][col] !== 0){

      grid[row+1][col] *= 2;
      score += grid[row+1][col];

      grid[row][col] = 0;

      compactColumn(col);

      row++;

      changed = true;
    }

    // horizontal merge left
    if(col-1 >= 0 && grid[row][col] === grid[row][col-1] && grid[row][col] !== 0){

      grid[row][col] *= 2;
      score += grid[row][col];

      grid[row][col-1] = 0;

      compactColumn(col-1);
      compactColumn(col);

      changed = true;
    }

    // horizontal merge right
    if(col+1 < COLS && grid[row][col] === grid[row][col+1] && grid[row][col] !== 0){

      grid[row][col] *= 2;
      score += grid[row][col];

      grid[row][col+1] = 0;

      compactColumn(col+1);
      compactColumn(col);

      changed = true;
    }

  }

}

// ─────────────────────────────────────────────
// COLUMN GRAVITY
// ─────────────────────────────────────────────
function compactColumn(col){

  const values = [];

  for(let r=0;r<ROWS;r++){
    if(grid[r][col] !== 0){
      values.push(grid[r][col]);
    }
  }

  const empty = ROWS - values.length;

  for(let r=0;r<ROWS;r++){
    grid[r][col] = r < empty ? 0 : values[r-empty];
  }

}

// ─────────────────────────────────────────────
// CONTROLS
// ─────────────────────────────────────────────
document.addEventListener("keydown",(e)=>{

  if(!gameActive) return;

  if(e.key==="ArrowLeft" || e.key==="a"){

    if(canMoveTo(current.row,current.col-1)){
      current.col--;
      render();
    }

  }

  if(e.key==="ArrowRight" || e.key==="d"){

    if(canMoveTo(current.row,current.col+1)){
      current.col++;
      render();
    }

  }

  if(e.key==="ArrowDown" || e.key===" " || e.key==="s"){
    hardDrop();
  }

});

function hardDrop(){

  while(canMoveTo(current.row+1,current.col)){
    current.row++;
  }

  landBlock();
  render();

}

// ─────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────
function render(){

  const board = document.getElementById("board");

  board.innerHTML="";

  for(let r=0;r<ROWS;r++){

    for(let c=0;c<COLS;c++){

      const div = document.createElement("div");

      div.className="cell";

      if(r===current.row && c===current.col){

        div.textContent=current.value;
        div.classList.add("falling");

      }
      else if(grid[r][c]!==0){

        div.textContent=grid[r][c];
        div.classList.add("placed");

      }

      board.appendChild(div);

    }

  }

}

// ─────────────────────────────────────────────
// SCORE
// ─────────────────────────────────────────────
function updateScore(){
  document.getElementById("score").textContent=score;
}

// ─────────────────────────────────────────────
// GAME OVER
// ─────────────────────────────────────────────
function endGame(){

  gameActive=false;

  clearInterval(gameLoop);

  alert("Game Over! Score: "+score);

}

// ─────────────────────────────────────────────
// START GAME
// ─────────────────────────────────────────────
function startGame(){

  clearInterval(gameLoop);

  createGrid();

  score=0;

  gameActive=true;

  nextValue=randomValue();

  updateScore();

  spawnBlock();

  render();

  gameLoop=setInterval(tick,SPEED);

}

startGame();