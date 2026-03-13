// import Phaser from "phaser";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.RESIZE,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: []  // empty for now, we add scenes later
// };

// new Phaser.Game(config);




// import Phaser from "phaser";
// import PreloadScene from "./scenes/PreloadScene";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.RESIZE,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: [PreloadScene] // only PreloadScene for now
// };

// new Phaser.Game(config);












// import Phaser from "phaser";
// import PreloadScene from "./scenes/PreloadScene";
// import MenuScene from "./scenes/MenuScene";

// const config = {
//   type: Phaser.AUTO,
//   width: window.innerWidth,
//   height: window.innerHeight,
//   backgroundColor: "#6b3fa0",
//   parent: "game",
//   scale: {
//     mode: Phaser.Scale.RESIZE,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//   },
//   scene: [PreloadScene, MenuScene]
// };

// new Phaser.Game(config);


























import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import LevelSelectScene from "./scenes/LevelSelectScene";

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
  scene: [PreloadScene, MenuScene, LevelSelectScene]
};

new Phaser.Game(config);







