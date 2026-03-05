// ── CONSTANTS ─────────────────────────────────────────
const COLS  = 6;   // board width
const ROWS  = 10;  // board height
const SPEED = 600; // milliseconds per drop tick

// ── THE GRID ──────────────────────────────────────────
// A 2D array: grid[row][col]
// 0 = empty, any other number = a block with that value
let grid = [];

function createGrid() {
  grid = [];
  for (let row = 0; row < ROWS; row++) {
    grid[row] = [];                     // create each row
    for (let col = 0; col < COLS; col++) {
      grid[row][col] = 0;              // fill with 0 (empty)
    }
  }
}

// The falling block — just 2 pieces of info!
let current = {
  value: 2,   // what number is this block?
  col:   2,   // which column is it in?
  row:   0,   // which row is it currently at?
};







function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';  // clear everything

  // Loop through every row and column
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {

      const div = document.createElement('div');
      div.className = 'cell';

      // Is this cell the falling block's current position?
      if (row === current.row && col === current.col) {
        div.textContent = current.value;  // show falling block
        div.classList.add('falling');     // style it differently
      }
      // Otherwise, show whatever is in the grid array
      else if (grid[row][col] !== 0) {
        div.textContent = grid[row][col]; // show placed block
      }

      board.appendChild(div);
    }
  }
}




// Possible values — weighted toward small numbers
const VALUES = [2, 2, 2, 4, 4, 8, 16];
//              ↑ more 2s = they appear more often

function spawnBlock() {
  // Pick a random value from the array
  const val = VALUES[Math.floor(Math.random() * VALUES.length)];

  // Pick a random column (0 to COLS-1)
  const col = Math.floor(Math.random() * COLS);

  current = {
    value: val,
    col:   col,
    row:   0,   // always starts at top
  };

  // 💀 GAME OVER CHECK: if the spawn spot is already taken
  if (grid[0][col] !== 0) {
    endGame();  // no room at top = game over
  }
}




let gameLoop = null;

function startGame() {
  createGrid();
  spawnBlock();
  render();

  // This runs every SPEED milliseconds = gravity!
  gameLoop = setInterval(tick, SPEED);
}

function tick() {
  // Try to move block one row down
  if (canMoveTo(current.row + 1, current.col)) {
    current.row++;     // move it down
    render();
  } else {
    // Can't go further — place it!
    landBlock();
  }
}







function canMoveTo(row, col) {
  // 1. Check LEFT/RIGHT wall boundaries
  if (col < 0 || col >= COLS) return false;

  // 2. Check FLOOR — has it hit the bottom?
  if (row >= ROWS) return false;

  // 3. Check if another block is already there
  if (grid[row][col] !== 0) return false;

  // All clear!
  return true;
}

function landBlock() {
  // Place the block into the grid array
  grid[current.row][current.col] = current.value;

  // Try to merge (see next step!)
  tryMerge(current.row, current.col);

  // Spawn the next block
  spawnBlock();
  render();
}











function tryMerge(row, col) {
  // Look at the cell directly BELOW this one
  const belowRow = row + 1;

  // Safety checks: is there a row below? Is it occupied?
  if (belowRow >= ROWS) return;              // we're at the floor
  if (grid[belowRow][col] === 0) return;      // cell below is empty

  // 🎯 Do the values MATCH?
  if (grid[row][col] === grid[belowRow][col]) {

    // MERGE! Double the current cell's value
    grid[row][col] *= 2;

    // Remove the cell below (it got absorbed)
    grid[belowRow][col] = 0;

    // ADD SCORE!
    score += grid[row][col];

    // ⭐ KEY: now the merged cell might be floating in air!
    // Drop it down to where it should be
    applyGravityToColumn(col);

    // ⭐ CHAIN REACTION: check if the new position
    // also needs to merge with what's below it
    tryMergeWholeColumn(col);
  }
}

// After merges create gaps, blocks fall down to fill them
function applyGravityToColumn(col) {
  // Collect all non-zero values in this column
  let values = [];
  for (let row = 0; row < ROWS; row++) {
    if (grid[row][col] !== 0) {
      values.push(grid[row][col]);
    }
  }

  // Refill column: empty at top, values at bottom
  for (let row = 0; row < ROWS; row++) {
    const offset = ROWS - values.length;
    grid[row][col] = row < offset ? 0 : values[row - offset];
  }
}

// Scan column bottom-to-top and merge any matches
function tryMergeWholeColumn(col) {
  let merged = true;
  while (merged) {             // keep looping until no more merges
    merged = false;
    for (let row = ROWS - 1; row > 0; row--) {
      if (grid[row][col] !== 0 &&
          grid[row][col] === grid[row-1][col]) {
        grid[row][col] *= 2;
        grid[row-1][col] = 0;
        score += grid[row][col];
        applyGravityToColumn(col);
        merged = true;  // found a merge, loop again
        break;          // restart the scan from bottom
      }
    }
  }
}







document.addEventListener('keydown', (e) => {
  if (!gameActive) return;  // ignore if game is over

  switch(e.key) {

    case 'ArrowLeft':
      if (canMoveTo(current.row, current.col - 1)) {
        current.col--;  // move one column left
        render();
      }
      break;

    case 'ArrowRight':
      if (canMoveTo(current.row, current.col + 1)) {
        current.col++;  // move one column right
        render();
      }
      break;

    case 'ArrowDown':
    case ' ':           // Space bar
      hardDrop();       // instant drop!
      break;
  }
});

function hardDrop() {
  // Keep moving down until we can't
  while (canMoveTo(current.row + 1, current.col)) {
    current.row++;
  }
  // Now it's as low as it can go — land it!
  landBlock();
  render();
}







let gameActive = false;

function spawnBlock() {
  const col = Math.floor(Math.random() * COLS);

  // 💀 Is row 0 of this column already taken?
  if (grid[0][col] !== 0) {
    endGame();
    return;
  }

  current = { value: randomValue(), col, row: 0 };
}

function endGame() {
  gameActive = false;
  clearInterval(gameLoop);  // stop the gravity loop
  showGameOverScreen();
}