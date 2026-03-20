import { Constant } from "../Constant.js";
import { Database } from "../Network/DataBase.js";
class TopPanel {
  constructor(scene) {
    this.scene = scene;
    this.topPanelContainer = null;
    this.currentAmount = "123458";
    this.viewSwitchCounter = 0;
    this.round_Id = "1234567";
  }
  /**
   * round id
   * player name
   * amount on wallet changeview button and game name is spawning over here
   */
  CreateTopPanel() {
    this.topPanelContainer = this.scene.add
      .container(
        Constant.game.config.width / 2,
        Constant.game.config.height / 6
      )
      .setDepth(6); //.setScale(Constant.scaleFactorX, Constant.scaleFactorY);
    let headerBg = this.scene.add
      .image(0, -320, "ander_bahar_atlas", "uper-trans-part.png")
      .setOrigin(0.5); //.setAlpha(0.4);
    let downTransperent = this.scene.add
      .image(0, -170, "ander_bahar_atlas", "header_down_bg.png")
      .setOrigin(0.5);
    const textStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "40px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    };
    this.playerNameText = this.scene.add
      .text(-504, -350, "BantyMJ", textStyle)
      .setOrigin(0.5);
    const amountTextStyle = {
      fontFamily: "Arial-Black",
      fontSize: "45px",
      fill: "#BEEC6E",
      fontStyle: "bold",
      align: "center",
    };
    this.userWinAmountText = this.scene.add
      .text(-340, -350, "XXXXXXX", amountTextStyle)
      .setOrigin(0.5)
      .setVisible(false);
    const amtStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "40px",
      fill: "#ddf542",
      fontStyle: "bold",
      align: "left",
    };
    this.currency = this.scene.add
      .text(-540, -292, "XXX", amtStyle)
      .setOrigin(0.5);
    this.currentAmountText = this.scene.add
      .text(-490, -292, this.currentAmount, amtStyle)
      .setOrigin(0, 0.5);

    const roundIdTextStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#ffffff",
      fontStyle: "bold",
      align: "center",
    };
    this.roundIdText = this.scene.add
      .text(-500, -240, "Round ID ", roundIdTextStyle)
      .setOrigin(0.5);

    const roundIdValueStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#ddf542",
      fontStyle: "bold",
      align: "center",
    };
    this.roundIdTextValue = this.scene.add
      .text(-350, -240, this.round_Id, roundIdValueStyle)
      .setOrigin(0.5);

    this.changeViewButton = this.scene.add
      .image(0, -270, "ander_bahar_atlas", "chage_view_bttn.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    this.changeViewButton.on("pointerdown", this.changeViewButtonOnPress, this);
    this.changeViewButton.on("pointerup", this.changeViewButtonOnRelease, this);

    const gameName = this.scene.add
      .text(460, -260, "Andar Bahar1", textStyle)
      .setOrigin(0.5);

    this.topPanelContainer.add(headerBg);
    this.topPanelContainer.add(this.playerNameText);
    this.topPanelContainer.add(this.userWinAmountText);
    this.topPanelContainer.add(this.currentAmountText);
    this.topPanelContainer.add(this.roundIdText);
    this.topPanelContainer.add(this.roundIdTextValue);
    this.topPanelContainer.add(this.changeViewButton);
    this.topPanelContainer.add(gameName);
    this.topPanelContainer.add(downTransperent);
    this.topPanelContainer.add(this.currency);
  }
  changeViewButtonOnPress() { }
  changeViewButtonOnRelease() {
    this.viewSwitchCounter += 1;
    if (this.viewSwitchCounter % 2 === 1) {

      this.scene.secView.EnableChangedViewPanel();
      this.scene.bottomPanel.anderContainer.visible = false;
      this.scene.bottomPanel.baharContainer.visible = false;
      this.scene.coinPopUp.coinPopUpContainer.visible = false;
      // this.scene.gameStatus.coinToolTIp.visible = false;
      // this.scene.gameStatus.coinTextToolTip.visible = false;
      this.scene.secView.setDraggable(true);
      // call here
      this.scene.menuPopUp.hidePlayTourBtn();

      // console.log("Database.timerValue", Database.timerValue);
      if (this.scene.gameStatus.time == 0 || Database.timerValue < 0) {
        this.scene.secView.ShowLockButton();
      } else {
        this.scene.secView.RemoveLockButton();
      }
    } else {
      this.scene.menuPopUp.showPlayTourBtn();
      this.scene.secView.DisableChangedViewPanel();

      this.scene.secViewBet.DisableSecViewBetPopUp();
      // this.scene.gameStatus.coinToolTIp.visible = true;
      // this.scene.gameStatus.coinTextToolTip.visible = true;
      // this.scene.coinPopUp.coinPopUpContainer.visible = true;
      this.scene.bottomPanel.anderContainer.visible = true;
      this.scene.bottomPanel.baharContainer.visible = true;
      this.scene.secView.setDraggable(false);
    }
  }
}
export default TopPanel;
