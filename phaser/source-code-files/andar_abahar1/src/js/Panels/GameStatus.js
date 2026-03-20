import { Constant } from "../Constant.js";
import { Database } from "../Network/DataBase.js";
import { Utils } from "../Utils.js";

class GameStatus {
  constructor(scene) {
    this.scene = scene;
    this.gameStatusBoardContainer = null;
    this.totalPlayerInTheGame = 14;
    this.time = 0;
    this.timerEvent = null;
    this.minValue;
    this.maxValue;
    this.frameIndex = 1;

    this.stateArr = ["INIT", "BETOPEN", "BETCLOSE", "OPENCARD"];
    this.shortlyPBg = null;
    this.shortlyPImg = null;
  }
  CreateGameStatusTable() {
    this.scene.game.events.on("UPDATE_COUNTER_1", this.onCoinUpdate, this);
    this.gameStatusBoardContainer = this.scene.add.container(0, 0); //.setDepth(4);
    this.CreatePlayerOnGame();
    this.CreateCoinArea();
    this.TimerArea();
    this.MinMaxTable();
    this.sideMenuBar();
  }
  /**
   * here you will get the information regarding how
   * many players in the game currently
   * and
   * the coin
   */
  CreatePlayerOnGame() {
    let playerOnGameBg = this.scene.add
      .image(160, 1210, "ander_bahar_atlas", "player.png")
      .setOrigin(0.5);
    const textStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "40px",
      fill: "#FDED73",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center",
    };
    this.totalPlayerText = this.scene.add
      .text(200, 1190, this.totalPlayerInTheGame, textStyle)
      .setOrigin(0.5);

    const playersTextStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "30px",
      fill: "#FDED73",
      fontStyle: "bold",
      align: "center",
    };
    let playersText = this.scene.add
      .text(210, 1230, "Players", playersTextStyle)
      .setOrigin(0.5);

    this.gameStatusBoardContainer.add(playerOnGameBg);
    this.gameStatusBoardContainer.add(this.totalPlayerText);
    this.gameStatusBoardContainer.add(playersText);
  }
  CreateCoinArea() {
    let coinRoundGlow = this.scene.add
      .image(370, 1220, "ander_bahar_atlas", "coin_round.png")
      .setOrigin(0.5);
    this.coin = this.scene.add
      .sprite(370, 1220, "ander_bahar_atlas", "B_C1.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setScale(0.85);
    this.coinToolTIp = this.scene.add
      .sprite(370, 1135, "strip")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setScale(1);
    const styleOne = {
      fontFamily: "Montserrat-Bold",
      fontSize: "24px",
      fill: "#1EBFAF",
      fontStyle: "bold",
      align: "center",
    };
    this.coinText = this.scene.add.text(370, 1220, "", styleOne).setOrigin(0.5);
    this.coinTextToolTip = this.scene.add.text(this.coinToolTIp.x, this.coinToolTIp.y, "", {
      fontFamily: "Montserrat-Bold",
      fontSize: 35,
      fill: "#eeb64dff",
      fontStyle: "bold",
      align: "center",
    }).setOrigin(0.5);
    this.coin.on("pointerdown", this.OnCoinPressed, this);
    this.coin.on("pointerup", this.OnCoinReleased, this);
    this.gameStatusBoardContainer.add(coinRoundGlow);
    this.gameStatusBoardContainer.add(this.coin);
    this.gameStatusBoardContainer.add(this.coinText);
  }

  onCoinUpdate(index) {
    // console.log("onCoinUpdate", index, Database.coinStack);
    this.coin.setTexture("ander_bahar_atlas", `B_C${index + 1}.png`)
    this.coinText.setText(Utils.convertToK(Database.coinStack[index]))
    this.coinText.setStyle(Constant.coinvalueTextStyle[index]);
    this.coinTextToolTip.setText(Utils.convertToK(Database.coinStack[index]));
    this.scene.coinPopUp.CoinGlowupdate(index);
    Database.betAmount = Utils.convertToK(Database.coinStack[index]);
  }
  /**
   * Timer for placing the bet
   */
  TimerArea() {
    const BetTextStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: 35,
      fill: "#FEFEFF",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center",
    };
    this.timer_bg_image = this.scene.add
      .image(621, 1230, "ander_bahar_atlas", "bet-place.png")
      .setOrigin(0.5);
    this.placeBetNomText = this.scene.add
      .text(621, 1190, "Place bet num", BetTextStyle)
      .setOrigin(0.5);
    this.timerShadow = this.scene.add
      .image(621, 1240, "ander_bahar_atlas", "timer_black_bg.png")
      .setOrigin(0.5);

    this.timerTextValue = {
      fontFamily: "Roboto-Bold",
      fontSize: 35,
      fill: "#FFF728",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center",
    };
    this.timerText = this.scene.add
      .text(621, 1240, 0, this.timerTextValue)
      .setOrigin(0.5);

    this.gameStatusBoardContainer.add(this.timer_bg_image);
    this.gameStatusBoardContainer.add(this.placeBetNomText);
    this.gameStatusBoardContainer.add(this.timerShadow);
    this.gameStatusBoardContainer.add(this.timerText);

    this.timerEvent = setInterval(() => {
      this.CountDown();
    }, 1000);
  }
  /**
   * maximum and minimum bet amount will be
   * spawned over here
   */
  MinMaxTable() {
    this.minMaxBaseImage = this.scene.add
      .image(980, 1215, "ander_bahar_atlas", "min-and-max-box.png")
      .setOrigin(0.5);
    const minMaxTextStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#FEEF72",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center",
    };
    let minText = this.scene.add.text(880, 1215, "Min", minMaxTextStyle);
    this.minValue = this.scene.add.text(880, 1170, "", minMaxTextStyle);
    let maxText = this.scene.add.text(1000, 1215, "Max", minMaxTextStyle);
    this.maxValue = this.scene.add.text(1000, 1170, "", minMaxTextStyle);

    this.gameStatusBoardContainer.add(this.minMaxBaseImage);
    this.gameStatusBoardContainer.add(minText);
    this.gameStatusBoardContainer.add(this.minValue);
    this.gameStatusBoardContainer.add(maxText);
    this.gameStatusBoardContainer.add(this.maxValue);
  }
  /**
   * side menu button
   * by pressing on that a seperate pop up will be enabled
   */
  sideMenuBar() {
    this.sideMenuButton = this.scene.add
      .image(1165, 1215, "ander_bahar_atlas", "menu.png")
      .setInteractive({ useHandCursor: true });
    this.sideMenuButton.on("pointerdown", this.OnSideMenuBarPress, this);
    this.sideMenuButton.on("pointerup", this.OnSideMenuBarRelease, this);

    this.gameStatusBoardContainer.add(this.sideMenuButton);
  }
  OnSideMenuBarPress() { }
  OnSideMenuBarRelease() {
    // view menu pop up
    this.scene.secView.menuButton.visible = false;
    this.scene.menuPopUp.EnableMenuPopUp();
  }
  /**
   * timer evenet call back method
   */
  CountDown() {
    if (Database.isCountDownStart) {
      this.time -= 1;
      this.timerText.setText(this.time);
      const { secView, bottomPanel, secViewBet, coinPopUp, guideLines } =
        this.scene;
      secView.timerValueText.setText(this.time);
      if (this.time === 0) {
        Database.isCountDownStart = false;
      }
      if (this.time == 3) {
        secView.DisableBlueTags();
        secViewBet.DisableSecViewBetPopUp();
        coinPopUp.DisableCoinPopUp();
        guideLines.EnableAlertPopUp();
        for (let i = 0; i < secView.dynamicLockImageArr.length; i++) {
          secView.dynamicLockImageArr[i].setVisible(true);
        }
      }
    }
  }

  OnCoinPressed() { }
  /**
   * On press to the coin a pop up of multiple available coin will be spawn
   */
  OnCoinReleased() {
    this.coinToolTIp.setVisible(false);
    this.coinTextToolTip.setVisible(false);
    this.scene.coinPopUp.EnableCoinPopUp();
    this.scene.coinPopUp.coinArray[0];
  }
  /**
   * setting frame and value of the coin icon
   * according to the click on the coin of the coinPopUp array
   * @param {coin text value} _cointextAmount
   * @param {inline css style} _textStyle
   * @param {index} _index
   */
  SetCoinFrame(_cointextAmount, _textStyle, _index) {
    this.coin.setFrame("B_C" + _index + ".png");
    this.coinText.setText(_cointextAmount);
    this.coinText.setStyle(_textStyle[_index - 1]);

    this.frameIndex = _index;
    Database.betAmount = _cointextAmount;
  }
  ResetCoinData() {
    this.coin.setFrame("B_C1.png");
    let text = this.scene.coinPopUp.coinTextArray[0]._text;
    this.coinText.setText(text);
    this.coinText.setStyle(Constant.coinvalueTextStyle[0]);
    this.frameIndex = 1;
    Database.betAmount = text;
    this.scene.coinPopUp.roundGlow.setPosition(
      Constant.game.config.width / 3.35,
      Constant.game.config.height / 2.2
    );
  }

  MinMaxTableDataSet(_minValue, _maxValue) {
    this.minValue.setText(Utils.convertToK(_minValue));
    this.maxValue.setText(Utils.convertToK(_maxValue));
  }

  NextRoundPop(key) {
    if (!this.stateArr.includes(key)) {
      Constant.IsMoving = false;
      this.shortlyPBg = this.scene.add.image(621, 1340, "loaderBg").setDepth(9);
      this.shortlyPImg = this.scene.add
        .image(621, 1340, "ander_bahar_atlas", "box-popup-M.png")
        .setDepth(9);
    } else {
      Constant.IsMoving = true;
    }
  }

  NextRoundPopDestroy() {
    if (this.shortlyPBg != null) {
      this.shortlyPImg.destroy();
      this.shortlyPBg.destroy();
    }
  }
  betstopPop() {
    let betStop = this.scene.add.image(Constant.game.config.width / 2,
      Constant.game.config.height / 3.7, "ander_bahar_atlas", "close_tab.png").setDepth(9);
    setTimeout(() => {
      betStop.destroy();
    }, 300);
  }
}
export default GameStatus;
