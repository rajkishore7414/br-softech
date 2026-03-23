import Phaser from "phaser";
import Background from "../game-ui/Background";
// import Ui from "../game-ui/Home"
import Andar from "../game-ui/Andar";
import Cards from "../game-ui/Cards";
import Home from "../game-ui/Home";
import SocketConection from "../Socket";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    // preload() {

    // }

    create() {
        // console.log("rthis", this);

        // this.game.events.on("raj", this.ok, this)


        // document.addEventListener("raj", () => {
        //     this.ok();
        // })
        // document.getElementById("loader-gif").style.display = "none";
        // this.cameras.main.
        // this.gameBg = this.add.image(621, 1340, "game-loader");
        // this.background = new Background(this);  //I think this is will not work

        // this.ui = new Ui(this);


        
        this.background = new Background(this) //why we have written this/ because this refers to 
        // console.log(this);
        // this.home = new this.Home(this);

        this.andar = new Andar(this);

        this.cards = new Cards(this);

        this.home = new Home(this);





        // this.socket = new SocketConection(this);
        // this.raj = "wehvfhf";
        // this.sdjhbf = "dnhfbsfbsjhfjhfbjhsd"






        //Market Class
        //Top Player class 
        // Coin Class 
        //Card class 
    }

    // ok() {
    //     console.log("bdhiya hao ");

    // }

    // no() {

    // }

    update(dt) {
        this.background.update(dt)
    }
} 