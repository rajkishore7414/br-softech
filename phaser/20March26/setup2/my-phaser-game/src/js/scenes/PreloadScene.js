// export default class PreloadScene extends Phaser.Scene {
//     constructor() {
//         super('PreloadScene');  // Phaser needs this key
//     }

//     preload() {
//         this.load.image("game-loader", "assests/images/loading/loader.jpg");
//          this.load.multiatlas("spriteAtlas", "assets/images/_Vir_Andar_Bahr_1.0_Sprite_Sheet/Vir_Andar_Bahr_1.0_Sprite_Sheet.json");
//           this.load.spine("spine-new", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.json", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.atlas");
//     }

//     create() {
//     this.scene.start('GameScene');
// }


// }



export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image("game-loader", "assets/images/loading/loader.jpg");
        this.load.multiatlas("spriteAtlas", "assets/images/_Vir_Andar_Bahr_1.0_Sprite_Sheet/Vir_Andar_Bahr_1.0_Sprite_Sheet.json");
        this.load.spine("spine-new", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.json", "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.atlas");
    }

    create() {
        this.scene.start('GameScene');
    }
}