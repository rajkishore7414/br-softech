
const rows = 8;
const cols = 6;
let grid = [];
let currentTile = null;
let score = 0;
let dropInterval = 600;
let gameOver = false;

const gameDiv = document.getElementById("game");
const scoreDiv = document.getElementById("score");

function initGrid() {
    grid = [];
    gameDiv.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(0);
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${r}-${c}`;
            gameDiv.appendChild(cell);
        }
        grid.push(row);
    }
}

function spawnTile() {
    let value = Math.random() < 0.5 ? 2 : 4;
    let col = Math.floor(cols / 2);
    if (grid[0][col] !== 0) {
        alert("Game Over!");
        gameOver = true;
        return;
    }
    currentTile = { row: 0, col: col, value: value };
}

function canMove(row, col) {
    if (row >= rows) return false;
    if (col < 0 || col >= cols) return false;
    if (grid[row][col] !== 0) return false;
    return true;
}

function lockTile() {
    grid[currentTile.row][currentTile.col] = currentTile.value;
    merge(currentTile.row, currentTile.col);
    currentTile = null;
}

function merge(startRow, startCol) {
    let queue = [{row: startRow, col: startCol}];
    let visited = new Set();

    while (queue.length > 0) {
        let {row, col} = queue.shift();
        let value = grid[row][col];
        let key = row + "-" + col;
        if (visited.has(key)) continue;
        visited.add(key);

        let directions = [
            [0,1],[0,-1],[1,0],[-1,0]
        ];

        for (let [dr, dc] of directions) {
            let nr = row + dr;
            let nc = col + dc;
            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                grid[nr][nc] === value
            ) {
                grid[nr][nc] = 0;
                grid[row][col] *= 2;
                score += grid[row][col];
                queue.push({row: row, col: col});
            }
        }
    }
}

function moveDown() {
    if (!currentTile) return;

    if (canMove(currentTile.row + 1, currentTile.col)) {
        currentTile.row++;
    } else {
        lockTile();
        spawnTile();
    }
}

function render() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = document.getElementById(`cell-${r}-${c}`);
            cell.textContent = "";
            cell.classList.remove("tile");

            if (grid[r][c] !== 0) {
                cell.textContent = grid[r][c];
                cell.classList.add("tile");
            }
        }
    }

    if (currentTile) {
        let cell = document.getElementById(
            `cell-${currentTile.row}-${currentTile.col}`
        );
        cell.textContent = currentTile.value;
        cell.classList.add("tile");
    }

    scoreDiv.textContent = "Score: " + score;
}

function gameLoop() {
    if (gameOver) return;
    moveDown();
    render();
    setTimeout(gameLoop, dropInterval);
}

document.addEventListener("keydown", e => {
    if (!currentTile) return;

    if (e.key === "ArrowLeft") {
        if (canMove(currentTile.row, currentTile.col - 1))
            currentTile.col--;
    }
    if (e.key === "ArrowRight") {
        if (canMove(currentTile.row, currentTile.col + 1))
            currentTile.col++;
    }
    if (e.key === "ArrowDown") {
        moveDown();
    }
    render();
});

initGrid();
spawnTile();
gameLoop();
