// ─────────────────────────────────────────────
// CONSTANTS  (never change)
// ─────────────────────────────────────────────
const COLS  = 6;
const ROWS  = 10;
const SPEED = 600;


// ─────────────────────────────────────────────
// COLOR MAP
//   Every number has its own background color.
//   Same number → always same color, everywhere on the board.
//   To change a color, just edit the value here.
// ─────────────────────────────────────────────
const COLORS = {
  2    : "#a8edea",   // soft teal
  4    : "#fed6e3",   // soft pink
  8    : "#f9ca24",   // yellow
  16   : "#f0932b",   // orange
  32   : "#eb4d4b",   // red
  64   : "#6ab04c",   // green
  128  : "#e056fd",   // purple
  256  : "#686de0",   // indigo
  512  : "#30336b",   // dark navy
  1024 : "#130f40",   // very dark
  2048 : "#f9ca24",   // gold (reuse yellow for top tier)
};

// If a value isn't in the map, use this fallback
const DEFAULT_COLOR = "#cccccc";


// ─────────────────────────────────────────────
// GAME STATE  (changes as the game runs)
// ─────────────────────────────────────────────
let grid       = [];
let current    = {};
let nextValue  = 0;
let score      = 0;
let gameLoop   = null;
let gameActive = false;

// While a merge animation is playing, pause the game tick
let isMerging  = false;

// Which cells are currently glowing/animating
let mergingCells = new Set();


// ─────────────────────────────────────────────
// HELPER: sleep(ms)
//   Pauses an async function for `ms` milliseconds.
//   await sleep(350) → just waits 350ms, then continues.
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
    row:   0,
    col:   col
  };

  nextValue = randomValue();

  // Also color the "Next" preview label
  const nextEl = document.getElementById("next-value");
  nextEl.textContent        = nextValue;
  nextEl.style.background   = COLORS[nextValue] || DEFAULT_COLOR;
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
// ─────────────────────────────────────────────
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
// LAND BLOCK  (async so it can await animations)
// ─────────────────────────────────────────────
async function landBlock() {
  isMerging = true;

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

  await sleep(200);
  mergingCells.clear();
  render();

  isMerging = false;
}


// ─────────────────────────────────────────────
// MERGE FROM  (async — animates each merge step)
//
//   Each merge:
//     1. update the grid data
//     2. highlight the merged cell  → render()
//     3. await sleep(350)           ← player sees the glow
//     4. clear highlight            → render()
//     5. check for next merge
// ─────────────────────────────────────────────
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
// GET COLOR
//   Simple lookup: check the COLORS map for this value.
//   If not found, return the default grey.
// ─────────────────────────────────────────────
function getColor(value) {
  return COLORS[value] || DEFAULT_COLOR;
}


// ─────────────────────────────────────────────
// KEYBOARD CONTROLS
// ─────────────────────────────────────────────
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
//   For every cell that has a value, we call getColor(value)
//   and apply it as an inline background style.
//   That's the only addition from before.
// ─────────────────────────────────────────────
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

  score      = 0;
  isMerging  = false;
  gameActive = true;
  nextValue  = randomValue();

  updateScore();
  spawnBlock();
  render();

  gameLoop = setInterval(tick, SPEED);
}


startGame();