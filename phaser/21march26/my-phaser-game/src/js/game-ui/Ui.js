export default class Ui {
    constructor(scene) {
        this.scene = scene;
        this.create();

    }

    create() {
        this.bgUp = this.scene.add.image(625, 515, "spriteAtlas", "uper bg.png").setOrigin(.5);
        this.bgDown = this.scene.add.image(620, 1980, "spriteAtlas", "bg-box1.png").setOrigin(.5);
    }
}