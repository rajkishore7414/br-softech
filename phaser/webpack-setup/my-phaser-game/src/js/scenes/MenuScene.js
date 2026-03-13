import Phaser from "phaser";
import { KEYS, GAME } from "../constants";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    console.log("MenuScene started");

    const cx = this.scale.width / 2;   // center x
    const cy = this.scale.height / 2;  // center y

    // background
    this.add.image(cx, cy, KEYS.BG_MENU)
      .setDisplaySize(this.scale.width, this.scale.height);

    // play button — center of screen
    const playBtn = this.add.image(cx, cy + 200, KEYS.BTN_PLAY)
      .setScale(0.8)
      .setInteractive(); // makes it clickable

    // click play → go to GameScene
    playBtn.on("pointerdown", () => {
      console.log("Play clicked!");
      this.scene.start("GameScene");
    });

    // hover effect
    playBtn.on("pointerover", () => {
      playBtn.setScale(1.1); // grow on hover
    });

    playBtn.on("pointerout", () => {
      playBtn.setScale(0.8); // back to normal
    });
  }
}