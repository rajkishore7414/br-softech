import { Constant } from "../Constant.js";
class RulesPopUp {
  constructor(scene) {
    this.scene = scene;
    this.rulesPopUpContainer = null;
  }
  /**
   * On info button press there will be shown certain rules regarding the game is
   * spawning over here
   */
  CreateRulesPopUp() {
    this.rulesPopUpContainer = this.scene.add
      .container(
        Constant.game.config.width / 2,
        Constant.game.config.height / 2
      )
      .setDepth(5);

    // assets going to be a part of this container are below
    let overlay = this.scene.add
      .image(0, 0, "black")
      .setOrigin(0.5, 0.5)
      .setScale(1242, 2680)
      .setAlpha(0.6)
      .setInteractive();
    let rulesPopUpBg = this.scene.add
      .image(0, 740, "ander_bahar_atlas", "rules-popup-bg-box.png")
      .setOrigin(0.5, 0.5)
      .setScale(1, 1)
      .setInteractive();
    rulesPopUpBg.on("pointerdown", this.OnBgClicked, this);
    rulesPopUpBg.on("pointerup", this.OnBgReleased, this);
    const rulesTxtStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "100px",
      fill: "#FFC001",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 5,
      align: "center",
    };
    let rulesTxt = this.scene.add
      .text(0, 315, "Rules", rulesTxtStyle)
      .setOrigin(0.5);
    let cross = this.scene.add
      .image(520, 270, "ander_bahar_atlas", "cross.png")
      .setOrigin(0.5, 0.5)
      .setScale(1, 1)
      .setInteractive({ useHandCursor: true });
    let rulesValues = this.scene.add
      .image(0, 840, "ander_bahar_atlas", "rules-pop.png")
      .setOrigin(0.5, 0.5);

    overlay.on("pointerdown", this.OnOverlayPress, this);
    overlay.on("pointerup", this.OnOverlayRelease, this);

    cross.on("pointerup", this.OnCrossPress, this);
    cross.on("pointerup", this.OnCrossRelease, this);

    this.rulesPopUpContainer.add(overlay);
    this.rulesPopUpContainer.add(rulesPopUpBg);
    this.rulesPopUpContainer.add(rulesTxt);
    this.rulesPopUpContainer.add(cross);
    this.rulesPopUpContainer.add(rulesValues);

    this.rulesPopUpContainer.visible = false;
  }
  OnBgClicked() {}
  OnBgReleased() {
    // console.log("released");
  }
  /**
   * making visible rules pop up
   */
  EnableRulesPopUp() {
    this.rulesPopUpContainer.visible = true;
  }
  /**
   * making invisible rules pop up
   */
  DisbaleRulesPopUp() {
    this.rulesPopUpContainer.visible = false;
  }
  OnOverlayPress() {}
  OnOverlayRelease() {}

  OnCrossPress() {}
  OnCrossRelease() {
    this.rulesPopUpContainer.visible = false;
  }
}
export default RulesPopUp;
