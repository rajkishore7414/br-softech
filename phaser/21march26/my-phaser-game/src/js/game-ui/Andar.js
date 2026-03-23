export default class Andar {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }

    create() {
        this.andar = this.scene.add.image(612 , 1300, "spriteAtlas", "Andar.png");
        this.bahar = this.scene.add.image(612 , 2000, "spriteAtlas", "Bahar.png");
    }

}