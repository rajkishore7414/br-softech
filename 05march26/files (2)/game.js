// ─────────────────────────────────────────────
//  SETTINGS  (never change → const)
// ─────────────────────────────────────────────
const COLS  = 6;
const ROWS  = 10;
const SPEED = 600; // ms per gravity tick

// ─────────────────────────────────────────────
//  GAME STATE  (change during game → let)
// ─────────────────────────────────────────────
let grid       = [];   // 2D array, 0 = empty
let current    = {};   // the falling block { value, row, col }
let nextValue  = 0;
let score      = 0;
let gameLoop   = null;
let gameActive = false;

// ─────────────────────────────────────────────
//  1. CREATE EMPTY GRID
// ─────────────────────────────────────────────
function createGrid() {
  grid = [];
  for (let r = 0; r < ROWS; r++) {
    grid[r] = [];
    for (let c = 0; c < COLS; c++) {
      grid[r][c] = 0;  // 0 means empty
    }
  }
}

// ─────────────────────────────────────────────
//  2. PICK A RANDOM VALUE  (powers of 2)
// ─────────────────────────────────────────────
function randomValue() {
  const choices = [2, 2, 2, 4, 4, 8];
  return choices[ Math.floor(Math.random() * choices.length) ];
}

// ─────────────────────────────────────────────
//  3. SPAWN A NEW FALLING BLOCK
// ─────────────────────────────────────────────
function spawnBlock() {
  const col = Math.floor(Math.random() * COLS);

  if (grid[0][col] !== 0) {
    endGame();
    return;
  }

  current = {
    value : nextValue,
    row   : 0,
    col   : col
  };

  nextValue = randomValue();
  document.getElementById('next-value').textContent = nextValue;
}

// ─────────────────────────────────────────────
//  4. CAN THE BLOCK MOVE TO (row, col)?
// ─────────────────────────────────────────────
function canMoveTo(row, col) {
  if (col < 0 || col >= COLS) return false; // hit a wall
  if (row >= ROWS)            return false; // hit the floor
  if (grid[row][col] !== 0)   return false; // cell is occupied
  return true;
}

// ─────────────────────────────────────────────
//  5. GRAVITY TICK  (called every SPEED ms)
// ─────────────────────────────────────────────
function tick() {
  if (canMoveTo(current.row + 1, current.col)) {
    current.row++;
    render();
  } else {
    landBlock();
  }
}

// ─────────────────────────────────────────────
//  6. PLACE BLOCK INTO THE GRID
// ─────────────────────────────────────────────
function landBlock() {
  grid[current.row][current.col] = current.value;

  mergeColumn(current.col);
  updateScore();
  spawnBlock();
  render();
}

// ─────────────────────────────────────────────
//  7. MERGE LOGIC
//     scan bottom→top, merge equal neighbours,
//     repeat until nothing changes (chain!)
// ─────────────────────────────────────────────
function mergeColumn(col) {
  let merged = true;

  while (merged) {
    merged = false;

    for (let row = ROWS - 1; row > 0; row--) {
      const bottom = grid[row][col];
      const above  = grid[row - 1][col];

      if (bottom !== 0 && bottom === above) {
        grid[row][col]     = bottom * 2;
        grid[row - 1][col] = 0;
        score += grid[row][col];

        compactColumn(col);
        merged = true;
        break;
      }
    }
  }
}

// ─────────────────────────────────────────────
//  8. COMPACT A COLUMN
//     after a merge removes a cell, blocks above
//     must fall down to fill the empty space
// ─────────────────────────────────────────────
function compactColumn(col) {
  const values = [];
  for (let r = 0; r < ROWS; r++) {
    if (grid[r][col] !== 0) {
      values.push(grid[r][col]);
    }
  }

  const emptyRows = ROWS - values.length;
  for (let r = 0; r < ROWS; r++) {
    grid[r][col] = r < emptyRows ? 0 : values[r - emptyRows];
  }
}





// ─────────────────────────────────────────────
//  9. KEYBOARD CONTROLS  (arrow function)
// ─────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (!gameActive) return;

  if (e.key === 'ArrowLeft' || e.key === 'a') {
    if (canMoveTo(current.row, current.col - 1)) {
      current.col--;
      render();
    }
  }

  if (e.key === 'ArrowRight' || e.key === 'd') {
    if (canMoveTo(current.row, current.col + 1)) {
      current.col++;
      render();
    }
  }

  if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 's') {
    hardDrop();
  }
});

function hardDrop() {
  while (canMoveTo(current.row + 1, current.col)) {
    current.row++;
  }
  landBlock();
  render();
}

// ─────────────────────────────────────────────
//  10. RENDER  (draw everything on screen)
// ─────────────────────────────────────────────
function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {

      const div = document.createElement('div');
      div.className = 'cell';

      if (r === current.row && c === current.col) {
        div.textContent = current.value;
        div.classList.add('falling');
      } else if (grid[r][c] !== 0) {
        div.textContent = grid[r][c];
        div.classList.add('placed');
      }

      board.appendChild(div);
    }
  }
}

// ─────────────────────────────────────────────
//  11. SCORE
// ─────────────────────────────────────────────
function updateScore() {
  document.getElementById('score').textContent = score;
}

// ─────────────────────────────────────────────
//  12. GAME OVER
// ─────────────────────────────────────────────
function endGame() {
  gameActive = false;
  clearInterval(gameLoop);
  alert('Game Over! Your score: ' + score);
}


// ─────────────────────────────────────────────
//  13. START GAME
// ─────────────────────────────────────────────
function startGame() {
  clearInterval(gameLoop);

  createGrid();
  score      = 0;
  gameActive = true;
  nextValue  = randomValue();

  updateScore();
  spawnBlock();
  render();

  gameLoop = setInterval(tick, SPEED);
}

// auto-start on page load
startGame();
