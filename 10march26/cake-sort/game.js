
// canvas
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d'); //getContext allow to draw 2d oject /like reactange circle


//here we set the game canvas height-width
canvas.width = 420;
canvas.height = 720;

// images are stores in the object
const IMAGE_SOURCES = {
  background : 'background.png',
  container  : 'container-for-keeping-cakes.jpg',
  chocolate  : 'cake_chocolate.png',
  lemon      : 'cake_lemon.png',
  rainbow    : 'cake_rainbow.png',
  walnut     : 'cake_walnut.png',
};

const IMAGES = {}



function loadAllImages(onAllLoaded) {

  let loadedCount = 0;
  const totalImages = 6;

  // One function that runs every time ANY image finishes loading
  function onOneImageLoaded() {
    loadedCount++;
    console.log('loaded ' + loadedCount + ' of ' + totalImages);

    if (loadedCount === totalImages) {
      onAllLoaded(); // all done!
    }
  }

  // Load each image one by one
  IMAGES.background = new Image();
  IMAGES.background.src = 'background.png';
  IMAGES.background.onload = onOneImageLoaded;

  IMAGES.container = new Image();
  IMAGES.container.src = 'container-for-keeping-cakes.jpg';
  IMAGES.container.onload = onOneImageLoaded;

  IMAGES.chocolate = new Image();
  IMAGES.chocolate.src = 'cake_chocolate.png';
  IMAGES.chocolate.onload = onOneImageLoaded;

  IMAGES.lemon = new Image();
  IMAGES.lemon.src = 'cake_lemon.png';
  IMAGES.lemon.onload = onOneImageLoaded;

  IMAGES.rainbow = new Image();
  IMAGES.rainbow.src = 'cake_rainbow.png';
  IMAGES.rainbow.onload = onOneImageLoaded;

  IMAGES.walnut = new Image();
  IMAGES.walnut.src = 'cake_walnut.png';
  IMAGES.walnut.onload = onOneImageLoaded;

}


// All game data lives here in one place
const gameState = {
  level        : 1,
  tubes        : [],   // will hold the cake stacks
  selectedTube : null, // which tube is currently clicked
  timer        : 60,   // countdown seconds
  moves        : 0,    // how many moves the player made
  isWon        : false,
  isGameOver   : false
};


function drawOneTube() {

  // Draw the container image
  // (x, y, width, height)
  ctx.drawImage(IMAGES.container, 160, 200, 100, 280);

  // Draw one cake INSIDE the container
  ctx.drawImage(IMAGES.chocolate, 170, 420, 80, 60);

}


function onImagesReady() {

  // Draw background first
  ctx.drawImage(IMAGES.background, 0, 0, canvas.width, canvas.height);

  // Draw one tube with one cake
  drawOneTube();

  console.log('Drew one tube!');

}


// ── Draw a static test frame ──────────────────────────────────

// Fill background with purple
ctx.fillStyle = '#6b3fa0'; // to fill the cavas with color
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw "LEVEL 1" text in the center
ctx.fillStyle  = '#FFD700';      // gold colour
ctx.font       = 'bold 32px Arial';
ctx.textAlign  = 'center';
ctx.textBaseline = 'top';

// ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);

ctx.fillText('Hello World', canvas.width / 4, canvas.height / 2);

