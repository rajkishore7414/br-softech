// // Step 1 — the board size
// const COLS = 6;
// const ROWS = 10;

// // Step 2 — the grid is just an empty array for now
// let grid = [];

// // Step 3 — fill the grid with zeros
// function createGrid() {
//   grid = [];

//   for (let r = 0; r < ROWS; r++) {
//     grid[r] = [];                      // create each row as an empty array

//     for (let c = 0; c < COLS; c++) {
//       grid[r][c] = 0;                  // 0 means empty cell
//     }
//   }
// }

// // Step 4 — draw the grid on screen
// function render() {
//   const board = document.getElementById('board');
//   board.innerHTML = '';               // clear everything first

//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {

//       const div = document.createElement('div');
//       div.className = 'cell';

//       // if cell has a value, show it — right now everything is 0 so nothing shows
//       if (grid[r][c] !== 0) {
//         div.textContent = grid[r][c];
//       }

//       board.appendChild(div);
//     }
//   }
// }

// // Step 5 — run both functions
// createGrid();
// render();
// // ```

// // ---

// // ## What Each Part Does

// // **`createGrid()`** — builds this in memory:
// // ```
// // grid[0] = [0, 0, 0, 0, 0, 0]   ← row 0 (top)
// // grid[1] = [0, 0, 0, 0, 0, 0]
// // grid[2] = [0, 0, 0, 0, 0, 0]
// // ...
// // grid[9] = [0, 0, 0, 0, 0, 0]   ← row 9 (bottom)





// ─────────────────────────────────────────────
//  SETTINGS
// ─────────────────────────────────────────────
const COLS  = 6;
const ROWS  = 10;
const SPEED = 600; // one step every 600ms

// ─────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────
let grid    = [];
let current = {};   // NEW — the falling block
let gameLoop = null; // NEW — holds the setInterval

// ─────────────────────────────────────────────
//  1. CREATE GRID  (same as Stage 1)
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
//  2. SPAWN — create the falling block
// ─────────────────────────────────────────────
function spawnBlock() {
  current = {
    value : 2,    // hardcoded for now, always 2
    row   : 0,    // starts at the top
    col   : 3     // starts in the middle column
  };
}

// ─────────────────────────────────────────────
//  3. CAN THE BLOCK MOVE TO THIS POSITION?
// ─────────────────────────────────────────────
function canMoveTo(row, col) {
  if (col < 0 || col >= COLS) return false;  // hit left or right wall
  if (row >= ROWS)            return false;  // hit the floor
  if (grid[row][col] !== 0)   return false;  // cell already occupied
  return true;                               // all clear!
}

// ─────────────────────────────────────────────
//  4. TICK — called every 600ms (gravity)
// ─────────────────────────────────────────────
function tick() {
  // can the block move one row down?
  if (canMoveTo(current.row + 1, current.col)) {
    current.row++;   // yes → move it down
    render();
  } else {
    // no → it hit the floor or another block
    // Stage 3 will handle this — for now just stop
    clearInterval(gameLoop);
    console.log('Block landed at row:', current.row);
  }
}

// ─────────────────────────────────────────────
//  5. RENDER — draw grid + falling block
// ─────────────────────────────────────────────
function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      const div = document.createElement('div');
      div.className = 'cell';

      // NEW — is this cell where the falling block is?
      if (r === current.row && c === current.col) {
        div.textContent = current.value;
        div.classList.add('falling');        // yellow highlight
      }
      // same as Stage 1 — show placed blocks
      else if (grid[r][c] !== 0) {
        div.textContent = grid[r][c];
      }

      board.appendChild(div);
    }
  }
}

// ─────────────────────────────────────────────
//  6. START
// ─────────────────────────────────────────────
createGrid();
spawnBlock();
render();

gameLoop = setInterval(tick, SPEED);  // gravity starts here