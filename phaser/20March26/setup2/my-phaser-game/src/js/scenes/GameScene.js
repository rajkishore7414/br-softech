import Phaser from "phaser";
import Background from "../game-ui/Background";

export default class GameScene extends Phaser.Scene{ 
    constructor(){
      super("GameScene")
    }

    preload(){

    }

    create(){
        this.background = new Background(this);
        //Market Class
        //Top Player class 
        // Coin Class 
        //Card class 
    }
}