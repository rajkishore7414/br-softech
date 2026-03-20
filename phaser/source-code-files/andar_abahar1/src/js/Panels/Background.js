class background {
  constructor(scene) {
    this.scene = scene;
    this.upperBg = null;
    this.lowerBg = null;
  }
  CreateBackground() {
    this.upperBg = this.scene.add
      .image(621, 515, "ander_bahar_atlas", "uper bg.png")
      .setOrigin(0.5);
    this.lowerBg = this.scene.add
      .image(621, 1907, "ander_bahar_atlas", "bg-box1.png")
      .setOrigin(0.5);
  }
}
export default background;
