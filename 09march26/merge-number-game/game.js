
// // ─────────────────────────────────────────────
// //  SETTINGS  (never change → const)
// // ─────────────────────────────────────────────
// const COLS  = 6;
// const ROWS  = 10;
// const SPEED = 600; // ms per gravity tick

// // ─────────────────────────────────────────────
// //  GAME STATE  (change during game → let)
// // ─────────────────────────────────────────────
// let grid       = [];   // 2D array, 0 = empty
// let current    = {};   // the falling block { value, row, col }
// let nextValue  = 0;
// let score      = 0;
// let gameLoop   = null;
// let gameActive = false;

// // ─────────────────────────────────────────────
// //  1. CREATE EMPTY GRID
// // ─────────────────────────────────────────────
// function createGrid() {
//   grid = [];
//   for (let r = 0; r < ROWS; r++) {
//     grid[r] = [];
//     for (let c = 0; c < COLS; c++) {
//       grid[r][c] = 0;  // 0 means empty
//     }
//   }
// }

// // ─────────────────────────────────────────────
// //  2. PICK A RANDOM VALUE  (powers of 2)
// // ─────────────────────────────────────────────
// function randomValue() {
//   const choices = [2, 2, 2, 4, 4, 8];
//   return choices[Math.floor(Math.random() * choices.length)];
// }

// // ─────────────────────────────────────────────
// //  3. SPAWN A NEW FALLING BLOCK
// // ─────────────────────────────────────────────
// function spawnBlock() {
//   const col = Math.floor(Math.random() * COLS);

//   if (grid[0][col] !== 0) {
//     endGame();
//     return;
//   }

//   current = {
//     value: nextValue,
//     row: 0,
//     col: col //THIS RIGHT SIDE col IS COMING FROM spawanBlock() fn
//   };

//   nextValue = randomValue();
//   document.getElementById('next-value').textContent = nextValue;
// }

// // ─────────────────────────────────────────────
// //  4. CAN THE BLOCK MOVE TO (row, col)?
// // ─────────────────────────────────────────────
// function canMoveTo(row, col) {
//   if (col < 0 || col >= COLS) return false; // hit a wall
//   if (row >= ROWS) return false; // hit the floor
//   if (grid[row][col] !== 0) return false; // cell is occupied
//   return true;
// }

// // ─────────────────────────────────────────────
// //  5. GRAVITY TICK  (called every SPEED ms)
// // ─────────────────────────────────────────────
// function tick() {
//   if (canMoveTo(current.row + 1, current.col)) {
//     current.row++;
//     render();
//   } else {
//     landBlock();
//   }
// }

// // ─────────────────────────────────────────────
// //  6. PLACE BLOCK INTO THE GRID
// // ─────────────────────────────────────────────
// function landBlock() {
//   grid[current.row][current.col] = current.value;

//   mergeAll();
//   updateScore();
//   spawnBlock();
//   render();
// }

// // ─────────────────────────────────────────────
// //  7. MERGE LOGIC (rows + columns)
// //     but after horizontal merges,
// //     apply vertical compaction only
// // ─────────────────────────────────────────────
// function mergeAll() {
//   let changed = true;

//   while (changed) {
//     changed = false;

//     // Merge columns
//     for (let c = 0; c < COLS; c++) {
//       for (let r = ROWS - 1; r > 0; r--) {
//         const bottom = grid[r][c];
//         const above = grid[r - 1][c];
//         if (bottom !== 0 && bottom === above) {
//           grid[r][c] = bottom * 2;
//           grid[r - 1][c] = 0;
//           score += grid[r][c];
//           compactColumn(c);
//           changed = true;
//         }
//       }
//     }

//     // Merge rows (horizontal merges only combine cells, no horizontal shift!)
//     for (let r = 0; r < ROWS; r++) {
//       for (let c = 0; c < COLS - 1; c++) {
//         const left = grid[r][c];
//         const right = grid[r][c + 1];
//         if (left !== 0 && left === right) {
//           grid[r][c] = left * 2;
//           grid[r][c + 1] = 0;
//           score += grid[r][c];
//           // After horizontal merge, compact vertically affected columns
//           compactColumn(c);
//           compactColumn(c + 1);
//           changed = true;
//         }
//       }
//     }
//   }
// }

// // ─────────────────────────────────────────────
// //  8. COMPACT A COLUMN (blocks fall down)
// // ─────────────────────────────────────────────
// function compactColumn(col) {
//   const values = [];
//   for (let r = 0; r < ROWS; r++) {
//     if (grid[r][col] !== 0) values.push(grid[r][col]);
//   }
//   const emptyRows = ROWS - values.length;
//   for (let r = 0; r < ROWS; r++) {
//     grid[r][col] = r < emptyRows ? 0 : values[r - emptyRows];
//   }
// }

// // ─────────────────────────────────────────────
// //  9. KEYBOARD CONTROLS  (arrow function)
// // ─────────────────────────────────────────────
// document.addEventListener('keydown', (e) => {
//   if (!gameActive) return;

//   if (e.key === 'ArrowLeft' || e.key === 'a') {
//     if (canMoveTo(current.row, current.col - 1)) {
//       current.col--;
//       render();
//     }
//   }

//   if (e.key === 'ArrowRight' || e.key === 'd') {
//     if (canMoveTo(current.row, current.col + 1)) {
//       current.col++;
//       render();
//     }
//   }

//   if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 's') {
//     hardDrop();
//   }
// });

// function hardDrop() {
//   while (canMoveTo(current.row + 1, current.col)) {
//     current.row++;
//   }
//   landBlock();
//   render();
// }

// // ─────────────────────────────────────────────
// //  10. RENDER  (draw everything on screen)
// // ─────────────────────────────────────────────
// function render() {
//   const board = document.getElementById('board');
//   board.innerHTML = '';

//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {
//       const div = document.createElement('div');
//       div.className = 'cell';

//       if (r === current.row && c === current.col) {
//         div.textContent = current.value;
//         div.classList.add('falling');
//       } else if (grid[r][c] !== 0) {
//         div.textContent = grid[r][c];
//         div.classList.add('placed');
//       }

//       board.appendChild(div);
//     }
//   }
// }

// // ─────────────────────────────────────────────
// //  11. SCORE
// // ─────────────────────────────────────────────
// function updateScore() {
//   document.getElementById('score').textContent = score;
// }

// // ─────────────────────────────────────────────
// //  12. GAME OVER
// // ─────────────────────────────────────────────
// function endGame() {
//   gameActive = false;
//   clearInterval(gameLoop);
//   alert('Game Over! Your score: ' + score);
// }

// // ─────────────────────────────────────────────
// //  13. START GAME
// // ─────────────────────────────────────────────
// function startGame() {
//   clearInterval(gameLoop);

//   createGrid();
//   score = 0;
//   gameActive = true;
//   nextValue = randomValue();

//   updateScore();
//   spawnBlock();
//   render();

//   gameLoop = setInterval(tick, SPEED);
// }

// // auto-start on page load
// startGame();

















//


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
  // const choices = [2,4,8,16]
  return choices[Math.floor(Math.random()*choices.length)];
}

// ─────────────────────────────────────────────
// SPAWN BLOCK
// ─────────────────────────────────────────────
function spawnBlock() {

  const col = Math.floor(Math.random()*COLS);

  if(grid[0][col] !== 0){
    endGame();
    return;
  }

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
// LAND BLOCK
// ─────────────────────────────────────────────
function landBlock(){

  grid[current.row][current.col] = current.value;

  mergeFrom(current.row,current.col);

  updateScore();

  spawnBlock();

  render();

}

// ─────────────────────────────────────────────
// MERGE STARTING FROM LANDING CELL
// ─────────────────────────────────────────────
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