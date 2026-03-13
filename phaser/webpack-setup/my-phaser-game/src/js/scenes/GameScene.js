// import Phaser from "phaser";
// import Stack from "../structures/Stack";

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//   }

//   create() {
//     console.log("--- Stack Test ---");

//     const stack = new Stack();

//     stack.push("pink");
//     stack.push("pink");
//     stack.push("pink");
//     stack.push("pink");

//     console.log("isFull?",   stack.isFull());    // true
//     console.log("isSorted?", stack.isSorted());  // true
//     console.log("peek:",     stack.peek());       // pink

//     stack.pop();
//     stack.push("brown");

//     console.log("isSorted?", stack.isSorted());  // false
//     console.log("size:",     stack.size());       // 4
//   }
// }



// import Phaser from "phaser";
// import LEVELS from "../data/LevelData";

// export default class GameScene extends Phaser.Scene {
//   constructor() {
//     super({ key: "GameScene" });
//   }

//   create() {
//     console.log("--- LevelData Test ---");

//     // how many levels?
//     console.log("Total levels:", Object.keys(LEVELS).length);

//     // print level 1 tubes
//     LEVELS[1].columns.forEach((col, i) => {
//       console.log(`Tube ${i}:`, col.length === 0 ? "empty" : col);
//     });
//   }
// }
// ```

// ---

// Run and check console `F12`:
// ```
// --- LevelData Test ---
// Total levels: 5
// Tube 0: ["pink", "red", "pink", "red"]
// Tube 1: ["red", "pink", "red", "pink"]
// Tube 2: empty
// Tube 3: empty






import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    console.log("GameScene ready");
  }
}