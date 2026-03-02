const player = document.getElementById("player");
const game = document.getElementById("game");

const gameWidth = game.clientWidth;
const gameHeight = game.clientHeight;

// const gameWidth = window.innerWidth;
// const gameHeight = window.innerHeight;

const playerWidth = 75;
const playerHeight = 75;

const coinWidth = 40;
const coinHeight = 40;

let playerX = 100;
let playerY = 100;
let speed = 5;

// NEW - store coin objects with position + speed
const coinObjects = [];

// --- FUNCTIONS ---

function updatePlayerPosition() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}

function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}

function createCoin(x, y) {
    const coin = document.createElement("img");
    coin.src = "images/coin.png";
    coin.classList.add("coin");
    coin.style.left = x + "px";
    coin.style.top = y + "px";
    game.appendChild(coin);
    return coin;
}

// --- PLAYER MOVEMENT ---

document.addEventListener("keydown", function(event) {

    if (event.key === "w") playerY -= speed;
    if (event.key === "s") playerY += speed;
    if (event.key === "a") playerX -= speed;
    if (event.key === "d") playerX += speed;

    // Boundary control
    if (playerX < 0) playerX = 0;
    if (playerY < 0) playerY = 0;
    if (playerX > gameWidth - playerWidth)  playerX = gameWidth - playerWidth;
    if (playerY > gameHeight - playerHeight) playerY = gameHeight - playerHeight;

    updatePlayerPosition();
});

// --- SPAWN COIN EVERY 1 SECOND ---

setInterval(function() {
    const x = getRandomPosition(gameWidth - coinWidth);
    const y = getRandomPosition(gameHeight - coinHeight);

    const coinEl = createCoin(x, y);

    // store the coin with its position and a random speed
    coinObjects.push({
        element: coinEl,
        x: x,
        y: y,
        speedX: (Math.random() * 4) - 2,  // random between -2 and 2
        speedY: (Math.random() * 3) + 1   // always moving downward
    });

}, 100);

// --- GAME LOOP (runs 60 times per second) ---

function gameLoop() {

    // loop backwards (safe when removing items)
    for (let i = coinObjects.length - 1; i >= 0; i--) {
        const coin = coinObjects[i];

        // MOVE the coin
        coin.x += coin.speedX;
        coin.y += coin.speedY;

        // UPDATE its position on screen
        coin.element.style.left = coin.x + "px";
        coin.element.style.top  = coin.y + "px";

        // CHECK if coin is off screen
        const isOffScreen = coin.x < -coinWidth  ||
                            coin.x > gameWidth   ||
                            coin.y < -coinHeight ||
                            coin.y > gameHeight;

        if (isOffScreen) {
            coin.element.remove();     // remove from DOM
            coinObjects.splice(i, 1);  // remove from array
        }
    }

    requestAnimationFrame(gameLoop); // keep the loop going
}

// --- START THE GAME ---
updatePlayerPosition();
requestAnimationFrame(gameLoop);