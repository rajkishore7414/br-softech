const COLS = 10;
const ROWS = 16;

const gridEl = document.getElementById('grid');

// Build the 2D array — ROWS rows, each with COLS zeros
let grid = [];

for (let r = 0; r < ROWS; r++) {
  grid[r] = [];
  for (let c = 0; c < COLS; c++) {
    grid[r][c] = 0; //sabhi mae zero aa gaya
    console.log(grid[r][c]);
  }
}

for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = r;
    cell.dataset.col = c;
    gridEl.appendChild(cell);
  }
}

//this fn is our connector 
function renderGrid() {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (grid[r][c] === 0) {
        cell.textContent = '';
        cell.style.background = '#222';
      } else {
        cell.textContent = grid[r][c];
        cell.style.background = '#e67e22';
      }
    }
  }
}






// renderGrid();

let activeBlock = {
  value: 2,
  col: 4,
  row: 0 //se 0th row se giregi
};

function renderActiveBlock() {
  const cell = document.querySelector(`[data-row="${activeBlock.row}"][data-col="${activeBlock.col}"]`);
  cell.textContent = activeBlock.value;
  cell.style.background = '#3498db';
}

renderGrid();
renderActiveBlock();





function moveBlock(direction) {
  if (direction === 'left' && activeBlock.col > 0) {
    activeBlock.col -= 1;
  } else if (direction === 'right' && activeBlock.col < COLS - 1) {
    activeBlock.col += 1;
  }
  renderGrid();
  renderActiveBlock();
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowLeft')  moveBlock('left');
  if (e.key === 'ArrowRight') moveBlock('right');
});






function fallTick() {
  activeBlock.row += 1;
  renderGrid();
  renderActiveBlock();
}

console.log(activeBlock.row)

const fallInterval = setInterval(fallTick, 500);




////
function hasLanded() {
  const atBottom = activeBlock.row === ROWS - 1;
  const blockedBelow = grid[activeBlock.row + 1] && 
                       grid[activeBlock.row + 1][activeBlock.col] !== 0;
  return atBottom || blockedBelow;
}

// function landBlock() {
//   grid[activeBlock.row][activeBlock.col] = activeBlock.value;
//   activeBlock = { value: 2, col: 4, row: 0 };
// }

function landBlock() {
  grid[activeBlock.row][activeBlock.col] = activeBlock.value;
  mergeRow(activeBlock.row);
  activeBlock = { value: 2, col: 4, row: 0 };
}

// this fn will run every 500ms because of setInterval
function fallTick() {
  if (hasLanded()) {
    landBlock();
  } else {
    activeBlock.row += 1;
  }
  renderGrid();
  renderActiveBlock();
}


// function mergeRow(row) {
//   for (let c = 0; c < COLS - 1; c++) {
//     if (grid[row][c] !== 0 && grid[row][c] === grid[row][c + 1]) {
//       grid[row][c] = grid[row][c] * 2;
//       grid[row][c + 1] = 0;
//     }
//   }
// }


function mergeRow(row) {
  let merged = true;

  while (merged) {
    merged = false;

    for (let c = 0; c < COLS - 1; c++) {
      if (grid[row][c] !== 0 && grid[row][c] === grid[row][c + 1]) {
        grid[row][c] = grid[row][c] * 2;
        grid[row][c + 1] = 0;
        merged = true;
      }
    }
  }
}