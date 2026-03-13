// import Phaser from "phaser";
// import GameScene from "./scenes/GameScene";

// const config = {
//   type: Phaser.AUTO,
//   width: 390,
//   height: 844,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scene: [GameScene]
// };

// new Phaser.Game(config);






// import Phaser from "phaser";
// import GameScene from "./scenes/GameScene";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,    // takes full screen width
//   height: window.innerHeight,  // takes full screen height
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.FIT,         // fit game into screen
//     autoCenter: Phaser.Scale.CENTER_BOTH, // center horizontally & vertically
//   },
//   scene: [GameScene]
// };

// new Phaser.Game(config);




// import Phaser from "phaser";
// import PreloadScene from "./scenes/PreloadScene";
// import GameScene from "./scenes/GameScene";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: [PreloadScene, GameScene] // PreloadScene runs first
// };

// new Phaser.Game(config);




// import Phaser from "phaser";
// import PreloadScene from "./scenes/PreloadScene";
// import GameScene from "./scenes/GameScene";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.RESIZE,  // ← changed to RESIZE
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: [PreloadScene, GameScene]
// };

// new Phaser.Game(config);






import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#6b3fa0",
  parent: "game",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, MenuScene, GameScene]
};

new Phaser.Game(config);