import Phaser from "phaser";
import { KEYS } from "../constants";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    console.log("MenuScene started");

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    // background
    this.add.image(cx, cy, KEYS.BG_MENU)
      .setDisplaySize(this.scale.width, this.scale.height);

    // play button
    const playBtn = this.add.image(cx, cy + 200, KEYS.BTN_PLAY)
      .setScale(0.8)
      .setInteractive();

    // click → go to LevelSelectScene
    playBtn.on("pointerdown", () => {
      console.log("Play clicked!");
      this.scene.start("LevelSelectScene");
    });

    // hover effects
    playBtn.on("pointerover", () => playBtn.setScale(0.9));
    playBtn.on("pointerout",  () => playBtn.setScale(0.8));
  }
}