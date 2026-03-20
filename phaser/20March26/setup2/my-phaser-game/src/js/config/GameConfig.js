import { Scale, Scene } from "phaser";
import preloadScene from "../scenes/PreloadScene";
import GameScene from "../scenes/GameScene";

export const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: 'game',
    backgroundColor: '0x000000',
    scene: [preloadScene, GameScene],

        plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: SpinePlugin, mapping: 'spine' }
        ]
    },

}
