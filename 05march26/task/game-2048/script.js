const rows = 10;
const cols = 6;

const game = document.getElementById("game");


// this fn is just ui representation of the ui
function createBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `cell-${r}-${c}`;
            game.appendChild(cell);
        }
    }
}

createBoard();




// this is just memory representation of the grid thats all
let grid = [];

function initGridArray() {
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(0);
        }
        grid.push(row);
    }
}

initGridArray();


// grid[0][3] = 2; for testing purpose//
let currentTile = {
    row: 0,
    col: 3,
    value: 2
};

// function render() {
//     for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//             const cell = document.getElementById(`cell-${r}-${c}`);
//             cell.textContent = grid[r][c] === 0 ? "" : grid[r][c];
//         }
//     }
// }

// render();


function render() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.getElementById(`cell-${r}-${c}`);
            cell.textContent = grid[r][c] === 0 ? "" : grid[r][c];
        }
    }

    if (currentTile) {
        const cell = document.getElementById(
            `cell-${currentTile.row}-${currentTile.col}`
        );
        cell.textContent = currentTile.value;
    }
}

// render(); replacing the render with this below code
setInterval(() => {
    moveDown();
    render();
}, 500);


function canMoveDown() {
    if (currentTile.row + 1 >= rows) return false;
    if (grid[currentTile.row + 1][currentTile.col] !== 0) return false;
    return true;
}

function moveDown() {
    if (canMoveDown()) {
        currentTile.row++;
    } else {
        lockTile();
    }
}




function lockTile() {
    grid[currentTile.row][currentTile.col] = currentTile.value;
    currentTile = {
        row: 0,
        col: 3,
        value: 2
    };
}


document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        if (currentTile.col > 0 &&
            grid[currentTile.row][currentTile.col - 1] === 0) {
            currentTile.col--;
        }
    }

    if (e.key === "ArrowRight") {
        if (currentTile.col < cols - 1 &&
            grid[currentTile.row][currentTile.col + 1] === 0) {
            currentTile.col++;
        }
    }

    render();
});



function lockTile() {
    let r = currentTile.row;
    let c = currentTile.col;
    let value = currentTile.value;

    grid[r][c] = value;

    // check right
    if (c + 1 < cols && grid[r][c + 1] === value) {
        grid[r][c] *= 2;
        grid[r][c + 1] = 0;
    }

    currentTile = {
        row: 0,
        col: 3,
        value: 2
    };
}






function moveDown() {
    currentTile.row++;
}