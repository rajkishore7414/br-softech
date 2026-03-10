
// canvas
const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d'); //getContext allow to draw 2d oject /like reactange circle

// Set the internal resolution of the canvas
// Think of this as the "game world" size
// canvas.width  = 420;
// canvas.height = 720;

canvas.width = 500;
canvas.height = 800;

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

