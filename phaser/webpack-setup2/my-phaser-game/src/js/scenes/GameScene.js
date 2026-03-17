//  import Phaser from "phaser";
// import Board from "../objects/Board";
// import { KEYS } from "../constants";

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//   }

//   init(data) {
//     this.levelNumber = data.level || 1;
//     console.log("Playing level:", this.levelNumber);
//   }

//   create() {
//     console.log("GameScene started");

//     const cx = this.scale.width / 2;
//     const cy = this.scale.height / 2;

//     // background
//     this.add.image(cx, cy, KEYS.BG_GAME)
//       .setDisplaySize(this.scale.width, this.scale.height);

//     // create board
//     this.board = new Board(this, this.levelNumber);

//     // make each tube clickable
//     for (let i = 0; i < this.board.tubes.length; i++) {
//       const tube = this.board.tubes[i];
//       tube.tubeImage.setInteractive();

//       tube.tubeImage.on("pointerdown", () => {
//         this.onTubeClick(tube);
//       });
//     }
//   }

//   onTubeClick(clickedTube) {
//     console.log("Tube clicked");

//     // no tube selected yet → select this one
//     if (this.board.selectedTube === null) {
//       this.board.selectedTube = clickedTube;
//       clickedTube.highlight();
//       return;
//     }

//     // clicked same tube → deselect
//     if (this.board.selectedTube === clickedTube) {
//       clickedTube.deselect();
//       this.board.selectedTube = null;
//       return;
//     }

//     // try to move
//     const moved = this.board.move(this.board.selectedTube, clickedTube);

//     // deselect after move attempt
//     this.board.selectedTube.deselect();
//     this.board.selectedTube = null;

//     // check win
//     if (moved) {
//       if (this.board.checkWin()) {
//         console.log("Level complete!");
//         this.time.delayedCall(500, () => {
//           this.showWinPanel();
//         });
//       }
//     }
//   }

//   showWinPanel() {
//     const cx = this.scale.width / 2;
//     const cy = this.scale.height / 2;

//     // dark overlay
//     this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.5);

//     // win panel
//     this.add.image(cx, cy, KEYS.PANEL_NEXT)
//       .setDisplaySize(300, 200);

//     // next level button
//     const nextBtn = this.add.text(cx, cy + 50, "NEXT LEVEL", {
//       fontSize: "24px",
//       fill: "#ffffff",
//       fontStyle: "bold"
//     }).setOrigin(0.5).setInteractive();

//     nextBtn.on("pointerdown", () => {
//       const nextLevel = this.levelNumber + 1;
//       if (nextLevel > 5) {
//         this.scene.start("MenuScene");
//       } else {
//         this.scene.start("GameScene", { level: nextLevel });
//       }
//     });
//   }
// }























// import Phaser from "phaser";
// import Board from "../objects/Board";
// import { KEYS } from "../constants";

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//   }

//   init(data) {
//     this.levelNumber = data.level || 1;
//     console.log("Playing level:", this.levelNumber);
//   }

//   create() {
//     console.log("GameScene started");

//     const cx = this.scale.width / 2;
//     const cy = this.scale.height / 2;

//     // background
//     this.add.image(cx, cy, KEYS.BG_GAME)
//       .setDisplaySize(this.scale.width, this.scale.height);

//     // create board
//     this.board = new Board(this, this.levelNumber);

//     // make each tube clickable
//     for (let i = 0; i < this.board.tubes.length; i++) {
//       const tube = this.board.tubes[i];
//       tube.tubeImage.setInteractive();

//       tube.tubeImage.on("pointerdown", () => {
//         this.onTubeClick(tube);
//       });
//     }
//   }

//   onTubeClick(clickedTube) {
//     console.log("Tube clicked");

//     // no tube selected yet → select this one
//     if (this.board.selectedTube === null) {
//       this.board.selectedTube = clickedTube;
//       clickedTube.highlight();
//       return;
//     }

//     // clicked same tube → deselect
//     if (this.board.selectedTube === clickedTube) {
//       clickedTube.deselect();
//       this.board.selectedTube = null;
//       return;
//     }

//     // try to move
//     const moved = this.board.move(this.board.selectedTube, clickedTube);

//     // deselect after move attempt
//     this.board.selectedTube.deselect();
//     this.board.selectedTube = null;

//     // check win
//     if (moved) {
//       if (this.board.checkWin()) {
//         console.log("Level complete!");
//         this.time.delayedCall(500, () => {
//           this.showWinPanel();
//         });
//       }
//     }
//   }

//   showWinPanel() {
//     const cx = this.scale.width / 2;
//     const cy = this.scale.height / 2;

//     // dark overlay
//     this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.6);

//     // just show panel image — it already has text inside
//     const panel = this.add.image(cx, cy, KEYS.PANEL_NEXT)
//       .setDisplaySize(350, 250);

//     // click panel → go next level
//     panel.setInteractive();

//     panel.on("pointerdown", () => {
//       const nextLevel = this.levelNumber + 1;
//       if (nextLevel > 5) {
//         this.scene.start("MenuScene");
//       } else {
//         this.scene.start("GameScene", { level: nextLevel });
//       }
//     });
//   }
// }














import Phaser from "phaser";
import Board from "../objects/Board";
import { KEYS } from "../constants";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(data) {
    this.levelNumber = data.level || 1;
    console.log("Playing level:", this.levelNumber);
  }

  create() {
    console.log("GameScene started");

    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    // background
    this.add.image(cx, cy, KEYS.BG_GAME)
      .setDisplaySize(this.scale.width, this.scale.height);

    // create board
    this.board = new Board(this, this.levelNumber);

    // make each tube clickable
    for (let i = 0; i < this.board.tubes.length; i++) {
      const tube = this.board.tubes[i];
      tube.tubeImage.setInteractive();

      tube.tubeImage.on("pointerdown", () => {
        this.onTubeClick(tube);
      });
    }
  }

  onTubeClick(clickedTube) {
    console.log("Tube clicked");

    // no tube selected yet → select this one
    if (this.board.selectedTube === null) {

      // don't select empty tube
      if (clickedTube.isEmpty()) {
        console.log("Tube is empty, skip");
        return;
      }

      this.board.selectedTube = clickedTube;
      clickedTube.highlight();

      // show how many cans will move
      const count = clickedTube.stack.peekMultiple();
      console.log("Selected", count, "cans of color:", clickedTube.topColor());
      return;
    }

    // clicked same tube → deselect
    if (this.board.selectedTube === clickedTube) {
      clickedTube.deselect();
      this.board.selectedTube = null;
      return;
    }

    // try to move multiple cans
    const moved = this.board.moveMultiple(this.board.selectedTube, clickedTube);

    // deselect after move attempt
    this.board.selectedTube.deselect();
    this.board.selectedTube = null;

    // check win
    if (moved) {
      if (this.board.checkWin()) {
        console.log("Level complete!");
        this.time.delayedCall(500, () => {
          this.showWinPanel();
        });
      }
    }
  }

  showWinPanel() {
    const cx = this.scale.width / 2;
    const cy = this.scale.height / 2;

    this.add.rectangle(cx, cy, this.scale.width, this.scale.height, 0x000000, 0.6);

    const panel = this.add.image(cx, cy, KEYS.PANEL_NEXT)
      .setDisplaySize(350, 250);

    panel.setInteractive();

    panel.on("pointerdown", () => {
      const nextLevel = this.levelNumber + 1;
      if (nextLevel > 5) {
        this.scene.start("MenuScene");
      } else {
        this.scene.start("GameScene", { level: nextLevel });
      }
    });
  }
}



// ```

// ---

// ## What changed:
// ```
// Stack.js   → added peekMultiple()
//              counts matching cans from top

// Board.js   → added howManyCanMove()
//              finds minimum of (matching cans, empty spaces)
//            → added moveMultiple()
//              moves count cans one by one

// GameScene  → uses moveMultiple() instead of move()
//            → skips selecting empty tubes
//            → logs how many cans selected