// export default class Background{
//     constructor(this){
//        this.scene = scene ; 
//     }




export default class Background {
    constructor(scene) {
        console.log("scene", scene);

        this.scene = scene;
        this.create();
    }


    create() {
        // this.gameBg = this.scene.add.image(621, 1340, "game-loader");
        // this.changeViewImage = this.scene.add.image(621, 200, "spriteAtlas", "close_tab.png").setOrigin(0, 1).setDepth(1);
        // this.changeViewImage = this.scene.add.image(621, 200, "spriteAtlas", "close_tab.png").setOrigin(0, 1)
        this.homeIcon = this.scene.add.image(940, 100, "home-icon");
        
        // this.delaerSpine = this.scene.add.spine(100,200,"spine-new", "Andar", false) ;
    }

    update(dt) {
        // this.changeViewImage.rotation = 1 * dt;
    }
}