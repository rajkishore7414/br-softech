
// these variable will remain constant in the whole game. 
const COLS  = 6; // grid col
const ROWS  = 10; //grid row
const SPEED = 600; // falling speed passed inside setInterval fn



// here we done color mamping, for each number,
//new upated feature added in the game, every new block has quniue color,
const COLORS = {
  2    : "#a8edea", 
  4    : "#fed6e3",   
  8    : "#f9ca24",  
  16   : "#f0932b",   
  32   : "#eb4d4b",   
  64   : "#6ab04c",   
  128  : "#e056fd",   
  256  : "#686de0",   
  512  : "#30336b",   
  1024 : "#130f40",   
  2048 : "#f9ca24",   
};

// If a value isn't in the map, use this fallback
const DEFAULT_COLOR = "#cccccc";





//these are initial game state. 
let grid       = [];
let current    = {}; //most imp 
let nextValue  = 0;
let score      = 0;
let gameLoop   = null;
let gameActive = false;

// While a merge animation is playing, pause the game tick
let isMerging  = false;



// Which cells are currently glowing/animating
//why Set ? because it stores, uique no
let mergingCells = new Set();


// this fn creates a delay in so that animation could happen

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



// this fn creates 2d grid in the memory.
function createGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = 0;
    }
  }
}


// this fn will give random value from an array, that will fall from the top
function randomValue() {
  const choices = [2, 2, 2, 4, 4, 8];
  return choices[Math.floor(Math.random() * choices.length)];
}

// in whcih col the falling block should fall, 
function spawnBlock() {
  let possibleCols = [];

  for (let c = 0; c < COLS; c++) {
    if (grid[0][c] === 0) possibleCols.push(c);
  }

  if (possibleCols.length === 0) {
    endGame();
    return;
  }






  const col = possibleCols[Math.floor(Math.random() * possibleCols.length)];


  // that,object stores the state (value and position) of the currently falling block.
  current = {
    value: nextValue, // this value will come from an array
    row:   0, // starting row falling postion of the number
    col:   col
  };

  nextValue = randomValue();

  // Also color the "Next" preview label
  const nextEl = document.getElementById("next-value");
  nextEl.textContent        = nextValue;
  nextEl.style.background   = COLORS[nextValue] || DEFAULT_COLOR;
}


// this fn will control the movement of the block which controls the movements
function canMoveTo(row, col) {
  if (col < 0 || col >= COLS) return false;
  if (row >= ROWS)             return false;
  if (grid[row][col] !== 0)    return false;
  return true;
}


// imp/ this fn will called by setInterval, 
function tick() {
  if (!gameActive) return;
  if (isMerging)   return;   // wait for animation to finish

  if (canMoveTo(current.row + 1, current.col)) {
    current.row++;
    render();
  } else {
    landBlock();
  }
}


// this fn will check the gameover condition
function checkGameOver() {
  for (let c = 0; c < COLS; c++) {
    if (grid[0][c] !== 0) {
      endGame();
      return true;
    }
  }
  return false;
}




// why we do made this fn async, so that it can wait for animations.
async function landBlock() {
  isMerging = true; // it means merge is happeing /and it will stop the tick fn 500ms 

  grid[current.row][current.col] = current.value;

  await mergeFrom(current.row, current.col);

  updateScore();

  if (checkGameOver()) {
    render();
    isMerging = false;
    return;
  }

  spawnBlock();
  render();

//mergingCells-> a Set that stores which cells are glowing/animating
  await sleep(200);
  mergingCells.clear(); // clear the set.
  render();

  isMerging = false;
}


/*
this is the core logic of merge which is implented using loop/ 
// MERGE FROM  (async — animates each merge step)
//
//   Each merge:
 1. update the grid data
 2. highlight the merged cell  → render()
 3. await sleep(350)           ← player sees the glow
 4. clear highlight            → render()
 5. check for next merge
*/
async function mergeFrom(row, col) {
  let changed = true;

  while (changed) {
    changed = false;

    // ── vertical merge ──
    if (
      row + 1 < ROWS &&
      grid[row][col] !== 0 &&
      grid[row][col] === grid[row + 1][col]
    ) {
      grid[row + 1][col] *= 2;
      score += grid[row + 1][col];
      grid[row][col] = 0;

      compactColumn(col);
      row++;

      mergingCells.add(`${row},${col}`);
      render();
      await sleep(350);
      mergingCells.clear();
      render();

      changed = true;
    }

    // ── horizontal merge LEFT ──
    if (
      col - 1 >= 0 &&
      grid[row][col] !== 0 &&
      grid[row][col] === grid[row][col - 1]
    ) {
      grid[row][col] *= 2;
      score += grid[row][col];
      grid[row][col - 1] = 0;

      compactColumn(col - 1);
      compactColumn(col);

      mergingCells.add(`${row},${col}`);
      render();
      await sleep(350);
      mergingCells.clear();
      render();

      changed = true;
    }

    // ── horizontal merge RIGHT ──
    if (
      col + 1 < COLS &&
      grid[row][col] !== 0 &&
      grid[row][col] === grid[row][col + 1]
    ) {
      grid[row][col] *= 2;
      score += grid[row][col];
      grid[row][col + 1] = 0;

      compactColumn(col + 1);
      compactColumn(col);

      mergingCells.add(`${row},${col}`);
      render();
      await sleep(350);
      mergingCells.clear();
      render();

      changed = true;
    }
  }
}




// this fn, fill the gaps which is created from the merging.
function compactColumn(col) {
  const values = [];

  for (let r = 0; r < ROWS; r++) {
    if (grid[r][col] !== 0) values.push(grid[r][col]);
  }

  const empty = ROWS - values.length;

  for (let r = 0; r < ROWS; r++) {
    grid[r][col] = r < empty ? 0 : values[r - empty];
  }
}


// ─────────────────────────────────────────────
// GET COLOR
//   Simple lookup: check the COLORS map for this value.
//   If not found, return the default grey.
// ─────────────────────────────────────────────
function getColor(value) {
  return COLORS[value] || DEFAULT_COLOR;
}




//keyboard controls using events
document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (isMerging)   return;

  if (e.key === "ArrowLeft" || e.key === "a") {
    if (canMoveTo(current.row, current.col - 1)) {
      current.col--;
      render();
    }
  }

  if (e.key === "ArrowRight" || e.key === "d") {
    if (canMoveTo(current.row, current.col + 1)) {
      current.col++;
      render();
    }
  }

  if (e.key === "ArrowDown" || e.key === " " || e.key === "s") {
    hardDrop();
  }
});


// fall at once
function hardDrop() {
  if (isMerging) return;

  while (canMoveTo(current.row + 1, current.col)) {
    current.row++;
  }

  landBlock();
  render();
}



// this fn, is drawing the everthing on the screen, from the greed.
function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      const div = document.createElement("div");
      div.className = "cell";

      if (r === current.row && c === current.col) {

        // ── falling block ──
        div.textContent       = current.value;
        div.style.background  = getColor(current.value);
        div.classList.add("falling");

      } else if (grid[r][c] !== 0) {

        // ── placed block ──
        div.textContent       = grid[r][c];
        div.style.background  = getColor(grid[r][c]);
        div.classList.add("placed");

        if (mergingCells.has(`${r},${c}`)) {
          div.classList.add("merging");
        }

      }

      board.appendChild(div);
    }
  }
}

// updates the score
function updateScore() {
  document.getElementById("score").textContent = score;
}



function endGame() {
  gameActive = false;
  clearInterval(gameLoop);
  alert("Game Over! Score: " + score);
}


// this fn will start the game.
function startGame() {
  clearInterval(gameLoop);
  createGrid();

  score      = 0;
  isMerging  = false;
  gameActive = true;
  nextValue  = randomValue();

  updateScore();
  spawnBlock();
  render();

  gameLoop = setInterval(tick, SPEED);
}

// at last we are calling the fn
startGame();