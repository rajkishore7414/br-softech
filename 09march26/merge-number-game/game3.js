//this variables will not change through out the program
const COLS  = 6;
const ROWS  = 10;
const SPEED = 600;


//this varibales will change/update throughout the program
let grid = [];
let current = {};
let nextValue = 0;
let score = 0;
let gameLoop = null;
let gameActive = false;

// Track which cells just merged
let mergingCells = new Set();


// this fn createGrid will create empty array memory reference in the game
function createGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = 0;
    }
  }
}


//this fn will select random value from an array
function randomValue() {
  const choices = [2,2,2,4,4,8];
  return choices[Math.floor(Math.random()*choices.length)];
}



// this fn reates a new falling block at the top of the board.
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


//this fn will check rows and cols bounds
function canMoveTo(row,col){

  if(col < 0 || col >= COLS) return false;
  if(row >= ROWS) return false;
  if(grid[row][col] !== 0) return false;

  return true;
}


// ─────────────────────────────────────────────
// TICK (FIXED FUNCTION)
// ─────────────────────────────────────────────
function tick(){

  if(!gameActive) return;

  if(canMoveTo(current.row+1,current.col)){
    current.row++;
    render();
  }
  else{
    landBlock();
  }

}



// this fn is checking gameover condition
function checkGameOver(){

  for(let c=0;c<COLS;c++){
    if(grid[0][c] !== 0){
      endGame();
      return true;
    }
  }

  return false;
}


//this fn blocks 
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

  setTimeout(() => {
    mergingCells.clear();
    render();
  }, 400);

}


// merge logic
function mergeFrom(row,col){

  let changed = true;

  while(changed){

    changed = false;

    // vertical merge
    if(row+1 < ROWS && grid[row][col] === grid[row+1][col] && grid[row][col] !== 0){

      grid[row+1][col] *= 2;
      score += grid[row+1][col];

      grid[row][col] = 0;

      compactColumn(col);

      row++;

      mergingCells.add(`${row},${col}`);

      changed = true;
    }

    // horizontal merge left
    if(col-1 >= 0 && grid[row][col] === grid[row][col-1] && grid[row][col] !== 0){

      grid[row][col] *= 2;
      score += grid[row][col];

      grid[row][col-1] = 0;

      compactColumn(col-1);
      compactColumn(col);

      mergingCells.add(`${row},${col}`);

      changed = true;
    }

    // horizontal merge right
    if(col+1 < COLS && grid[row][col] === grid[row][col+1] && grid[row][col] !== 0){

      grid[row][col] *= 2;
      score += grid[row][col];

      grid[row][col+1] = 0;

      compactColumn(col+1);
      compactColumn(col);

      mergingCells.add(`${row},${col}`);

      changed = true;
    }

  }

}


// frees the merged space
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


// key controls
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


// render board
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

        if(mergingCells.has(`${r},${c}`)){
          div.classList.add("merging");
        }

      }

      board.appendChild(div);

    }

  }

}


// score
function updateScore(){
  document.getElementById("score").textContent=score;
}


//game over
function endGame(){

  gameActive=false;

  clearInterval(gameLoop);

  alert("Game Over! Score: "+score);

}


// start game
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