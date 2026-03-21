import GAMEINSTANCE from "../config/main";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }
    preload() {
        this.loadAssets();
    }


    create() {
        // this.add.image(200, 400, "game-loader")

    }

    loadAssets() {
        this.load.on("progress", this.loadProgress, this);
        this.load.on("complete", this.OnComplete, this);
        this.load.image("game-loader", "assets/images/loading/loader.jpg");
        this.load.image("home-icon", "assets/images/Home/home_icon.png")
        // this.load.spritesheet("loader-animation", "assets/images/loading/unnamed.gif")

        this.load.multiatlas("spriteAtlas", "assets/images/_Vir_Andar_Bahr_1.0_Sprite_Sheet/Vir_Andar_Bahr_1.0_Sprite_Sheet.json");



        this.load.start(); //NOW the actual downloading begins. Phaser goes through the queue and fetches each file.


        // this.load.spine("spine-new", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.json", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.atlas");
    }
    loadProgress() { } 
    OnComplete() {
        GAMEINSTANCE.scene.stop("PreloadScene");
        GAMEINSTANCE.scene.start("GameScene");
    }

}