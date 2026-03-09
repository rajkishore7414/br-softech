
// these variable will remain constant in the whole game. 
const COLS  = 6; // grid col
const ROWS  = 10; //grid row
const SPEED = 600; // falling speed passed inside setInterval fn


//these are initial game state. 
let grid       = [];
let current    = {}; //most imp 
let nextValue  = 0;
let score      = 0;
let gameLoop   = null;
let gameActive = false;

// NEW: while a merge animation is playing, we pause the game tick
let isMerging = false;

// Which cells are currently glowing/animating
let mergingCells = new Set();


// ─────────────────────────────────────────────
// HELPER: sleep(ms)
//   Returns a Promise that resolves after `ms` milliseconds.
//   Using `await sleep(300)` inside an async function
//   simply pauses that function for 300 ms — like a built-in delay.
// ─────────────────────────────────────────────
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// ─────────────────────────────────────────────
// CREATE GRID
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
  const choices = [2, 2, 2, 4, 4, 8];
  return choices[Math.floor(Math.random() * choices.length)];
}


// ─────────────────────────────────────────────
// SPAWN BLOCK
// ─────────────────────────────────────────────
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

  current = {
    value: nextValue,
    row: 0,
    col: col
  };

  nextValue = randomValue();
  document.getElementById("next-value").textContent = nextValue;
}


// ─────────────────────────────────────────────
// CAN MOVE TO
// ─────────────────────────────────────────────
function canMoveTo(row, col) {
  if (col < 0 || col >= COLS) return false;
  if (row >= ROWS)             return false;
  if (grid[row][col] !== 0)    return false;
  return true;
}


// ─────────────────────────────────────────────
// TICK  — called by setInterval every SPEED ms
//   NEW: skips if a merge animation is in progress
// ─────────────────────────────────────────────
function tick() {
  if (!gameActive) return;
  if (isMerging)   return;   // ← wait for animation to finish

  if (canMoveTo(current.row + 1, current.col)) {
    current.row++;
    render();
  } else {
    landBlock();
  }
}


// ─────────────────────────────────────────────
// CHECK GAME OVER
// ─────────────────────────────────────────────
function checkGameOver() {
  for (let c = 0; c < COLS; c++) {
    if (grid[0][c] !== 0) {
      endGame();
      return true;
    }
  }
  return false;
}


// ─────────────────────────────────────────────
// LAND BLOCK  (now async so it can await merges)
// ─────────────────────────────────────────────
async function landBlock() {
  // Lock the tick loop so gravity doesn't fire mid-animation
  isMerging = true;

  grid[current.row][current.col] = current.value;

  // Wait for ALL merge animations to finish (could be a chain!)
  await mergeFrom(current.row, current.col);

  updateScore();

  if (checkGameOver()) {
    render();
    isMerging = false;
    return;
  }

  spawnBlock();
  render();

  // Small pause so the last merge glow is still visible after spawn
  await sleep(200);
  mergingCells.clear();
  render();

  // Unlock the tick loop — gravity resumes
  isMerging = false;
}


// ─────────────────────────────────────────────
// MERGE FROM  (now async — the key change!)
//
//   Before: every merge happened instantly in one loop.
//   After:  each merge step does:
//             1. highlight the merging cell  → render()
//             2. await sleep(350)            ← player sees the glow
//             3. clear highlight             → render()
//             4. then check for the next merge
// ─────────────────────────────────────────────
async function mergeFrom(row, col) {
  let changed = true;

  while (changed) {
    changed = false;

    // ── vertical merge (block above falls onto block below) ──
    if (
      row + 1 < ROWS &&
      grid[row][col] !== 0 &&
      grid[row][col] === grid[row + 1][col]
    ) {
      grid[row + 1][col] *= 2;
      score += grid[row + 1][col];
      grid[row][col] = 0;

      compactColumn(col);
      row++;                            // track where the merged value ended up

      // ── ANIMATION STEP ──
      mergingCells.add(`${row},${col}`);
      render();                         // show the glow
      await sleep(500);                 // wait so the player can see it
      mergingCells.clear();
      render();                         // remove the glow before next check

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

      // ── ANIMATION STEP ──
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

      // ── ANIMATION STEP ──
      mergingCells.add(`${row},${col}`);
      render();
      await sleep(350);
      mergingCells.clear();
      render();

      changed = true;
    }
  }
}


// ─────────────────────────────────────────────
// COMPACT COLUMN  — pull values down, fill top with zeros
// ─────────────────────────────────────────────
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
// KEYBOARD CONTROLS
// ─────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (!gameActive) return;
  if (isMerging)   return;   // ignore input while animating

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


function hardDrop() {
  if (isMerging) return;

  while (canMoveTo(current.row + 1, current.col)) {
    current.row++;
  }

  landBlock();
  render();
}


// ─────────────────────────────────────────────
// RENDER
// ─────────────────────────────────────────────
function render() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const div = document.createElement("div");
      div.className = "cell";

      if (r === current.row && c === current.col) {
        div.textContent = current.value;
        div.classList.add("falling");
      } else if (grid[r][c] !== 0) {
        div.textContent = grid[r][c];
        div.classList.add("placed");

        if (mergingCells.has(`${r},${c}`)) {
          div.classList.add("merging");
        }
      }

      board.appendChild(div);
    }
  }
}


// ─────────────────────────────────────────────
// SCORE
// ─────────────────────────────────────────────
function updateScore() {
  document.getElementById("score").textContent = score;
}


// ─────────────────────────────────────────────
// GAME OVER
// ─────────────────────────────────────────────
function endGame() {
  gameActive = false;
  clearInterval(gameLoop);
  alert("Game Over! Score: " + score);
}


// ─────────────────────────────────────────────
// START GAME
// ─────────────────────────────────────────────
function startGame() {
  clearInterval(gameLoop);
  createGrid();

  score     = 0;
  isMerging = false;
  gameActive = true;
  nextValue  = randomValue();

  updateScore();
  spawnBlock();
  render();

  gameLoop = setInterval(tick, SPEED);
}


startGame();