import { Constant } from "../Constant.js";
import { Utils } from "../Utils.js";
import { BetPlace } from "../BetPlace.js";
import { Database } from "../Network/DataBase.js";
class BottomPanel {
  constructor(scene) {
    this.scene = scene;
    this.anderContainer = null;
    this.baharContainer = null;
    this.anderPayOutTextArray = [];
    this.baharPayOutTextArray = [];
    this.currPlayerBetAnder = 0;
    this.globalPlayerbetAnder = 0;
    this.anderGridsArray = [];
    this.baharGridsArray = [];
    this.winOuterAnim = [];
    this.allCardCodes = [];
    this.anderTableCardsArray = [];
    this.baharTableCardsArray = [];
    this.andersCodeArr = [];
    this.baharsCodeArr = [];
    this.anderSelectionIdArray = [];
    this.baharSelectionIdArray = [];
    this.coinTextVal = [];
    this.animativeCoinArray = [];
    //==========
    this.anderBetPlayerAndGlobal = [];
    this.baharBetPlayerAndGlobal = [];
    // this.combineValue = [];
  }
  /**
   * here I am calling multiple methods regarding bottom panel
   */
  CreateBottomPanel() {
    let boxTagArray = [];
    boxTagArray = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const anderTextStyle = {
      fontFamily: "Roboto-Bold",
      fontSize: "30px",
      fill: "#FEFFFE",
      fontStyle: "bold",
      align: "center",
    };
    const styleForBetTexts = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#C2CF70",
      fontStyle: "bold",
      align: "center",
    };
    const styleForBetTexts1 = {
      fontFamily: "Roboto-Bold",
      fontSize: "35px",
      fill: "#C2CF70",
      fontStyle: "bold",
      align: "right",
      rtl: true,
      stroke: "#000000",
      strokeThickness: 3,
    };
    const cardIconTextStyle = {
      fontFamily: "Americana Extra Bold",
      fontSize: "55px",
      fill: "#C2CF70",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 3,
      align: "center",
    };
    this.CreateAnderArea(
      cardIconTextStyle,
      anderTextStyle,
      styleForBetTexts,
      styleForBetTexts1,
      boxTagArray
    );
    this.CreateBaharArea(
      cardIconTextStyle,
      anderTextStyle,
      styleForBetTexts,
      styleForBetTexts1,
      boxTagArray
    );
    this.CreateCoinsToAnimate();
    this.CreateWinOuterAnim();
  }
  /**
   *
   * @param {inline style} _cardIconTextStyle
   * @param {inline style} _anderTextStyle
   * @param {inline style} _styleForBetTexts
   * @param {inline style} styleForBetTexts1
   * @param {array} _boxTagArray
   */
  CreateAnderArea(
    _cardIconTextStyle,
    _anderTextStyle,
    _styleForBetTexts,
    styleForBetTexts1,
    _boxTagArray
  ) {
    this.anderContainer = this.scene.add.container(0, 0).setDepth(4);
    let anderTagName = this.scene.add.image(
      621,
      1368,
      "ander_bahar_atlas",
      "Andar.png"
    );
    this.anderContainer.add(anderTagName);
    this.CreateAnderBettingArea(
      _cardIconTextStyle,
      _anderTextStyle,
      _styleForBetTexts,
      styleForBetTexts1,
      _boxTagArray
    );
  }
  /**
   *
   * @param {inline style} _cardIconTextStyle
   * @param {inline style} _anderTextStyle
   * @param {inline style} _styleForBetTexts
   * @param {inline style} styleForBetTexts1
   * @param {array} _boxTagArray
   * here I am creating the ander cards, grids, tags, payOut text, betAmount text
   * by calling a arrow function CreateBettingArea in loop
   */
  CreateAnderBettingArea(
    _cardIconTextStyle,
    _anderTextStyle,
    _styleForBetTexts,
    _styleForBetTexts1,
    _boxTagArray
  ) {
    let anderCardCodes = [];
    anderCardCodes = [
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
    ];
    const CreateBettingArea = (x, y, isUp) => {
      let bettingGrids = this.scene.add
        .image(x, y, "ander_bahar_atlas", "card-box.png")
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      let anderPayOutText = this.scene.add
        .text(x, y - 100, "0", _anderTextStyle)
        .setOrigin(0.5);
      let globalBetForAnder = this.scene.add
        .text(
          x,
          y + 100,
          this.currPlayerBetAnder + "/" + this.globalPlayerbetAnder,
          _styleForBetTexts
        )
        .setOrigin(0.5);
      let cardIconText = this.scene.add
        .text(x, y, "A", _cardIconTextStyle)
        .setOrigin(0.5);

      let andercards = this.scene.add
        .image(x, y, "4001")
        .setOrigin(0.5)
        .setScale(0.5)
        .setVisible(false);
      return {
        bettingGrids,
        anderPayOutText,
        globalBetForAnder,
        cardIconText,
        andercards,
      };
    };
    for (let i = 0; i <= 12; i++) {
      const isUp = i < 7;
      const x = isUp ? 110 + i * 170 : -995 + i * 170;
      const y = isUp ? 1580 : 1850;
      const {
        bettingGrids,
        anderPayOutText,
        // betTextForAnder,
        // betTextForGlobalPlayer,
        globalBetForAnder,
        cardIconText,
        andercards,
      } = CreateBettingArea(x, y, isUp);
      //=======================Grids Rect============================
      this.anderGridsArray.push(bettingGrids);
      this.anderContainer.add(bettingGrids);
      bettingGrids.on("pointerDown", () => {
        this.OnAnderGridPressed();
      });
      bettingGrids.on("pointerup", () => {
        if (this.scene.gameStatus.time >= 3) {
          this.OnAnderGridReleased(
            this.andersCodeArr[i],
            this.anderSelectionIdArray[i],
            bettingGrids.x,
            bettingGrids.y,
            this.anderBetPlayerAndGlobal[i],
            i
          );
        }
        else {
          // bet close popup here
          this.scene.gameStatus.betstopPop();
        }
      });
      //======================Pay Out Text===========================
      this.anderPayOutTextArray.push(anderPayOutText);
      this.anderContainer.add(anderPayOutText);
      //======================bottom "100/100k"======================
      this.anderContainer.add(globalBetForAnder);
      this.anderBetPlayerAndGlobal.push(globalBetForAnder);
      //======================Icon like A,2,3,4...====================
      this.anderContainer.add(cardIconText);
      cardIconText.setText(_boxTagArray[i]);
      //=====================Invisible cards==========================
      this.anderTableCardsArray.push(andercards);
      andercards.Name = anderCardCodes[i];
      this.anderContainer.add(andercards);
      this.allCardCodes.push(andercards);
      //==============================================================
    }
  }
  /**
   *
   * @param {inline style} _cardIconTextStyle
   * @param {inline style} _anderTextStyle
   * @param {inline style} _styleForBetTexts
   * @param {inline style} styleForBetTexts1
   * @param {array} _boxTagArray
   */
  CreateBaharArea(
    _cardIconTextStyle,
    _anderTextStyle,
    _styleForBetTexts,
    _styleForBetTexts1,
    _boxTagArray
  ) {
    this.baharContainer = this.scene.add
      .container(
        // Constant.game.config.width / 2,
        // Constant.game.config.height / 1.1487
        0,
        0
      )
      .setDepth(4);
    let baharTagName = this.scene.add.image(
      621,
      2067,
      "ander_bahar_atlas",
      "Bahar.png"
    );
    this.baharContainer.add(baharTagName);
    this.CreateBaharBettingArea(
      _cardIconTextStyle,
      _anderTextStyle,
      _styleForBetTexts,
      _styleForBetTexts1,
      _boxTagArray
    );
  }
  /**
   *
   * @param {inline style} _cardIconTextStyle
   * @param {inline style} _anderTextStyle
   * @param {inline style} _styleForBetTexts
   * @param {inline style} styleForBetTexts1
   * @param {array} _boxTagArray
   * here I am creating the ander cards, grids, tags, payOut text, betAmount text
   * by calling a arrow function CreateBettingArea in loop
   */
  CreateBaharBettingArea(
    _cardIconTextStyle,
    _anderTextStyle,
    _styleForBetTexts,
    _styleForBetTexts1,
    _boxTagArray
  ) {
    let baharCardCodes = [];
    baharCardCodes = [
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
    const CreateBettingArea = (x, y, isUp) => {
      let bettingGrids = this.scene.add
        .image(x, y, "ander_bahar_atlas", "card-box.png")
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      let baharPayOutText = this.scene.add
        .text(x, y - 100, "0", _anderTextStyle)
        .setOrigin(0.5);
      let globalBetForBahar = this.scene.add
        .text(
          x,
          y + 100,
          this.currPlayerBetAnder + "/" + this.globalPlayerbetAnder,
          _styleForBetTexts
        )
        .setOrigin(0.5);
      let cardIconText = this.scene.add
        .text(x, y, "A", _cardIconTextStyle)
        .setOrigin(0.5);

      let baharCards = this.scene.add
        .image(x, y, "3002")
        .setOrigin(0.5)
        .setScale(0.5)
        .setVisible(false);
      return {
        bettingGrids,
        baharPayOutText,
        globalBetForBahar,
        cardIconText,
        baharCards,
      };
    };
    for (let i = 0; i <= 12; i++) {
      const isUp = i < 7;
      const x = isUp ? 110 + i * 170 : -995 + i * 170;
      const y = isUp ? 2260 : 2535;
      const {
        bettingGrids,
        baharPayOutText,
        // betTextForBahar,
        // betTextForGlobalPlayer,
        globalBetForBahar,
        cardIconText,
        baharCards,
      } = CreateBettingArea(x, y, isUp);
      //=======================Grids Rect============================
      this.baharGridsArray.push(bettingGrids);
      this.baharContainer.add(bettingGrids);
      bettingGrids.on("pointerDown", () => {
        this.OnBaharGridPressed();
      });
      bettingGrids.on("pointerup", () => {
        if (this.scene.gameStatus.time >= 3) {
          this.OnBaharGridReleased(
            this.baharsCodeArr[i],
            this.baharSelectionIdArray[i],
            bettingGrids.x,
            bettingGrids.y,
            this.baharBetPlayerAndGlobal[i],
            i
          );
        }
        else {
          // bet close popup here
          this.scene.gameStatus.betstopPop();
        }
      });
      //======================Pay Out Text===========================
      this.baharPayOutTextArray.push(baharPayOutText);
      this.baharContainer.add(baharPayOutText);
      //======================bottom "100/100k"======================
      this.baharContainer.add(globalBetForBahar);
      this.baharBetPlayerAndGlobal.push(globalBetForBahar);
      //==============================Icon===========================
      this.baharContainer.add(cardIconText);
      cardIconText.setText(_boxTagArray[i]);
      //========================Invisible cards======================
      this.baharTableCardsArray.push(baharCards);
      baharCards.Name = baharCardCodes[i];
      this.baharContainer.add(baharCards);
      this.allCardCodes.push(baharCards);
    }
  }
  /**
   *Setting up payout text to the grids
   * @param {payOut value} _payOut
   */
  SetPayOutText(_payOut) {
    // //setting payOut value e.g.(1.98) at bottom panel square box
    for (let i = 0; i < this.anderPayOutTextArray.length; i++) {
      this.anderPayOutTextArray[i].setText(_payOut);
      this.baharPayOutTextArray[i].setText(_payOut);
    }
  }
  /**
   *Setting up data for global bet amount and current user bet amount
   * @param {serverside response as object} _response
   */

  SetGlobalBetData(_response) {
    const combineArrayOfBetText = [
      ...this.anderBetPlayerAndGlobal,
      ...this.baharBetPlayerAndGlobal,
    ];

    // console.log("_response", _response);
    const responseLength = _response.length;

    for (let i = 0; i < responseLength; i++) {
      let prevValue = localStorage.getItem(_response[i].Id);
      if (isNaN(prevValue) || prevValue == null) {
        prevValue = 0;
      }

      const combinedText =
        Utils.convertToK(prevValue) +
        "/" +
        Utils.convertToK(_response[i].TotalBets);
      // console.log("combinedText", combinedText, Utils.convertToK(prevValue));

      combineArrayOfBetText[i].setText(combinedText);
    }
  }

  //=============================
  /**
   * creating win outer animation spines to each position of the grids and
   * made the visibility off
   */
  CreateWinOuterAnim() {
    let container = this.scene.add.container(0, 0).setDepth(4);
    for (let i = 0; i <= 25; i++) {
      let winOuter = this.scene.add
        .spine(
          Constant.bottomPanelCardPosition[i].x - 10,
          Constant.bottomPanelCardPosition[i].y + 110,
          "winnerBox"
        )
        .setVisible(false);
      winOuter.play("1", true);
      container.add(winOuter);
      this.winOuterAnim.push(winOuter);
    }
  }
  /*
   *On click events call backs
   */
  OnAnderGridPressed() { }
  OnAnderGridReleased(_sCode, _selectionId, _x, _y, _globalBetText, i) {
    // console.log("clicked ander");
    _globalBetText.Name = _selectionId;
    BetPlace.PlaceBet(_sCode, _selectionId, _x, _y, _globalBetText, i);
  }
  OnBaharGridPressed() { }
  OnBaharGridReleased(_sCode, _selectionId, _x, _y, _globalBetText, i) {
    // console.log("clicked bahar");
    _globalBetText.Name = _selectionId;
    BetPlace.PlaceBet(_sCode, _selectionId, _x, _y, _globalBetText, i);
  }
  /**
   *
   * @param {array obj respose of server side} _selectionIdArr
   * @param {string} _mCode
   * @param {array} _sCodeArr
   */
  SetDataForSelectionIdAndSCode(_selectionIdArr, _mCode, _sCodeArr) {
    for (let i = 0; i < _sCodeArr.length; i++) {
      if (i < 13) {
        this.andersCodeArr.push(_sCodeArr[i]);
        this.anderSelectionIdArray.push(_selectionIdArr[i]);
      } else {
        this.baharsCodeArr.push(_sCodeArr[i]);
        this.baharSelectionIdArray.push(_selectionIdArr[i]);
      }
    }
  }

  /**
   * Creating coins to be animate for global players
   */
  CreateCoinsToAnimate() {
    let rndNum;
    for (let i = 0; i < 26; i++) {
      let container = this.scene.add
        .container(
          Constant.bottomPanelCardPosition[i].x,
          Constant.bottomPanelCardPosition[i].y
        )
        .setDepth(4);
      rndNum = Utils.RandomNumberGenerator(1, 6);
      this.coinTextVal.push(rndNum);
      let coinImage = this.scene.add
        .image(0, 0, "currency_list", Constant.currencyList[Math.floor(Math.random() * Constant.currencyList.length)] + ".png")
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(1);
      // coinImage.setFrame("B_C" + rndNum + ".png");
      coinImage.Name = Constant.wholeCardCodes[i];
      let coinText = this.scene.add
        .text(0, 0, "XYZ", Constant.coinvalueTextStyle[rndNum - 1])
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(1);
      container.add(coinImage);
      container.add(coinText);
      this.animativeCoinArray.push(container);
    }
  }
  /**
   * toggle betting controlling onClick
   */
  EnableGrids() {
    for (let i = 0; i < this.anderGridsArray.length; i++) {
      this.anderGridsArray[i].setInteractive({ useHandCursor: true });
      this.baharGridsArray[i].setInteractive({ useHandCursor: true });
    }
  }
  DisableGrids() {
    for (let i = 0; i < this.anderGridsArray.length; i++) {
      this.anderGridsArray[i].removeInteractive();
      this.baharGridsArray[i].removeInteractive();
    }
  }
  selfBetData(_data, totalBetData) {
    for (let i = 0; i < _data.length; i++) {
      let valueIs = _data[i].SelectionId;
      let index;
      if (valueIs < 1807) {
        index = this.anderSelectionIdArray.indexOf(valueIs);
        localStorage.setItem(index, _data[i].BetAmount);
      } else {
        index = this.baharSelectionIdArray.indexOf(valueIs);
        localStorage.setItem(index + 13, _data[i].BetAmount);
      }
    }
    this.SetGlobalBetData(totalBetData);
    if (_data.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        // console.log(`${key}: ${value}`);
        this.scene.secView.totalBetArr[key].text = Utils.convertToK(value);
      }
    }

    // for(let i=0;i<_data.length;i++){
    //   // this.scene.secViewBet.DataSetOnPanel();
    //   let _key=
    //   this.scene.secView.totalBetArr[_key].text = Utils.convertToK(
    //     localStorage.getItem(_key)
    //   );
    // }
  }
}
export default BottomPanel;
