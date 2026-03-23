export default class Home {
    constructor(scene) {
        this.scene = scene;
        this.create();

    }

    create() {

        this.homeIcon = this.scene.add.image(940, 100, "home-icon");
        // this.scene.game.events.emit("raj", "Home createdx")
        // Event
    }
}