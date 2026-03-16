// import Phaser from "phaser";
// import { KEYS } from "../constants";

// export default class LevelSelectScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "LevelSelectScene" });
//   }

//   create() {
//     console.log("LevelSelectScene started");

//     const cx = this.scale.width / 2;
//     const cy = this.scale.height / 2;

//     // background
//     this.add.image(cx, cy, KEYS.BG_LEVELSELECT)
//       .setDisplaySize(this.scale.width, this.scale.height);

//     // title text
//     this.add.text(cx, 80, "SELECT LEVEL", {
//       fontSize: "32px",
//       fill: "#ffffff",
//       fontStyle: "bold",
//     }).setOrigin(0.5);

//     // 5 level buttons
//     const levels = [1, 2, 3, 4, 5];

//     levels.forEach((level, index) => {
//       const x = cx - 100 + (index % 3) * 100;
//       const y = cy - 50 + Math.floor(index / 3) * 120;

//       // level badge
//       const badge = this.add.image(x, y, KEYS.LEVEL_BADGE)
//         .setScale(0.15)
//         .setInteractive();

//       // level number on badge
//       this.add.text(x, y, `${level}`, {
//         fontSize: "24px",
//         fill: "#ffffff",
//         fontStyle: "bold",
//       }).setOrigin(0.5);

//       // click → go to GameScene with level number
//       badge.on("pointerdown", () => {
//         console.log("Level selected:", level);
//         this.scene.start("GameScene", { level: level });
//       });

//       // hover effects
//       badge.on("pointerover", () => badge.setScale(0.17));
//       badge.on("pointerout",  () => badge.setScale(0.15));
//     });

//     // back button
//     const backBtn = this.add.image(80, 50, KEYS.BTN_BACK)
//       .setScale(0.3)
//       .setInteractive();

//     backBtn.on("pointerdown", () => {
//       this.scene.start("MenuScene");
//     });
//   }
// }


















import Phaser from "phaser";
import { KEYS } from "../constants";

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: "LevelSelectScene" });
  }

  create() {
    console.log("LevelSelectScene started");

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    // background
    this.add.image(cx, cy, KEYS.BG_LEVELSELECT)
      .setDisplaySize(this.scale.width, this.scale.height);

    // title
    this.add.text(cx, 80, "SELECT LEVEL", {
      fontSize: "32px",
      fill: "#ffffff",
      fontStyle: "bold",
    }).setOrigin(0.5);

    // 5 level buttons
    const levels = [1, 2, 3, 4, 5];

    levels.forEach((level, index) => {
      const x = cx - 100 + (index % 3) * 100;
      const y = cy - 50 + Math.floor(index / 3) * 120;

      // gold colored circle button
      const btn = this.add.circle(x, y, 40, 0xffd700)
        .setInteractive();

      // level number
      this.add.text(x, y, `${level}`, {
        fontSize: "28px",
        fill: "#000000",
        fontStyle: "bold",
      }).setOrigin(0.5);

      // click → go to GameScene
      btn.on("pointerdown", () => {
        console.log("Level selected:", level);
        this.scene.start("GameScene", { level: level });
      });

      // hover effects
      btn.on("pointerover", () => btn.setScale(1.2));
      btn.on("pointerout",  () => btn.setScale(1));
    });

    // back button
    const backBtn = this.add.image(80, 50, KEYS.BTN_BACK)
      .setScale(0.3)
      .setInteractive();

    backBtn.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}