import { BetPlace } from "../BetPlace.js";
import { Constant } from "../Constant.js";
import { Utils } from "../Utils.js";
import chalk from "chalk";

class Database {
  constructor(scene) {
    this.scene = scene;
    this.accountBalance;
    //Method two specific global variables
    this.minBetAmt;
    this.maxBetAmt;
    this.runnersArray = [];
    this.firstRunnerName;
    this.secondRunnerName;
    this.payOut;
    this.layValue;
    this.BetRangeTextArray = [];
    this.betAmount = 0;
    this.selectionIdArr = [];
    this.rangeStack = [];
    this.anderId;
    this.baharId;

    this.sCodeArray = [];
    this.mCode;
    this.isTopPlayersBetting = false;
    //Method three specific global variables
    this.playerName;
    this.currentAmtInWallet;
    this.roundId;
    this.timerValue;
    this.topPlayersArray = [];
    this.userName; // player name
    this.gameHistoryArray = [];
    this.totalPlayers;
    this.pPicFrame = [];
    this.topPlayerName = [];
    this.dealerCardCode;
    this.crntgamecards = [];

    this.isCountDownStart = false;
    this.marketId;
    this.marketName;
    this.playerId;
    this.selectionId;
    this.actualTopbettersIdArr = [];
    this.groupKeyObject;
    //Method Six specific global variables
    this.globalBetsOnAnder = [];
    this.globalBetsOnBahar = [];
    this.totalBetsByGlobal = [];
    //Mehod ten specific global data
    this.updatedBalance;
    //Method nine specific global variables
    this.winnerId;
    this.updatedTopPlayersArray = [];
    this.winnerTopPlayers = [];
    //Method 12 specific global variables
    this.topPlayersBetAmt;
    //Method 8 specific global data
    this.cardCode;
    //Method 14 specific global data
    this.isAuth;
    this.userId = null;
    this.betDel = false;
  }
  GetDataFromMethodTwo(_response) {
    console.log("response", _response);
    const style = {
      "background-color": "#99004d",
      color: "#ffffff",
      padding: "7px",
      "font-weight": "bold",
    };
    const game = Constant.game.scene.scenes[1];
    game.gameStatus.IsMoving = true;
    //===================================
    this.userId = _response.player.PlayerId;
    this.userName = _response.player.Name;
    game.topPanel.playerNameText.setText(this.userName.substring(0, 5) + "...");
    this.accountBalance = _response.player.Balance;
    game.topPanel.currentAmountText.setText(this.accountBalance);
    this.groupKeyObject = _response.grpKey;
    Constant.currencyList = _response.currLst;
    Constant.currency = _response.player.currency;
    // Constant.playerCurrency = _response.player.currency;
    Constant.backURLL = _response.backUrl;
    Constant.pm = _response.pm;
    if (!_response.pm) {
      game.Home.homeBtn.setVisible(false);
    }


    //===================================
    const logMessage = "Method2====>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    // this.minBetAmt = _response.gameMarkets[0].MinBet;
    // this.maxBetAmt = _response.gameMarkets[0].MaxBet;
    // this.coinStack = _response.stack; //["0.25", "0.50", "1.00", "1.25", "1.75", "2.00", "2.25"]; //_response.stack;
    this.coinStack = [];
    _response.stack.forEach(element => {
      this.coinStack.push(Number(element));
    });
    console.log("_response.stack", this.coinStack);

    // this.coinStack = _response.stack;
    this.minBetAmt = Utils.convertToK(Number(this.coinStack[0]));
    this.maxBetAmt = Utils.convertToK(Number(this.coinStack[this.coinStack.length - 1]));


    this.runnersArray = _response.gameMarkets[0].Runners;
    this.payOut = this.runnersArray[0].Payout;
    this.mCode = _response.gameMarkets[0].mcode;
    this.layValue = this.runnersArray[0].Lay;
    for (let i = 0; i < _response.gameMarkets[0].Runners.length; i++) {
      this.selectionIdArr.push(_response.gameMarkets[0].Runners[i].Id);
      this.sCodeArray.push(_response.gameMarkets[0].Runners[i].scode);
    }
    game.bottomPanel.SetDataForSelectionIdAndSCode(
      this.selectionIdArr,
      this.mCode,
      this.sCodeArray
    );
    game.secView.SetDataForTable(_response.gameMarkets[0], this.minBetAmt, this.maxBetAmt);
    this.SetMethodTwoSpecificData(this.coinStack);
    game.topPanel.currency.text = _response.player.currency;
    // ------ SelfBet Work---//
    localStorage.clear();
    let selfBet = _response.selfBet;
    let totalBetData = _response.totalbet[0].Runners;
    game.bottomPanel.selfBetData(selfBet, totalBetData);
    if (_response?.tour) {
      game.tour.tourFlag = true;
      game.tour.tourOnceFlag = true;
      game.tour.tour(_response.tour);
      Constant.tourData = _response.tour;
    }
  }
  SetMethodTwoSpecificData(_coinStack) {
    const game = Constant.game.scene.scenes[1];

    this.betAmount = Utils.ConvertToKArray(_coinStack)[0];
    for (let i = 0; i < Utils.ConvertToKArray(_coinStack).length; i++) {
      game.coinPopUp.coinTextArray[i].setText(
        Utils.ConvertToKArray(_coinStack)[i]
      );
      game.coinPopUp.coinTextArrayToolTip[i].setText(
        Utils.ConvertToKArray(_coinStack)[i]
      );
    }
    game.gameStatus.coinText.setText(this.minBetAmt);
    game.gameStatus.coinTextToolTip.setText(this.minBetAmt);
    game.gameStatus.MinMaxTableDataSet(this.minBetAmt, this.maxBetAmt);

    game.bottomPanel.SetPayOutText(this.payOut);

    let coinStack = Utils.ConvertToKArray(_coinStack);
    game.secViewBet.SetDataForPopUp(coinStack);
  }
  GetDataFromMethodThree(_response) {
    this.ResetGameData();

    const game = Constant.game.scene.scenes[1];

    const style = {
      "background-color": "#0066ff",
      color: "#ffffff",
      padding: "7px",
      "font-weight": "bold",
    };
    const logMessage = "Method3====>";
    console.log(
      `%c ${logMessage}`,
      Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; "),
      _response,
      new Date()
    );

    this.isTopPlayersBetting = false;
    this.roundId = _response.GameInfo.RoundId.slice(-7);
    this.totalPlayers = _response.TotalPlayers;
    this.timerValue = Utils.TimeGapBetweenEndAndStart(
      _response.GameInfo.UTCSystemCurrentTime,
      _response.GameInfo.UtcRoundEndTime
    );
    // console.log("timer value : ", this.timerValue);
    if (this.timerValue > 0) {
      game.secView.timerValueText.setText(this.timerValue);
      game.gameStatus.timerText.setText(this.timerValue);
      game.gameStatus.time = this.timerValue;
      this.isCountDownStart = true;
      for (let i = 0; i < game.secView.dynamicLockImageArr.length; i++) {
        game.secView.dynamicLockImageArr[i].setVisible(false);
      }
    } else {
      this.isCountDownStart = false;
      game.gameStatus.timerText.setText(0);
      game.secView.timerValueText.setText(0);
      for (let i = 0; i < game.secView.dynamicLockImageArr.length; i++) {
        game.secView.dynamicLockImageArr[i].setVisible(true);
      }
    }


    //#####################
    // this.timerValue > 0
    //   ? (game.bottomPanel.EnableGrids(), game.secView.EnableBlueTags())
    //   : (game.bottomPanel.DisableGrids(), game.secView.DisableBlueTags());

    this.timerValue > 0
      ? (game.bottomPanel.EnableGrids(), game.secView.EnableBlueTags())
      : (game.bottomPanel.EnableGrids(), game.secView.DisableBlueTags());
    //#####################

    this.crntgamecards = _response.crntgamecards;

    if (this.crntgamecards.length != 0) {
      game.middlePanel.SetCardsExplicitly(this.crntgamecards);
      game.secView.SetCardsExplicitly(this.crntgamecards);
    }

    this.topPlayersArray = _response.TopPlayers;

    this.marketId = _response.GameBets[0].Runners[0].GameMarketId;
    this.marketName = _response.GameBets[0].Name;
    this.playerId = this.userName;
    //----------------------------------------------------------------
    if (_response.GameHistory.length != 0) {
      game.historyPanel.SetDataForHistoryPanel(_response.GameHistory);
    }

    game.topPanel.roundIdTextValue.setText(this.roundId); // dynamic round ID
    //setting total player number
    game.gameStatus.totalPlayerText.setText(this.totalPlayers);
    // localStorage.clear();
    this.SetTopPlayersName(this.topPlayersArray);
    game.gameStatus.ResetCoinData();

    // next round Function Call
    game.gameStatus.NextRoundPop(_response.GameInfo.GameStates);
  }
  SetTopPlayersName(_topPlayersArray) {
    // console.log("_topPlayersArray", _topPlayersArray, this.userName);
    //optimize way
    Constant.playerCurrency = []
    const game = Constant.game.scene.scenes[1];
    let gameTopPlayers = _topPlayersArray.filter(
      (elem) => elem.PlayerId !== this.userName
    );
    let i = 0;
    while (i < 6) {
      this.pPicFrame.push(parseInt(gameTopPlayers[i].PPic));
      game.middlePanel.topPlayerImageArr[i].setFrame(
        parseInt(gameTopPlayers[i].PPic)
      );
      game.middlePanel.topPlayerImageArr[i].Name = _topPlayersArray[i].PlayerId;
      this.topPlayerName.push(gameTopPlayers[i].Name);
      game.middlePanel.topPlayerNameArr[i].setText(
        this.topPlayerName[i].substring(0, 5) + "..."
      );
      Constant.playerCurrency.push(_topPlayersArray[i].currency);
      console.log("Constant.playerCurrency[i]", Constant.playerCurrency, i);

      i++;
    }
    this.pPicFrame = [];
    this.topPlayerName = [];
  }
  ResetGameData() {
    const game = Constant.game.scene.scenes[1];
    game.coinPopUp.DisableCoinPopUp();
    if (this.betDel) {
      localStorage.clear();
      game.middlePanel.uniqueCards = [];
      for (let i = 0; i < game.bottomPanel.anderTableCardsArray.length; i++) {
        game.bottomPanel.anderTableCardsArray[i].setVisible(false);
        game.bottomPanel.baharTableCardsArray[i].setVisible(false);
        game.bottomPanel.anderBetPlayerAndGlobal[i]._text = 0 + "/" + 0;
        game.bottomPanel.baharBetPlayerAndGlobal[i]._text = 0 + "/" + 0;
      }
      game.secView.totalBetArr.forEach((element) => {
        element.setText(0);
      });
      game.guideLines.MakeBgDisable();
      BetPlace.topPlayerPosArr = [];
      game.middlePanel.combineCardsAndarAndBahar = [];
      game.middlePanel.uniqueCards = [];
      game.middlePanel.anderCard.visible = false;
      game.middlePanel.baharCard.visible = false;
      game.secView.andercard.visible = false;
      game.secView.baharcard.visible = false;
      game.gameStatus.coinTextToolTip.setText(Utils.convertToK(Number(this.coinStack[0])));
      game.gameStatus.coinText.setText(Utils.convertToK(Number(this.coinStack[0])));
      game.secViewBet.betAmtPrimaryValText.text = Utils.ConvertToKArray(
        this.coinStack
      )[0];
      this.winnerTopPlayers = [];
    }
    game.gameStatus.NextRoundPopDestroy();
    this.betDel = true;
  }
  GetMethodEightData(_response) {
    const game = Constant.game.scene.scenes[1];
    const style = {
      "background-color": "#33ccff",
      color: "#ffffff",
      padding: "7px",
      "font-weight": "bold",
    };
    const logMessage = "Method8====>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    game.middlePanel.SetCardsExplicitly(_response);
    game.secView.SetCardsExplicitly(_response);
  }
  GetDataFromMethodSix(_response) {
    // const style = {
    //   "background-color": "#e6e600",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    // const logMessage = "Method6====>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    this.globalBetsOnAnder = [];
    this.globalBetsOnBahar = [];
    for (let i = 0; i < _response.Runners.length; i++) {
      if (_response.Runners[i].Id <= 1807) {
        this.globalBetsOnAnder.push(_response.Runners[i].TotalBets);
      } else {
        this.globalBetsOnBahar.push(_response.Runners[i].TotalBets);
      }
      this.totalBetsByGlobal.push(_response.Runners[i].TotalBets);
    }
    const game = Constant.game.scene.scenes[1];
    game.bottomPanel.SetGlobalBetData(_response.Runners);
    BetPlace.AnimateMethodSixCoin();
  }

  HandleOnAlertData(data) {
    try {
      const game = Constant.game.scene.scenes[1];
      const decryptedData = JSON.parse(Utils.DataDecryption(data));
      console.warn("on alert data ===>", decryptedData);
      if (decryptedData.action == "SelfBetUpdate") {

        const sid = decryptedData?.data?.sid;
        if (!sid) {
          console.error("SID not found in alert data");
          return;
        }
        const betAmount = decryptedData?.data?.betamount;
        if (!betAmount) {
          console.error("betAmount not found in alert data");
          return;
        }

        const combineArrayOfBetText = [
          ...game.bottomPanel.anderBetPlayerAndGlobal,
          ...game.bottomPanel.baharBetPlayerAndGlobal,
        ];

        const storedData = parseInt(localStorage.getItem(sid));
        let datasetToBe = Utils.BetUpdate(storedData, parseInt(betAmount), "-");
        console.log("datasetToBe", datasetToBe);
        localStorage.setItem(sid, datasetToBe);

        for (let i = 0; i < combineArrayOfBetText.length; i++) {
          if (combineArrayOfBetText[i].Name == sid) {
            combineArrayOfBetText[i].text =
              datasetToBe + "/" + this.totalBetsByGlobal[i];
          }
        }

        this.balance = decryptedData?.data?.Balance;
        if (this.balance != undefined)
          game.topPanel.currentAmountText.setText(this.balance);
        game.guideLines.alertText.text = decryptedData.msg;
        game.guideLines.EnableAlertPopUp1(decryptedData.disTimeInSec * 1000);
      }
      else if (decryptedData.action == "notification") {
        game.Home.notificationPopUP(decryptedData.msg);
        // game.guideLines.alertText.text = decryptedData.msg;
        // game.guideLines.EnableAlertPopUp1(decryptedData.disTimeInSec * 1000);
      }
      else if (decryptedData.action == "gotoHome") {
        game.Home.goToHomePopUp(decryptedData.msg);

        // game.guideLines.EnableAlertPopUp1(decryptedData.disTimeInSec * 1000);
        // let backURL = decryptedData.data.backUrl;
        setTimeout(() => {
          if (Constant.backURLL == "") {
            parent.postMessage("'back'", "*");
          }
          else {
            window.location.href = Constant.backURLL;
          }
        }, decryptedData.disTimeInSec * 1000);
      }
      else if (decryptedData.action == "confirm") {
        game.Home.showConfirm(decryptedData.msg);
      }
    } catch (error) {
      console.error("Error in HandleOnAlertData:", error);
    }
  }

  GetMethodTenData(_response) {
    // const style = {
    //   "background-color": "#33cc33",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    // const logMessage = "Method10===>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    // const game = Constant.game.scene.scenes[1];
    // this.updatedBalance = _response.Balance;
    // game.topPanel.currentAmountText.setText(this.updatedBalance);
  }
  GetMethodTwelveData(_response) {
    // const style = {
    //   "background-color": "#ff3300",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    // const logMessage = "Method12===>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    const game = Constant.game.scene.scenes[1];

    if (game.topPanel.viewSwitchCounter % 2 === 0) {
      BetPlace.AnimateMethodTwelveCoin(_response);
    }
  }
  GetMethodNineData(_response) {
    // const style = {
    //   "background-color": "#ff0000",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    // const logMessage = "Method9===>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );

    // let obj = {};
    // this.SetTopPlayersName(_response.topPlayers);
    BetPlace.DistributeCoins(_response.winner);
  }

  // SetTopPlayerData(_topPlayerdataJsonData) {
  //   console.log("_topPlayerdataJsonData", _topPlayerdataJsonData.Data);
  //   this.SetTopPlayersName(_topPlayerdataJsonData.Data);

  //   let winnerPlayers = _topPlayerdataJsonData.Data.filter(
  //     (elem) => elem.PlayerId !== this.userName
  //   );

  //   console.log("winnerPlayers===>>>", winnerPlayers);
  //   let obj = {};
  //   for (let i = 0; i < 6; i++) {
  //     if (parseInt(winnerPlayers[i].FloaterAmt) > 0) {
  //       console.log(
  //         chalk.bold.rgb(0, 0, 250)("winnerPlayers[i].FloaterAmt"),
  //         winnerPlayers[i].FloaterAmt
  //       );
  //       obj = {
  //         playerId: winnerPlayers[i].PlayerId,
  //         winAmt: winnerPlayers[i].FloaterAmt,
  //       };
  //       this.winnerTopPlayers.push(obj);
  //     }
  //   }
  //   BetPlace.AnimateTopPlayersCoins();
  // }
  SetTopPlayerData(_topPlayerdataJsonData) {
    // console.log("_topPlayerdataJsonData", _topPlayerdataJsonData.Data);
    this.SetTopPlayersName(_topPlayerdataJsonData.Data);

    // Filter out current user from winners
    let winnerPlayers = _topPlayerdataJsonData.Data.filter(
      (elem) => elem.PlayerId !== this.userName
    );

    // console.log("winnerPlayers===>>>", winnerPlayers);

    // Extract top 6 winners with positive FloaterAmt and prepare for animation
    for (let i = 0; i < Math.min(6, winnerPlayers.length); i++) {
      let floaterAmt = parseInt(winnerPlayers[i].FloaterAmt);
      if (floaterAmt > 0) {
        // console.log(
        //   // chalk.bold.rgb(0, 0, 250)("winnerPlayers[i].FloaterAmt"),
        //   floaterAmt
        // );
        this.winnerTopPlayers.push({
          playerId: winnerPlayers[i].PlayerId,
          winAmt: floaterAmt,
        });
      }
    }

    // Trigger animation after updating winners
    BetPlace.AnimateTopPlayersCoins();
  }

  GetMethodForteenData(_response, _connection) {
    // const style = {
    //   "background-color": "#0000cc",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    const logMessage = "Method14===>";
    console.log(
      `%c ${logMessage}`,
      Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; "),
      _response,
      new Date()
    );

    console.log("_response", _response);
    const game = Constant.game.scene.scenes[1];
    game.guideLines.MakeBgEnable();
    this.isAuth = _response.IsAuth;

    const backURL = _response.backUrl;
    if (this.isAuth == true) {
      game.guideLines.MakeIdlePopUpEnable();
      setTimeout(function () {
        game.guideLines.MakeIdlePopUpDisable();
        // parent.postMessage("'back'", "*");

        if (backURL == "") {
          parent.postMessage("'back'", "*");
        } else {
          window.location.href = backURL;
        }
      }, 5000);
    } else {
      game.guideLines.MakeAuthExpirePopUpEnable();
      setTimeout(function () {
        game.guideLines.MakeAuthExpirePopUpDisable();
        // parent.postMessage("'back'", "*");

        if (backURL == "") {
          parent.postMessage("'back'", "*");
        } else {
          window.location.href = backURL;
        }
      }, 5000);
    }
  }
  GetMethodElevenData(_response) {
    // const style = {
    //   "background-color": "#00ff99",
    //   color: "#ffffff",
    //   padding: "7px",
    //   "font-weight": "bold",
    // };
    // const logMessage = "Method11===>";
    // console.log(
    //   `%c ${logMessage}`,
    //   Object.entries(style)
    //     .map(([key, value]) => `${key}: ${value}`)
    //     .join("; "),
    //   _response,
    //   new Date()
    // );
    const game = Constant.game.scene.scenes[1];
    this.userWinAmt = _response.FloaterAmt;
    // console.log("this.userWinAmt", this.userWinAmt);
    if (this.userWinAmt > 0) {
      BetPlace.SelfUserAnim();
      let winAmtUser = game.topPanel.userWinAmountText;
      winAmtUser.setVisible(true);
      winAmtUser.setText(this.userWinAmt);
      game.tweens.add({
        targets: winAmtUser,
        ease: "Linear",
        duration: 6500,
        scale: 1 * 1.3,
        onComplete: () => {
          winAmtUser.setScale(1);
          winAmtUser.setVisible(false);
        },
      });
    }
    this.updatedBalance = _response.Balance;
    this.accountBalance = this.updatedBalance;
    game.topPanel.currentAmountText.setText(this.updatedBalance);
  }
  GetTour(data) {
    const game = Constant.game.scene.scenes[1];

    game.tour.tour(data);
    Constant.tourData = data;
  }
}
let database = new Database();
export { database as Database };
