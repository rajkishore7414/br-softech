// import GameScene from "../scenes/GameScene";
// import PreloadScene from "../scenes/PreloadScene"
// import {config} from "./GameConfig"

// let preloadScene = new preloadScene();
// let GameScene = new GameScene();


// const Game_Instance = new Phaser.new(config)
// console.log("game loaded", Game_Instance)


// import GameScene from "../scenes/GameScene";
// import PreloadScene from "../scenes/PreloadScene";
// import {config} from "./GameConfig"

// let preloadScene = new PreloadScene();
// let gameScene = new GameScene();          // lowercase 'g' for the instance

// const Game_Instance = new Phaser.Game(config)
// console.log("game loaded", Game_Instance)




// window.onload = function() {
//     Game_Instance.scene.add('PreloadScene', preloadScene);
//     Game_Instance.scene.add('GameScene', gameScene);
//     Game_Instance.scene.start('PreloadScene');   // ← this is what makes it run
// }



// ✅ clean main.js
// import GameScene from "../scenes/GameScene";
// import PreloadScene from "../scenes/PreloadScene";
// import { config } from "./GameConfig";

// const Game_Instance = new Phaser.Game(config);
// console.log("game loaded", Game_Instance);


// ✅ clean main.js
import GameScene from "../scenes/GameScene";
import PreloadScene from "../scenes/PreloadScene";
import { config } from "./GameConfig";

const Game_Instance = new Phaser.Game(config);
console.log("game loaded", Game_Instance);