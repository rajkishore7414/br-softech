import { Constant } from "../Constant.js";
import { Utils } from "../Utils.js";
class CoinPopUp {
  constructor(scene) {
    this.scene = scene;
    this.coinPopUpContainer;
    this.coinArray = [];
    this.coinTextArray = [];
    this.coinArrayToolTip = [];
    this.coinTextArrayToolTip = [];
    this.highlighterArr = [];
    this.isCoinVisible = false;
  }
  CreateCoinPopUp() {
    this.scene.game.events.on("SECOND_VIEW_DISABLE", this.onChangeViewClose, this);
    // this.scene.game.events.emit("UPDATE_COUNTER_1", this.onCoinClick, this);
    this.coinPopUpContainer = this.scene.add.container(0, 0);
    let popUpBg = this.scene.add
      .image(
        Constant.game.config.width / 1.64,
        Constant.game.config.height / 2.2,
        "ander_bahar_atlas",
        "coin_bg.png"
      )
      .setOrigin(0.5, 0.5)
      .setInteractive();
    popUpBg.on("pointerdown", this.onPopUpBgClicked, this);
    popUpBg.on("pointerup", this.onPopUpBgReleased, this);

    this.roundGlow = this.scene.add
      .image(
        Constant.game.config.width / 3.35,
        Constant.game.config.height / 2.2,
        "ander_bahar_atlas",
        "chip_selection.png"
      )
      .setOrigin(0.5);
    let round;
    for (let i = 0; i < 7; i++) {
      round = this.scene.add
        .sprite(
          Constant.game.config.width / 3.34 + i * 125,
          Constant.game.config.height / 2.2,
          "ander_bahar_atlas",
          "coin_round.png"
        )
        .setScale(1.15);
      this.highlighterArr.push(round);
      let betCoin = this.scene.add
        .sprite(
          Constant.game.config.width / 3.34 + i * 125,
          Constant.game.config.height / 2.2,
          "ander_bahar_atlas",
          "B_C1.png"
        )
        .setOrigin(0.5, 0.5)
        .setInteractive({ useHandCursor: true });

      let betCoinToolTip = this.scene.add
        .sprite(
          Constant.game.config.width / 3.34 + i * 125,
          Constant.game.config.height / 2.37,
          "strip"
        )
        .setOrigin(0.5).setScale(0.7).setVisible(false);
      let betCoinToolTipText = this.scene.add
        .text(
          betCoinToolTip.x,
          betCoinToolTip.y,
          "0.001", {
          fontFamily: "Montserrat-Bold",
          fontSize: 25,
          fill: "#eeb64dff",
          fontStyle: "bold",
          align: "center"
        }
        )
        .setOrigin(0.5).setVisible(false);
      let betCoinText = this.scene.add
        .text(
          Constant.game.config.width / 3.34 + i * 125,
          Constant.game.config.height / 2.2,
          "coinText",
          Constant.coinvalueTextStyle[i]
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      this.coinTextArray.push(betCoinText);
      this.coinTextArrayToolTip.push(betCoinToolTipText);
      let j = 1 + i;
      betCoin.setFrame("B_C" + j + ".png");
      this.coinArray.push(betCoin);
      this.coinArrayToolTip.push(betCoinToolTip);

      betCoin.on(
        "pointerdown",
        () => {
          this.OnBetCoinPressed();
        },
        this
      );

      betCoin.on(
        "pointerup",
        () => {
          this.OnBetCoinReleased(
            this.coinArray[i],
            this.coinTextArray[i],
            Constant.coinvalueTextStyle,
            j
          );
        },
        this
      );

      betCoinText.on(
        "pointerdown",
        () => {
          this.OnBetCoinPressed();
        },
        this
      );

      betCoinText.on(
        "pointerup",
        () => {
          this.OnBetCoinReleased(
            this.coinArray[i],
            this.coinTextArray[i],
            Constant.coinvalueTextStyle,
            j
          );
        },
        this
      );
    }

    this.coinPopUpContainer.add(popUpBg);
    this.coinPopUpContainer.add(this.roundGlow);
    this.coinPopUpContainer.add(this.highlighterArr);
    this.coinPopUpContainer.add(this.coinArray);
    this.coinPopUpContainer.add(this.coinTextArray);
    this.coinPopUpContainer.add(this.coinArrayToolTip);
    this.coinPopUpContainer.add(this.coinTextArrayToolTip);
    this.coinPopUpContainer.visible = false;
  }

  onPopUpBgClicked() {
  }
  onPopUpBgReleased() {
    // this.coinArrayToolTip.forEach(element => {
    //   element.setVisible(false);
    // });

  }
  EnableCoinPopUp() {
    this.coinPopUpContainer.visible = true;
    this.coinArrayToolTip.forEach(element => {
      element.setVisible(true);
    });
    this.coinTextArrayToolTip.forEach(element => {
      element.setVisible(true);
    });
    this.isCoinVisible = true;
  }
  DisableCoinPopUp() {
    if (Constant.isSecondView) {
      this.scene.gameStatus.coinToolTIp.visible = false;
      this.scene.gameStatus.coinTextToolTip.visible = false;
    } else {
      this.scene.gameStatus.coinToolTIp.visible = true;
      this.scene.gameStatus.coinTextToolTip.visible = true;
    }
    // this.scene.gameStatus.coinToolTIp.visible = true;
    // this.scene.gameStatus.coinTextToolTip.visible = true;
    this.coinPopUpContainer.visible = false;
    this.coinArrayToolTip.forEach(element => {
      element.setVisible(false);
    });
    this.coinTextArrayToolTip.forEach(element => {
      element.setVisible(false);
    });
    this.isCoinVisible = false;
  }
  OnBetCoinPressed() { }
  OnBetCoinReleased(_coin, _coinText, _coinTextStyleArr, _index) {
    this.roundGlow.x = _coin.x;
    this.scene.gameStatus.coinTextToolTip.text = Utils.convertToK(_coinText._text);
    this.scene.game.events.emit("UPDATE_COIN_SECOND", _index);
    this.DisableCoinPopUp();
    this.scene.gameStatus.SetCoinFrame(
      _coinText._text,
      _coinTextStyleArr,
      _index
    );
  }

  CoinGlowupdate(i) {
    this.roundGlow.x = this.coinArray[i].x;
  }

  onCoinClick(index) {
    // this.scene.gameStatus.coinTextToolTip.text = _coinText._text;
    // this.scene.gameStatus.SetCoinFrame(
    //   _coinText._text,
    //   _coinTextStyleArr,
    //   index
    // );
  }

  onChangeViewClose() {

  }
}
export default CoinPopUp;
