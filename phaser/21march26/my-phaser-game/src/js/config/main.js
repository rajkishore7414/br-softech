import Phaser from 'phaser';
// import GameScene from "../scenes/GameScene";
import { config } from './GameConfig'
import PreloadScene from "../scenes/PreloadScene";
import GameScene from '../scenes/GameScene';


let preloadScene = new PreloadScene();
let gameScene = new GameScene();

const GAMEINSTANCE = new Phaser.Game(config)
export default GAMEINSTANCE;


window.onload = function () {
    console.log("hello is this", GAMEINSTANCE, Phaser)
    GAMEINSTANCE.scene.add('PreloadScene', preloadScene);
    GAMEINSTANCE.scene.add('GameScene', gameScene);
    GAMEINSTANCE.scene.start('PreloadScene');

    window.focus();

}




// new SocketConection(); //this is for Socket connection -> receive data from backend