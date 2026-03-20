import { BetPlace } from "../BetPlace.js";
import { Constant } from "../Constant.js";
import { SoundManagement } from "../SoundManagement.js";

class MenuPopUp {
  constructor(scene) {
    this.scene = scene;
    this.menuPopUpContainer = null;
    this.counterSoundOnOff = 0;
    this.soundOn = null;
    this.soundOff = null;
  }
  /**
   * creating menu pop up by accumulating a info button and text and sound button and text
   */
  CreateMenuPopUp() {
    const textStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    };
    this.menuPopUpContainer = this.scene.add.container(0, 0).setDepth(5);
    let menuPopUpBaseImage = this.scene.add
      .image(
        Constant.game.config.width / 1.27,
        Constant.game.config.height / 2,
        "side_black"
      )
      .setOrigin(0.5);

    let slideOffMenuPopUp = this.scene.add
      .image(1165, 1215, "ander_bahar_atlas", "menu.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    slideOffMenuPopUp.on("pointerdown", this.slideOffMenuButtonPress, this);
    slideOffMenuPopUp.on("pointerup", this.slideOffMenuButtonRelease, this);

    let infoButton = this.scene.add
      .image(
        Constant.game.config.width / 1.1,
        1330,
        "ander_bahar_atlas",
        "info.png"
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    let infotext = this.scene.add
      .text(Constant.game.config.width / 1.1, 1390, "Game rules", textStyle)
      .setOrigin(0.5, 0.5);

    infoButton.on("pointerdown", this.infoButtonPress, this);
    infoButton.on("pointerup", this.infoButtonRelease, this);

    this.soundOn = this.scene.add
      .sprite(
        Constant.game.config.width / 1.1,
        1490,
        "ander_bahar_atlas",
        "off.png"
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setVisible(false);
    this.soundOff = this.scene.add
      .sprite(
        Constant.game.config.width / 1.1,
        1490,
        "ander_bahar_atlas",
        "sound.png"
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    // "off.png"
    // close_tab.png

    let soundText = this.scene.add
      .text(Constant.game.config.width / 1.1, 1550, "Sound", textStyle)
      .setOrigin(0.5, 0.5);
    this.soundOn.on("pointerdown", this.OnSoundButtonPressed, this);
    this.soundOn.on("pointerup", this.OnSoundButtonReleased, this);

    this.soundOff.on("pointerdown", this.OnSoundButtonPressed, this);
    this.soundOff.on("pointerup", this.OnSoundButtonReleased, this);

    this.playTour = this.scene.add.image(Constant.game.config.width / 1.1, 1655, "ander_bahar_atlas", "Play.png").setInteractive({ useHandCursor: true }).setDepth(9);
    this.playTour.on("pointerdown", () => {
      this.DisableMenuPopUp();
      if (!this.scene.tour.tourFlag) {
        this.scene.tour.tourFlag = true;
        BetPlace.tourSentData();
      }
      else {
        this.scene.tour.tour(Constant.tourData);
      }
    });
    this.playTourTxt = this.scene.add.text(1095, 1655 + 50, "Play", {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setDepth(9);
    this.playTourTxt1 = this.scene.add.text(1055, 1655 + 50 + 32, "Instructions", {
      fontFamily: 'Arial',
      fontSize: 32,
      color: '#FFFFFF',
      fontStyle: 'bold'
    }).setDepth(9);

    this.menuPopUpContainer.add(menuPopUpBaseImage);
    this.menuPopUpContainer.add(slideOffMenuPopUp);
    this.menuPopUpContainer.add(infoButton);
    this.menuPopUpContainer.add(this.soundOn);
    this.menuPopUpContainer.add(infotext);
    this.menuPopUpContainer.add(soundText);
    this.menuPopUpContainer.add(this.soundOff);
    this.menuPopUpContainer.add(this.playTour);
    this.menuPopUpContainer.add(this.playTourTxt);
    this.menuPopUpContainer.add(this.playTourTxt1);




    this.menuPopUpContainer.visible = false;
  }
  EnableMenuPopUp() {
    this.menuPopUpContainer.visible = true;
  }
  DisableMenuPopUp() {
    this.menuPopUpContainer.visible = false;
  }
  slideOffMenuButtonPress() { }
  slideOffMenuButtonRelease() {
    // console.log("slide off");
    this.scene.secView.menuButton.visible = true;
    this.DisableMenuPopUp();
  }
  infoButtonPress() { }
  infoButtonRelease() {
    this.scene.rulesPopUp.EnableRulesPopUp();
  }
  OnSoundButtonPressed() { }
  OnSoundButtonReleased() {
    this.counterSoundOnOff += 1;
    if (this.counterSoundOnOff % 2 === 1) {
      SoundManagement.soundOn = 0;
      SoundManagement.StopGameSound();
      this.soundOn.visible = true;
      this.soundOff.visible = false;
    } else if (this.counterSoundOnOff % 2 === 0) {
      SoundManagement.soundOn = 1;
      SoundManagement.PlayGameSound();
      this.soundOn.visible = false;
      this.soundOff.visible = true;
    }
  }
  showPlayTourBtn() {
    this.playTour.setVisible(true);
    this.playTourTxt.setVisible(true);
    this.playTourTxt1.setVisible(true);
  }
  hidePlayTourBtn() {
    this.playTour.setVisible(false);
    this.playTourTxt.setVisible(false);
    this.playTourTxt1.setVisible(false);
  }
}
export default MenuPopUp;
