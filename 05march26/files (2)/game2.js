// settings (never change - t)
const COLS = 6;
const ROWS = 10;
const SPEED = 600; //this is the falling speed;

// ________________


// game state ( change during game - using let)
let grid =[]; // to represent 2-d grid
let current = {};
let nextValue = 0;
let score = 0; //game score
let gameLoop = null;
let gameActive = false;


// creating empty grid
function createGrid() {
    grid = [];
    for(let r =0; r < ROWS; r++) {
        grid[r] = [];
        for(let c = 0; c < COLS; c++) {
            grid[r][c] =0; // sab mae 0 fill kar rahe hai
        }
    }
}


// pick randdom value;

function randomValue() {
    const choices = [2,2,2,4,4,8];
    return choices[Math.floor(Math.random() * choices.length)] //ye choices arr mae se koi ek return karega
};



function spawnBlock() {
    const col = Math.floor(Math.random() * COLS);

    if(grid[0][col !==0]) {
        endGame();
        return;
    }

    current = {
        value : nextValue,
        row : 0,
        col : col
    };


    nextValue = randomValue();
    document.getElementById('next-value').textContent = nextValue;
}


function canMoveTo(row, col) {
  if (col < 0 || col >= COLS) return false; // hit a wall
  if (row >= ROWS)            return false; // hit the floor
  if (grid[row][col] !== 0)   return false; // cell is occupied
  return true;
}



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



function updateScore() {
  document.getElementById('score').textContent = score;
}




function endGame() {
  gameActive = false;
  clearInterval(gameLoop);
  alert('Game Over! Your score: ' + score);
}



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















