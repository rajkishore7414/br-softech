import Phaser from "phaser";
import { KEYS } from "../constants";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    // backgrounds
    this.load.image(KEYS.BG_MENU,        "assets/images/backgrounds/title-screen.jpg");
    this.load.image(KEYS.BG_LEVELSELECT, "assets/images/backgrounds/level-select-map.jpg");
    this.load.image(KEYS.BG_GAME,        "assets/images/backgrounds/game-bg.jpg");

    // tube
    this.load.image(KEYS.TUBE,           "assets/images/tube/tube.png");

    // cans
    this.load.image(KEYS.CAN_PINK,       "assets/images/cans/can-pink.png");
    this.load.image(KEYS.CAN_RED,        "assets/images/cans/can-red.png");
    this.load.image(KEYS.CAN_BLUE,       "assets/images/cans/can-blue.png");
    this.load.image(KEYS.CAN_PURPLE,     "assets/images/cans/can-purple.png");
    this.load.image(KEYS.CAN_YELLOW,     "assets/images/cans/can-yellow.png");
    this.load.image(KEYS.CAN_GREEN,      "assets/images/cans/can-green.png");

    // ui
    this.load.image(KEYS.BTN_PLAY,       "assets/images/ui/btn-play.png");
    this.load.image(KEYS.BTN_BACK,       "assets/images/ui/btn-back.png");
    this.load.image(KEYS.LEVEL_BADGE,    "assets/images/ui/level.png");
    this.load.image(KEYS.PANEL_NEXT,     "assets/images/ui/panel-nextlevel.png");
    this.load.image(KEYS.PANEL_QUIT,     "assets/images/ui/panel-quit.png");
    this.load.image(KEYS.GAMEOVER,       "assets/images/ui/gameover.png");
  }

  create() {
    console.log("✅ All assets loaded!");
    this.scene.start("MenuScene");
  }
}