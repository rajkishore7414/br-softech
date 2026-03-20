// export default class Background {
//     constructor(scene) {
//         this.scene = scene;
//         this.create();        // also need to call create() manually
//     }


//     create(){
//         this.gameBg = this.scene.add.image(0,0,"game-loader");
//         this.changeViewImage = this.scene.add.image(100,200,"spriteAtlas", "change-view-box.png") ;
//         this.delaerSpine = this.scene.add.spine(100,200,"spine-new", "Andar", false) ;
//     }
// }



export default class Background {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }

    create() {
        this.gameBg = this.scene.add.image(0, 0, "game-loader");
        this.changeViewImage = this.scene.add.image(100, 200, "spriteAtlas", "change-view-box.png");
        this.dealerSpine = this.scene.add.spine(100, 200, "spine-new", "Andar", false);
    }
}