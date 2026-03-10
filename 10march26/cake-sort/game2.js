// ── Step 2: Image Loading System ──────────────────────────────

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

canvas.width  = 420;
canvas.height = 720;

// ── All images the game needs ──────────────────────────────────
// Key = name we use in code, Value = filename on disk
const IMAGE_SOURCES = {
  background : 'background.png',
  container  : 'container-for-keeping-cakes.jpg',
  chocolate  : 'cake_chocolate.png',
  lemon      : 'cake_lemon.png',
  rainbow    : 'cake_rainbow.png',
  walnut     : 'cake_walnut.png',
};

// This object will hold the loaded Image objects
// After loading: IMAGES.chocolate is a ready-to-draw Image
const IMAGES = {};

// ── loadAllImages ──────────────────────────────────────────────
// Takes a callback function — calls it when ALL images are loaded
function loadAllImages(onAllLoaded) {
  const keys       = Object.keys(IMAGE_SOURCES); // ['background','container',...]
  let loadedCount  = 0;
  const totalCount = keys.length;

  console.log(`Loading ${totalCount} images...`);

  for (const key of keys) {
    const img = new Image();

    img.onload = () => {
      loadedCount++;
      console.log(`✓ Loaded: ${key} (${loadedCount}/${totalCount})`);

      // Once every image is done, call the callback
      if (loadedCount === totalCount) {
        console.log('All images ready!');
        onAllLoaded();
      }
    };

    img.onerror = () => {
      console.warn(`✗ Failed to load: ${key} — check filename!`);
      // Still count it so the game doesn't get stuck
      loadedCount++;
      if (loadedCount === totalCount) {
        onAllLoaded();
      }
    };

    img.src        = IMAGE_SOURCES[key]; // triggers the actual load
    IMAGES[key]    = img;                // store reference immediately
  }
}

// ── Test: draw images once they load ──────────────────────────
function onImagesReady() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 1. Draw background (full canvas size)
  ctx.drawImage(IMAGES.background, 0, 0, canvas.width, canvas.height);

  // 2. Draw container in the center
  ctx.drawImage(IMAGES.container, 160, 200, 100, 240);

  // 3. Draw each cake image in a row at the bottom — just for testing
  const cakeKeys = ['chocolate', 'lemon', 'rainbow', 'walnut'];
  let startX = 20;

  for (const key of cakeKeys) {
    ctx.drawImage(IMAGES[key], startX, 580, 90, 90);
    startX += 100;
  }

  // 4. Label text on top
  ctx.fillStyle    = '#FFD700';
  ctx.font         = 'bold 28px Arial';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Images Loaded! ✓', canvas.width / 2, 50);
}

// ── Show loading text while images fetch ──────────────────────
ctx.fillStyle    = '#6b3fa0';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle    = '#ffffff';
ctx.font         = '22px Arial';
ctx.textAlign    = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);

// ── Start loading ─────────────────────────────────────────────
loadAllImages(onImagesReady);