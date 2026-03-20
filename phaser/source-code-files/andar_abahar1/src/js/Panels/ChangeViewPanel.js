import { Constant } from "../Constant.js";
import UserInteraction from "../UserInteraction.js";
import { Utils } from "../Utils.js";

class CreateViewPanel {
  constructor(scene) {
    this.scene = scene;
    // this.useIf = null;
    this.userInteraction = null;
    this.staticPanelContainer = null;
    this.scrollingPanelContainer = null;
    this.andercard = null;
    this.baharcard = null;
    this.label = null;
    //==
    this.minBetValue = 100;
    this.maxBetValue = 1000;
    this.payOutArr = [];
    this.totalBetArr = [];
    this.marketNameArr = [];
    this.blueTags = [];
    this.cardCode = [
      "1795",
      "1796",
      "1797",
      "1798",
      "1799",
      "1800",
      "1801",
      "1802",
      "1803",
      "1804",
      "1805",
      "1806",
      "1807",

      "1808",
      "1809",
      "1810",
      "1811",
      "1812",
      "1813",
      "1814",
      "1815",
      "1816",
      "1817",
      "1818",
      "1819",
      "1820",
    ];
    this.dynamicLockImageArr = [];
    this.menuButton = null;
  }
  CreateChangeViewPanel() {
    this.useIf = new UserInteraction(this.scene);
    this.CreateStaticPanel();
    this.CreateGreentagGrids();
    this.CreateTable();
    this.CreateMenuButtonContainer();
  }
  CreateStaticPanel() {
    this.staticPanelContainer = this.scene.add
      .container(
        Math.floor(Constant.game.config.width / 2),
        Math.floor(Constant.game.config.height / 2)
      )
      .setDepth(5);

    let whiteBg = this.scene.add
      .image(0, 580, "ander_bahar_atlas", "white_background.jpg")
      .setOrigin(0.5, 0.5)
      .setInteractive();
    let greenBg = this.scene.add
      .image(0, 40, "ander_bahar_atlas", "grean_bacground.png")
      .setOrigin(0.5, 0.5);

    let timerImage = this.scene.add
      .image(-530, -340, "ander_bahar_atlas", "timer_new.png")
      .setOrigin(0.5);
    const textStyleBold = {
      fontFamily: "Roboto-Bold",
      fontSize: "40px",
      fill: "#000000",
      fontStyle: "bold",
      align: "center",
    };
    this.timerValueText = this.scene.add
      .text(-530, -340, "0", textStyleBold)
      .setOrigin(0.5);

    this.staticPanelContainer.add(whiteBg);
    this.staticPanelContainer.add(greenBg);
    this.staticPanelContainer.add(timerImage);
    this.staticPanelContainer.add(this.timerValueText);
  }
  CreateGreentagGrids() {
    let gridOne = this.scene.add
      .image(-100, 40, "ander_bahar_atlas", "Result-card-box.png")
      .setOrigin(0.5);

    let gridTwo = this.scene.add
      .image(100, 40, "ander_bahar_atlas", "Result-card-box.png")
      .setOrigin(0.5);

    const textStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "40px",
      fill: "#FFFFFF",
      fontStyle: "normal",
      align: "center",
    };
    let anderTagImg = this.scene.add
      .image(-380, 40, "ander_bahar_atlas", "playerA.png")
      .setOrigin(0.5);
    let anderText = this.scene.add
      .text(-380, 40, "Andar", textStyle)
      .setOrigin(0.5);
    let baharTagImg = this.scene.add
      .image(380, 40, "ander_bahar_atlas", "playerB.png")
      .setOrigin(0.5);
    let baharText = this.scene.add
      .text(380, 40, "Bahar", textStyle)
      .setOrigin(0.5);

    this.andercard = this.scene.add
      .image(-100, 40, "cards", "1001")
      .setOrigin(0.5)
      .setScale(0.7)
      .setVisible(false);
    this.baharcard = this.scene.add
      .image(100, 40, "cards", "1001")
      .setOrigin(0.5)
      .setScale(0.7)
      .setVisible(false);

    this.staticPanelContainer.add(gridOne);
    this.staticPanelContainer.add(gridTwo);

    this.staticPanelContainer.add(anderTagImg);
    this.staticPanelContainer.add(anderText);
    this.staticPanelContainer.add(baharTagImg);
    this.staticPanelContainer.add(baharText);

    this.staticPanelContainer.add(this.andercard);
    this.staticPanelContainer.add(this.baharcard);
    this.staticPanelContainer.visible = false;
  }
  async SetCardsExplicitly(_response) {
    // console.log("res :::==>", _response);
    let cardObjArray = [];

    for (let i = 0; i < _response.length; i++) {
      if (parseInt(_response[i].IsOpen) === 0) {
        let cardCode = _response[i].CardCode;
        let playerId = _response[i].PlayerId;
        let cardValue = _response[i].CardValue;
        let cardObj = {
          cardCode: cardCode,
          playerId: playerId,
          cardValue: cardValue,
        };
        cardObjArray.push(cardObj);
      }
    }
    // console.log("cardObjArray", cardObjArray);
    for (let i = 0; i < cardObjArray.length; i++) {
      if (
        cardObjArray[i].playerId >= 1795 &&
        cardObjArray[i].playerId <= 1807
      ) {
        await this.delay(2000);
        this.andercard.visible = true;
        this.andercard.setTexture("cards", cardObjArray[i].cardCode);
        setTimeout(() => {
          this.andercard.visible = false;
        }, 200);
      } else if (cardObjArray[i].playerId >= 1808) {
        await this.delay(2000);
        this.baharcard.visible = true;
        this.baharcard.setTexture("cards", cardObjArray[i].cardCode);
        setTimeout(() => {
          this.baharcard.visible = false;
        }, 200);
      }
    }
  }
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  CreateTable() {
    this.label = this.scene.rexUI.add
      .label({
        background: this.scene.rexUI.add.roundRectangle({
          // radius: 0,
          // strokeColor: "#859",
        }),

        text: this.scene.add.text(0, 0, "", { fontSize: 40 }),
        icon: this.scene.rexUI.add.roundRectangle({
          width: 1250,
          height: 2540,
        }),
        space: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          icon: 10,
        },
      })
      .setPosition(705, 2660)
      .setVisible(false)
      .layout()
      .setDepth(5);
    let isDragging = false;
    let pointerOffsetY = 0;
    let minY = 870;
    let maxY = 2650;
    let hasData = true;
    this.label
      .on("pointerdown", (pointer) => {
        isDragging = true;
        pointerOffsetY = pointer.y - this.label.y;
        pointerOffsetY = pointerOffsetY + 5;
      })
      .on("pointerup", () => {
        isDragging = false;
      })
      .on("pointermove", (pointer) => {
        if (isDragging) {
          const targetY = Phaser.Math.Clamp(
            pointer.y - pointerOffsetY,
            minY,
            maxY
          );
          const smoothingFactor = 0.25;
          this.label.y += (targetY - this.label.y) * smoothingFactor;
        }
      });
    this.scrollingPanelContainer = this.scene.add.container(0, 0).setDepth(5);
    const textStyle = {
      fontFamily: "RobotoCondensed-Regular",
      fontSize: "40px",
      fill: "#090909",
      fontStyle: "normal",
      align: "center",
    };
    const textStyleBold = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#090909",
      fontStyle: "bold",
      align: "center",
    };
    let upperLabel = this.scene.add
      .image(621, 1660, "ander_bahar_atlas", "color-box1.png")
      .setOrigin(0.5);
    this.scrollingPanelContainer.add(upperLabel);
    this.label.pin([upperLabel]);
    //=============Headers===============
    let gameName = this.scene.add
      .text(150, 1660, "Match Odds", textStyle)
      .setOrigin(0.5);
    let blueHeaderTag = this.scene.add
      .image(401, 1660, "ander_bahar_atlas", "Color-box2.png")
      .setOrigin(0.5);
    let backText = this.scene.add
      .text(401, 1660, "Back", textStyle)
      .setOrigin(0.5);
    let pinkHeaderTag = this.scene.add
      .image(610, 1660, "ander_bahar_atlas", "color-box3.png")
      .setOrigin(0.5);
    let layText = this.scene.add
      .text(610, 1660, "Lay", textStyle)
      .setOrigin(0.5);
    let minText = this.scene.add
      .text(800, 1660, "MinBet", textStyle)
      .setOrigin(0.5);
    this.minBetValue = this.scene.add
      .text(900, 1660, "0", textStyle)
      .setOrigin(0.5);
    let maxText = this.scene.add
      .text(1050, 1660, "MaxBet", textStyle)
      .setOrigin(0.5);
    this.maxBetValue = this.scene.add
      .text(1155, 1660, "0", textStyle)
      .setOrigin(0.5);
    //-------------------------------
    this.scrollingPanelContainer.add([
      gameName,
      blueHeaderTag,
      backText,
      pinkHeaderTag,
      layText,
      minText,
      this.minBetValue,
      maxText,
      this.maxBetValue,
    ]);
    this.label.pin([
      gameName,
      blueHeaderTag,
      backText,
      pinkHeaderTag,
      layText,
      minText,
      this.minBetValue,
      maxText,
      this.maxBetValue,
    ]);
    //===================================
    let deviders,
      blueTag,
      Name,
      payOut,
      totalBet,
      pinkTag,
      layTextValueUp,
      layTextValueDown,
      blankDashUp,
      blankDashDown,
      nextBlankDashUp,
      nextBlankDashDown,
      lockBackAnder,
      lockBackBahar,
      lockLayAnder,
      lockLayBahar;
    //=====
    for (let i = 0; i <= 12; i++) {
      deviders = this.scene.add
        .image(621, 1811 + i * 100, "ander_bahar_atlas", "divider2_origin.png")
        .setAlpha(2)
        .setScale(1, 2);
      blueTag = this.scene.add
        .image(401, 1760 + i * 100, "ander_bahar_atlas", "Color-box2.png")
        .setOrigin(0.5);
      lockBackAnder = this.scene.add
        .image(401, 1760 + i * 100, "ander_bahar_atlas", "lockBack.png")
        .setOrigin(0.5)
        .setScale(2.4);
      // .setVisible(false);

      Name = this.scene.add
        .text(130, 1760 + i * 100, "Ander", textStyleBold)
        .setOrigin(0.5);
      payOut = this.scene.add
        .text(401, 1740 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      totalBet = this.scene.add
        .text(401, 1780 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      totalBet.Name = this.cardCode[i];
      blankDashUp = this.scene.add
        .text(830, 1740 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      blankDashDown = this.scene.add
        .text(830, 1780 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      pinkTag = this.scene.add
        .image(610, 1760 + i * 100, "ander_bahar_atlas", "color-box3.png")
        .setOrigin(0.5);
      lockLayAnder = this.scene.add
        .image(610, 1760 + i * 100, "ander_bahar_atlas", "lockBack.png")
        .setOrigin(0.5)
        .setScale(2.4);
      layTextValueUp = this.scene.add
        .text(610, 1740 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      layTextValueDown = this.scene.add
        .text(610, 1780 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      nextBlankDashUp = this.scene.add
        .text(1100, 1740 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      nextBlankDashDown = this.scene.add
        .text(1100, 1780 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);

      this.blueTags.push(blueTag);
      this.dynamicLockImageArr.push(lockBackAnder);
      this.marketNameArr.push(Name);
      this.payOutArr.push(payOut);
      this.totalBetArr.push(totalBet);
      this.scrollingPanelContainer.add(deviders);
      this.scrollingPanelContainer.add(blueTag);
      this.scrollingPanelContainer.add(Name);
      this.scrollingPanelContainer.add(payOut);
      this.scrollingPanelContainer.add(totalBet);
      this.scrollingPanelContainer.add(blankDashUp);
      this.scrollingPanelContainer.add(blankDashDown);
      this.scrollingPanelContainer.add(pinkTag);
      this.scrollingPanelContainer.add(layTextValueUp);
      this.scrollingPanelContainer.add(layTextValueDown);
      this.scrollingPanelContainer.add(nextBlankDashUp);
      this.scrollingPanelContainer.add(nextBlankDashDown);
      this.scrollingPanelContainer.add(lockBackAnder);
      this.scrollingPanelContainer.add(lockLayAnder);
      this.label.pin([
        deviders,
        blueTag,
        Name,
        payOut,
        totalBet,
        blankDashUp,
        blankDashDown,
        pinkTag,
        layTextValueUp,
        layTextValueDown,
        nextBlankDashUp,
        nextBlankDashDown,
        lockBackAnder,
        lockLayAnder,
      ]);
    }
    let devider = this.scene.add
      .image(621, 3020, "ander_bahar_atlas", "divider3.png")
      .setOrigin(0.5);
    for (let i = 13; i <= 25; i++) {
      deviders = this.scene.add
        .image(621, 1829 + i * 100, "ander_bahar_atlas", "divider2_origin.png")
        .setAlpha(2)
        .setScale(1, 2);
      blueTag = this.scene.add
        .image(401, 1780 + i * 100, "ander_bahar_atlas", "Color-box2.png")
        .setOrigin(0.5);
      lockBackBahar = this.scene.add
        .image(401, 1780 + i * 100, "ander_bahar_atlas", "lockBack.png")
        .setOrigin(0.5)
        .setScale(2.4);
      // .setVisible(false);

      Name = this.scene.add
        .text(130, 1780 + i * 100, "Ander", textStyleBold)
        .setOrigin(0.5);
      payOut = this.scene.add
        .text(401, 1760 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      totalBet = this.scene.add
        .text(401, 1800 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      totalBet.Name = this.cardCode[i];
      blankDashUp = this.scene.add
        .text(830, 1760 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      blankDashDown = this.scene.add
        .text(830, 1800 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      pinkTag = this.scene.add
        .image(610, 1780 + i * 100, "ander_bahar_atlas", "color-box3.png")
        .setOrigin(0.5);
      lockLayBahar = this.scene.add
        .image(610, 1780 + i * 100, "ander_bahar_atlas", "lockBack.png")
        .setOrigin(0.5)
        .setScale(2.4);
      layTextValueUp = this.scene.add
        .text(610, 1760 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      layTextValueDown = this.scene.add
        .text(610, 1800 + i * 100, "0", textStyleBold)
        .setOrigin(0.5);
      nextBlankDashUp = this.scene.add
        .text(1100, 1760 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);
      nextBlankDashDown = this.scene.add
        .text(1100, 1800 + i * 100, "---", textStyleBold)
        .setOrigin(0.5);

      this.blueTags.push(blueTag);
      this.dynamicLockImageArr.push(lockBackBahar);
      this.marketNameArr.push(Name);
      this.payOutArr.push(payOut);
      this.totalBetArr.push(totalBet);
      this.scrollingPanelContainer.add(deviders);
      this.scrollingPanelContainer.add(blueTag);
      this.scrollingPanelContainer.add(Name);
      this.scrollingPanelContainer.add(payOut);
      this.scrollingPanelContainer.add(totalBet);
      this.scrollingPanelContainer.add(blankDashUp);
      this.scrollingPanelContainer.add(blankDashDown);
      this.scrollingPanelContainer.add(pinkTag);
      this.scrollingPanelContainer.add(layTextValueUp);
      this.scrollingPanelContainer.add(layTextValueDown);
      this.scrollingPanelContainer.add(nextBlankDashUp);
      this.scrollingPanelContainer.add(nextBlankDashDown);
      this.scrollingPanelContainer.add(lockBackBahar);
      this.scrollingPanelContainer.add(lockLayBahar);
      this.label.pin([
        deviders,
        blueTag,
        Name,
        payOut,
        totalBet,
        blankDashUp,
        blankDashDown,
        pinkTag,
        layTextValueUp,
        layTextValueDown,
        nextBlankDashUp,
        nextBlankDashDown,
        lockBackBahar,
        lockLayBahar,
      ]);
    }
    // console.log("this.scrollingPanelContainer", this.scrollingPanelContainer);
    let endTape = this.scene.add
      .image(621, 4340, "ander_bahar_atlas", "divider3.png")
      .setOrigin(0.5);
    this.scrollingPanelContainer.add(devider);
    this.label.pin([devider]);
    this.scrollingPanelContainer.add(endTape);
    this.label.pin([endTape]);

    this.scrollingPanelContainer.visible = false;
    this.useIf.ApplyScrollability(this.scrollingPanelContainer);
    //+=============================
    this.scene.input.on(
      "wheel",
      (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
        if (hasData) {
          this.label.y = Phaser.Math.Clamp(
            this.label.y + deltaY * 0.5,
            minY,
            maxY
          );
        }
      }
    );
  }
  setDraggable(isDraggable) {
    if (isDraggable) {
      this.label.setInteractive({
        draggable: true,
      });
    } else {
      this.label.setInteractive(false);
    }
  }
  CreateMenuButtonContainer() {
    this.menuBtnContainer = this.scene.add
      .container(
        Math.floor(Constant.game.config.width / 2),
        Math.floor(Constant.game.config.height / 2)
      )
      .setDepth(5);
    this.menuButton = this.scene.add
      .image(544, -125, "ander_bahar_atlas", "menu.png")
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.menuButton.on(
      "pointerdown",
      this.scene.gameStatus.OnSideMenuBarPress,
      this
    );
    this.menuButton.on(
      "pointerup",
      this.scene.gameStatus.OnSideMenuBarRelease,
      this
    );
    this.menuBtnContainer.add(this.menuButton);
    this.menuBtnContainer.visible = false;
  }
  ShowLockButton() {
    for (let i = 0; i < this.dynamicLockImageArr.length; i++) {
      this.dynamicLockImageArr[i].visible = true;
    }
  }
  RemoveLockButton() {
    for (let i = 0; i < this.dynamicLockImageArr.length; i++) {
      this.dynamicLockImageArr[i].visible = false;
    }
  }
  EnableChangedViewPanel() {
    Constant.isSecondView = true;
    this.staticPanelContainer.visible = true;
    this.scrollingPanelContainer.visible = true;
    this.label.visible = true;
    this.menuBtnContainer.visible = true;
    this.useIf.changedViewPanelGraphics.visible = true;
    this.scene.gameStatus.coinToolTIp.visible = false;
    this.scene.gameStatus.coinTextToolTip.visible = false;
  }
  DisableChangedViewPanel() {
    Constant.isSecondView = false;
    this.staticPanelContainer.visible = false;
    this.scrollingPanelContainer.visible = false;
    this.label.visible = false;
    this.menuBtnContainer.visible = false;
    this.useIf.changedViewPanelGraphics.visible = false;
    this.scene.gameStatus.coinToolTIp.visible = true;
    this.scene.gameStatus.coinTextToolTip.visible = true;
  }
  SetDataForTable(_res, _min, _max) {
    //min and max bet amount set
    this.minBetValue.setText(_min);
    this.maxBetValue.setText(Utils.convertToK(_max));

    for (let i = 0; i < _res.Runners.length; i++) {
      console.log("res.Runners", _res.Runners, i);

      this.marketNameArr[i].setText(_res.Runners[i].Name);
      this.payOutArr[i].setText(_res.Runners[i].Payout);
      this.blueTags[i].setInteractive({ useHandCursor: true });
      this.blueTags[i].on("pointerdown", () => {
        this.OnBlueTagPressed();
      });
      this.blueTags[i].on("pointerup", () => {
        this.OnBlueTagReleased(i, _res.Runners[i].scode);
      });
    }
  }
  OnBlueTagPressed() { }
  OnBlueTagReleased(_index, _scode) {
    this.scene.secViewBet.EnableSecViewBetPopUp(_index, _scode);
  }
  EnableBlueTags() {
    for (let i = 0; i < this.blueTags.length; i++) {
      this.blueTags[i].setInteractive({ useHandCursor: true });
    }
  }
  DisableBlueTags() {
    for (let i = 0; i < this.blueTags.length; i++) {
      this.blueTags[i].removeInteractive();
    }
  }
}
export default CreateViewPanel;
