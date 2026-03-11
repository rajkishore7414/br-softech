import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1a1a2e",
  scene: {
    preload() {},
    create() {
      this.add.text(100, 100, "Phaser is working! 🎮", {
        fontSize: "32px",
        fill: "#ffffff",
      });
    },
  },
};

new Phaser.Game(config);
