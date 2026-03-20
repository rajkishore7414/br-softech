import { Constant } from "../Constant.js";
class GuideLinesHelper {
  constructor(scene) {
    this.scene = scene;
  }
  CreateGuideLines() {
    this.overlay = this.scene.add
      .image(620, 1340, "black")
      .setOrigin(0.5)
      .setScale(1242, 2680)
      .setInteractive()
      .setAlpha(0.5)
      .setVisible(false);
    this.CreateOnAuthExpired();
    this.IdleState();
    this.InsufficientBalance();
    this.CreateTransBg();
    this.CreateConnectionLost();
    this.CreateAlertPopUp();
    this.BetClosePopUp();
  }
  CreateOnAuthExpired() {
    this.authExpireImage = this.scene.add
      .sprite(
        Constant.game.config.width / 2,
        Constant.game.config.height / 4.5,
        "ander_bahar_atlas",
        "popup_bgPD.png"
      )
      .setOrigin(0.5);
    this.authExpireImage.setVisible(false);
  }
  MakeAuthExpirePopUpEnable() {
    this.overlay.setVisible(true);
    this.authExpireImage.setVisible(true);
  }
  MakeAuthExpirePopUpDisable() {
    this.overlay.setVisible(false);
    this.authExpireImage.setVisible(false);
  }
  CreateAlertPopUp() {
    this.alertBg = this.scene.add
      .image(
        Constant.game.config.width / 2,
        Constant.game.config.height / 3.7,
        "ander_bahar_atlas",
        "Insufficiant_balance_popup.png"
      )
      .setOrigin(0.5);

    this.alertText = this.scene.add
      .text(
        Constant.game.config.width / 2,
        Constant.game.config.height / 3.7,
        "Bet Canceled",
        {
          fontFamily: "Arial",
          fontSize: "45px",
          fill: "#FF0000",
          fontStyle: "bold",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.alertBg.visible = false;
    this.alertText.visible = false;
  }
  EnableAlertPopUp1(time) {
    this.alertBg.visible = true;
    this.alertText.visible = true;
    setTimeout(() => {
      this.alertBg.visible = false;
      this.alertText.visible = false;
    }, time);
  }
  BetClosePopUp() {
    this.bg = this.scene.add
      .image(
        Constant.game.config.width / 2,
        Constant.game.config.height / 3.7,
        "ander_bahar_atlas", "close_tab.png"
      )
      .setOrigin(0.5);

    this.bg.visible = false;
  }
  EnableAlertPopUp() {
    this.bg.visible = true;
    setTimeout(() => {
      this.bg.visible = false;
    }, 1000);
  }
  IdleState() {
    this.idleStateImage = this.scene.add
      .sprite(
        Constant.game.config.width / 2,
        Constant.game.config.height / 4.5,
        "ander_bahar_atlas",
        "method14.png"
      )
      .setOrigin(0.5);
    this.idleStateImage.setVisible(false);
  }
  MakeIdlePopUpEnable() {
    this.idleStateImage.setVisible(true);
  }
  MakeIdlePopUpDisable() {
    this.idleStateImage.setVisible(false);
  }
  InsufficientBalance() {
    this.insufficientBalCont = this.scene.add.container(
      Constant.game.config.width / 2,
      Constant.game.config.height / 2.6
    );
    let popUpBg = this.scene.add
      .image(0, 0, "ander_bahar_atlas", "Insufficiant_balance_popup.png")
      .setOrigin(0.5);
    const textStyle = {
      fontFamily: "Arial",
      fontSize: "50px",
      fill: "#FF0000",
      fontStyle: "bold",
      align: "center",
    };
    let text = this.scene.add
      .text(0, 0, "Insufficient Balance", textStyle)
      .setOrigin(0.5);
    this.insufficientBalCont.add(popUpBg);
    this.insufficientBalCont.add(text);
    this.insufficientBalCont.visible = false;
  }
  MakeInSuffBalanceEnable() {
    this.insufficientBalCont.visible = true;
    setTimeout(() => {
      this.insufficientBalCont.visible = false;
    }, 1000);
  }
  CreateTransBg() {
    this.transPopupCont = this.scene.add.container(0, 0).setDepth(10);
    let img = this.scene.add
      .image(621, 1340, "black")
      .setOrigin(0.5)
      .setScale(1242, 2680)
      .setInteractive();
    this.transPopupCont.add(img).setAlpha(0.5);
    this.transPopupCont.setVisible(false);

    img.on("pointerdown", () => { });
    img.on("pointerup", () => {
      // console.log("clicked");
    });
  }
  MakeBgEnable() {
    this.transPopupCont.setVisible(true);
  }
  MakeBgDisable() {
    this.transPopupCont.setVisible(false);
  }
  CreateConnectionLost() {
    this.bgOverlay = this.scene.add
      .image(621, 1340, "Portrait_BG")
      .setOrigin(0.5)
      .setInteractive()
      .setVisible(false)
      .setDepth(7);
    this.anim = this.scene.add
      .spine(621, 1480, "Connection_Lose")
      .setScale(1)
      .setDepth(7)
      .setVisible(false);
    this.anim.play("animation", true);
  }
  EnableConnectionLost() {
    this.bgOverlay.visible = true;
    this.anim.visible = true;
  }
  DisableConnectionLost() {
    this.bgOverlay.visible = false;
    this.anim.visible = false;
  }
}
export default GuideLinesHelper;
