import Phaser from "phaser";
import Background from "../game-ui/Background";
import Ui from "../game-ui/Ui"

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    // preload() {

    // }

    create() {
        // document.getElementById("loader-gif").style.display = "none";
        // this.cameras.main.
        // this.gameBg = this.add.image(621, 1340, "game-loader");
        // this.background = new Background(this);  //I think this is will not work

        this.ui = new Ui(this)
        this.background = new Background(this) //why we have written this/ because this refers to 
        // console.log(this);






        //Market Class
        //Top Player class 
        // Coin Class 
        //Card class 
    }

    update(dt) {
        this.background.update(dt)
    }
} 