// import Tube from "./Tube";
// import LEVELS from "../data/LevelData";

// export default class Board {

//   constructor(scene, levelNumber) {
//     this.scene = scene;
//     this.tubes = [];
//     this.selectedTube = null;

//     // get level data
//     const levelData = LEVELS[levelNumber];
//     const columns = levelData.columns;

//     // calculate start x position
//     const totalTubes = columns.length;
//     const spaceBetween = 80;
//     const startX = (scene.scale.width / 2) - ((totalTubes - 1) * spaceBetween / 2);
//     const tubeY = scene.scale.height / 2;

//     // create each tube
//     for (let i = 0; i < columns.length; i++) {
//       const x = startX + i * spaceBetween;
//       const tube = new Tube(scene, x, tubeY, columns[i]);
//       this.tubes.push(tube);
//     }

//     console.log("Board created with", this.tubes.length, "tubes");
//   }

//   // can we move top can from tube A to tube B?
//   canMove(fromTube, toTube) {
//     if (fromTube.isEmpty()) {
//       console.log("canMove: false — from tube empty");
//       return false;
//     }

//     if (toTube.isFull()) {
//       console.log("canMove: false — to tube full");
//       return false;
//     }

//     if (toTube.isEmpty()) {
//       console.log("canMove: true — to tube empty");
//       return true;
//     }

//     if (fromTube.topColor() === toTube.topColor()) {
//       console.log("canMove: true — colors match");
//       return true;
//     }

//     console.log("canMove: false — colors dont match");
//     return false;
//   }

//   // move top can from tube A to tube B
//   move(fromTube, toTube) {
//     if (!this.canMove(fromTube, toTube)) {
//       return false;
//     }

//     const color = fromTube.removeCan();
//     toTube.addCan(color);
//     console.log("Moved:", color);
//     return true;
//   }

//   // are all tubes sorted?
//   checkWin() {
//     for (let i = 0; i < this.tubes.length; i++) {
//       if (!this.tubes[i].isSorted()) {
//         return false;
//       }
//     }
//     console.log("WIN!");
//     return true;
//   }
// }












// // Board.js = the manager of all tubes

// // It has 3 jobs:
// // 1. CREATE all tubes on screen
// // 2. CHECK if a move is allowed
// // 3. DETECT if player has won


















import Tube from "./Tube";
import LEVELS from "../data/LevelData";

export default class Board {

  constructor(scene, levelNumber) {
    this.scene = scene;
    this.tubes = [];
    this.selectedTube = null;

    const levelData = LEVELS[levelNumber];
    const columns = levelData.columns;

    const totalTubes = columns.length;
    const spaceBetween = 80;
    const startX = (scene.scale.width / 2) - ((totalTubes - 1) * spaceBetween / 2);
    const tubeY = scene.scale.height / 2;

    for (let i = 0; i < columns.length; i++) {
      const x = startX + i * spaceBetween;
      const tube = new Tube(scene, x, tubeY, columns[i]);
      this.tubes.push(tube);
    }

    console.log("Board created with", this.tubes.length, "tubes");
  }

  canMove(fromTube, toTube) {
    if (fromTube.isEmpty()) return false;
    if (toTube.isFull()) return false;
    if (toTube.isEmpty()) return true;
    if (fromTube.topColor() === toTube.topColor()) return true;
    return false;
  }

  // how many cans can we move from A to B? this is the part where we have 
  howManyCanMove(fromTube, toTube) {
    if (fromTube.isEmpty()) return 0;
    if (toTube.isFull()) return 0;

    // colors must match OR toTube must be empty
    if (!toTube.isEmpty() && fromTube.topColor() !== toTube.topColor()) {
      return 0;
    }

    // how many matching cans on top of fromTube
    const matching = fromTube.stack.peekMultiple();

    // how many spaces in toTube
    const spaces = 4 - toTube.stack.size();

    // move minimum of matching and spaces
    const canMove = Math.min(matching, spaces);

    console.log("matching:", matching, "spaces:", spaces, "will move:", canMove);
    return canMove;
  }

  // move multiple cans from A to B
  moveMultiple(fromTube, toTube) {
    const count = this.howManyCanMove(fromTube, toTube);

    if (count === 0) {
      console.log("Cannot move!");
      return false;
    }

    // move one by one
    for (let i = 0; i < count; i++) {
      const color = fromTube.removeCan();
      toTube.addCan(color);
    }

    console.log("Moved", count, "cans");
    return true;
  }

  checkWin() {
    for (let i = 0; i < this.tubes.length; i++) {
      if (!this.tubes[i].isSorted()) {
        return false;
      }
    }
    console.log("WIN!");
    return true;
  }
}