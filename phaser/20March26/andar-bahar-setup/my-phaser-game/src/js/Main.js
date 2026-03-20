// import Phaser from "phaser";

// const config = {
//   type: Phaser.AUTO,
//   width: 800,
//   height: 600,
//   backgroundColor: "#1a1a2e",
//   parent: "game",
//   scene: {
//     preload() {},
//     create() {
//       // Background rectangle
//       this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

//       // Title text
//       this.add.text(400, 220, "Phaser is Working!", {
//         fontSize: "42px",
//         fill: "#ffffff",
//         fontStyle: "bold",
//       }).setOrigin(0.5);

//       // Subtitle
//       this.add.text(400, 290, "Webpack + Phaser 3 setup complete 🎮", {
//         fontSize: "22px",
//         fill: "#00d4aa",
//       }).setOrigin(0.5);

//       // Bouncing ball
//       const ball = this.add.circle(400, 400, 30, 0xff6b6b);

//       this.tweens.add({
//         targets: ball,
//         y: 480,
//         duration: 600,
//         ease: "Sine.easeInOut",
//         yoyo: true,
//         repeat: -1,
//       });
//     },
//   },
// };

// new Phaser.Game(config);


























// src/js/Main.js
import Phaser from "phaser";
import Socket from "./Socket.js";

// ── Create socket instance globally ───────────────
window.SOCKET_INSTANCE = new Socket();

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#1a1a2e",
    parent: "game",
    scene: {
        preload() {},
        create() {
            this.add.text(400, 300, "Connecting to server...", {
                fontSize: "28px",
                fill: "#ffffff",
            }).setOrigin(0.5);
        }
    }
};

const game = new Phaser.Game(config);

// ── Start socket after Phaser boots ───────────────
game.events.on("ready", async () => {
    try {
        await window.SOCKET_INSTANCE.initializeConnection(
            () => console.log("Game loaded"),
            () => console.log("Clearing...")
        );
    } catch (err) {
        console.error("❌ Socket failed:", err);
    }
});