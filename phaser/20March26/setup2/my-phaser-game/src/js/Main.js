import Phaser from "phaser";
import SocketConection from "./Socket";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1a1a2e",
  parent: "game",
  scene: {
    preload() {},
    create() {
      // Background rectangle
      this.add.rectangle(400, 300, 800, 600, 0x1a1a2e);

      // Title text
      this.add.text(400, 220, "Phaser is Working!", {
        fontSize: "42px",
        fill: "#ffffff",
        fontStyle: "bold",
      }).setOrigin(0.5);

      // Subtitle
      this.add.text(400, 290, "Webpack + Phaser 3 setup complete 🎮", {
        fontSize: "22px",
        fill: "#00d4aa",
      }).setOrigin(0.5);

      // Bouncing ball
      const ball = this.add.circle(400, 400, 30, 0xff6b6b);

      this.tweens.add({
        targets: ball,
        y: 480,
        duration: 600,
        ease: "Sine.easeInOut",
        yoyo: true,
        repeat: -1,
      });
    },
  },
};

new Phaser.Game(config);
new SocketConection();


