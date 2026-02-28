
const player = document.getElementById("player");


const game = document.getElementById("game");
const gameWidth = game.clientWidth; //why we do this-> because it gives the actual positon of the game-conatiner in pixels, we dont hardcode it, 800 or 500 in JS, WE READ IT FROM THE DOM
const gameHeight = game.clientHeight


const playerWidth = 75;
const playerHeight = 75;


const coins = [];

const coinWidth = 40; // it must match with the css width 
const coinHeight = 40; // same;




/*
why use playerX and PlayerY because this value is player position in the web page it is refering that
*/
let playerX = 100; // ye player ke positon ko represent karta hai
let playerY = 100; //same
let speed= 5;

function updatePlayerPosition() {
    player.style.left = playerX + "px"; // left matlab niche ke aor; 
    player.style.top = playerY + "px" // upar ke aor;

}


// Now we are adding movement ( in a controlled way )


document.addEventListener("keydown", function(event) {
    console.log(event);

    if(event.key === "w") {
        // playerY -= speed;
        playerY = playerY - speed;
    }

    if(event.key === "s"){
        playerY += speed;
    }

    if(event.key === "a"){
        playerX -= speed;
    }

    if(event.key === "d"){
        playerX += speed;
    }


    // BOUNDARY CONTROL LOGIC
    if(playerX < 0) {
        playerX = 0;
    }

    if(playerY < 0) {
        playerY = 0;
    }

    if(playerX > gameWidth - playerWidth) {
        playerX = gameWidth - playerWidth;
    }

    if(playerY > gameHeight - playerHeight) {
        playerY = gameHeight - playerHeight
    }

    updatePlayerPosition();


})


const coinImage = "images/coin.png";
const totalCoins = 20;

function createCoin(x,y) {
    const coin = document.createElement("img");
    coin.src = coinImage;
    coin.classList.add("coin");

    coin.style.left = x + "px";
    coin.style.top = y + "px";

    game.appendChild(coin);

    return coin;

}


for(let i = 0; i< totalCoins; i++){
    // const coin = createCoin(50 + i * 60, 200)
    // coin.push(coin);

    //updated logic
    const randomX = getRandomPosition(gameWidth - coinWidth);
    const randomY = getRandomPosition(gameHeight - coinHeight);

    const coin = createCoin(randomX, randomY);
    coins.push(coin);
}

function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
}


console.log(coins); //