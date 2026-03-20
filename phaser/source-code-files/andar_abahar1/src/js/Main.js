/**
 * here basically i am configuring the game for differnt devices
 * with specific height and width
 *
 * Creating instances(objects) for GameScene and preload scene calculating scaleFactor aspectRatio
 */

import { Constant } from "../js/Constant.js";
import PreloadScene from "../js/PreloadScene.js";
import GameScene from "../js/GameScene.js";

// Create instances of scenes
let preloadScene = new PreloadScene();
let gameScene = new GameScene();

window.onload = function () {
  Constant.isMobile =
    /iPhone|iPhoneX|iPod|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(
      navigator.userAgent
    );

  let config;
  if (Constant.isMobile) {
    config = {
      type: Phaser.WEBGL,
      backgroundColor: 0x222222,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      plugins: {
        scene: [
          {
            key: "rexUI",
            plugin: rexuiplugin,
            mapping: "rexUI",
          },
          { key: "SpinePlugin", plugin: SpinePlugin, mapping: "spine" },
        ],
      },
      loader: {
        baseURL: "https://ik.imagekit.io/iyafbeire/Virtual_Andar_Bahar_1.0_HTML5",
      },
      pauseOnBlur: false,
      width: 1242, //window.innerWidth,
      height: 2680, //window.innerHeight,
    };
  } else {
    config = {
      type: Phaser.AUTO,
      backgroundColor: 0x222222,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      plugins: {
        scene: [
          {
            key: "rexUI",
            plugin: rexuiplugin,
            mapping: "rexUI",
          },
          { key: "SpinePlugin", plugin: SpinePlugin, mapping: "spine" },
        ],
      },
      loader: {
        // baseURL: "https://ik.imagekit.io/iyafbeire/Virtual_Andar_Bahar_1.0_HTML5",
      },
      pauseOnBlur: false,
      width: 1242,
      height: 2680,
    };
  }

  // Create a new Phaser.Game instance
  Constant.game = new Phaser.Game(config);
  Constant.scaleFactor = config.height / 2680;
  Constant.scaleFactorX = config.width / 1242;
  Constant.scaleFactorY = config.height / 2680;

  // Set current aspect ratio
  Constant.currentAspectRatio = config.height / config.width;

  // // Add scenes to the game
  Constant.game.scene.add("PreloadScene", preloadScene);
  Constant.game.scene.add("GameScene", gameScene);

  // Start the preload scene
  Constant.game.scene.start("PreloadScene");
};

window.focus();
