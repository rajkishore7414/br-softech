import { Constant } from "./Constant.js";
import { Database } from "./Network/DataBase.js";
import { ServerManagement } from "./Network/ServerManagement.js";
import { SoundManagement } from "./SoundManagement.js";
import { Utils } from "./Utils.js";

class BetPlace {
  constructor(scene) {
    this.scene = scene;
    this.bettingMoney = 0;
    this.userBetAmountCoin = null;
    this.userBetAmountText = null;
    this.betPlaceData;
    this.betAmt = 0;
    this.globalCoinArray = [];

    this.topPlayerPosArr = [];
    this.topPlayersCoin = [];
    this.balanceAmt = null;
    this.xPos = null;
    this.yPos = null;
  }
  /**
   *Placing bet on click to the grids of bottom panel
   * @param {string} _sCode
   * @param {string} _selectionId
   * @param {float} _xPos
   * @param {float} _yPos
   * @param {String} _globalBetAmtText
   * @param {int} _index
   */
  PlaceBet(_sCode, _selectionId, _xPos, _yPos, _globalBetAmtText, _index) {
    const game = Constant.game.scene.scenes[1];
    this.bettingMoney = Utils.convertKToNumber(Database.betAmount);
    console.log('PlaceBet this.bettingMoney', this.bettingMoney);

    // let balance = parseFloat(
    //   Database.accountBalance - this.bettingMoney
    // ).toFixed(2);
    // Database.accountBalance = balance;
    // game.topPanel.currentAmountText.setText(balance);
    this.balanceAmt = Database.accountBalance;
    if (this.balanceAmt >= this.bettingMoney) {
      this.userBetAmountCoin = game.add
        .image(
          game.gameStatus.coinText.x,
          game.gameStatus.coinText.y,
          "currency_list",
          Constant.currency + ".png"
        )
        .setOrigin(0.5);
      // this.userBetAmountCoin.setFrame(
      //   "B_C" + game.gameStatus.frameIndex + ".png"
      // );
      this.userBetAmountText = game.add
        .text(
          game.gameStatus.coinText.x,
          game.gameStatus.coinText.y,
          Utils.convertToK(Database.betAmount),
          Constant.coinvalueTextStyle[game.gameStatus.frameIndex - 1]
        )
        .setOrigin(0.5).setVisible(false);
      //=============================old===================================
      SoundManagement.PlayCoinMusic();

      if (_selectionId >= 1795 && _selectionId <= 1807) {
        this.NewApproach(_index, _globalBetAmtText, _selectionId, "Ander");
      } else {
        this.NewApproach(_index + 13, _globalBetAmtText, _selectionId, "Bahar");
      }
      Utils.MovementTween(
        this.userBetAmountCoin,
        this.userBetAmountText,
        _xPos,
        _yPos
      );
      this.betPlaceData = {
        BetAmount: this.bettingMoney,
        MarketId: Database.marketId,
        mcode: Database.mCode,
        PlayerId: Database.userId,
        SelectionId: _selectionId,
        scode: _sCode,
      };
      this.DataToBeSend(this.betPlaceData);
      this.balanceAmt = Utils.BetUpdate(
        Database.accountBalance, this.bettingMoney, "-"
      )
      Database.accountBalance = this.balanceAmt;
      game.topPanel.currentAmountText.setText(this.balanceAmt);
    } else if (this.balanceAmt < this.bettingMoney) {
      game.guideLines.MakeInSuffBalanceEnable();
    }
  }
  tourSentData() {
    console.log("check this");
    const getData = {
      grpKey: Database.groupKeyObject,
      Data: {
        PlayerId: Database.userId,
      }
    };
    const getDataDec = Utils.DataEncryption(JSON.stringify(getData));
    ServerManagement.connection.invoke("GetTour", getDataDec);
    // .catch(err => console.error("GetTour invoke failed", err));
  }
  tourFinishSentData() {
    console.log("check this");
    const getData = {
      grpKey: Database.groupKeyObject,
      Data: {
        PlayerId: Database.userId,
      }
    };
    const getDataDec = Utils.DataEncryption(JSON.stringify(getData));
    ServerManagement.connection.invoke("IsTourComplete", getDataDec);
    // .catch(err => console.error("GetTour invoke failed", err));
  }
  NewApproach(_key, _betText, _selectionId, type) {
    // const game = Constant.game.scene.scenes[1];
    // // console.log("_key", _key);
    // // Retrieve and update bet amount from localStorage
    // let prevValue = localStorage.getItem(_key);
    // if (isNaN(prevValue) || prevValue === null) {
    //   prevValue = 0;
    // } else {
    //   prevValue = Number(prevValue);
    // }
    // const value = Utils.convertKToNumber(Database.betAmount) + prevValue;
    // console.log("value====>", Database.betAmount);
    // localStorage.setItem(_key, value);
    // // Update bet text based on the type
    // if (type === "Ander") {
    //   _betText.text =
    //     Utils.convertToK(localStorage.getItem(_key)) +
    //     "/" +
    //     Utils.convertToK(Database.globalBetsOnAnder[_key]);
    // } else {
    //   _betText.text =
    //     Utils.convertToK(localStorage.getItem(_key)) +
    //     "/" +
    //     Utils.convertToK(Database.globalBetsOnBahar[_key - 13]);
    // }
    // // Update the second view
    // for (let i = 0; i < game.secView.totalBetArr.length; i++) {
    //   if (game.secView.totalBetArr[i].Name === _selectionId) {
    //     game.secView.totalBetArr[i].text = Utils.convertToK(
    //       Utils.convertToK(localStorage.getItem(_key))
    //     );
    //   }
    // }

    const game = Constant.game.scene.scenes[1];
    // console.log("_key", _key);
    // Retrieve and update bet amount from localStorage
    let prevValue = localStorage.getItem(_selectionId);
    if (isNaN(prevValue) || prevValue === null) {
      prevValue = 0;
    } else {
      prevValue = Number(prevValue);
    }
    // const value = Utils.convertKToNumber(Database.betAmount) + prevValue;
    let value = Utils.convertKToNumber(Database.betAmount);
    value = Utils.BetUpdate(value, prevValue, "+")
    console.log("value====>", Database.betAmount);
    localStorage.setItem(_selectionId, value);
    // Update bet text based on the type
    if (type === "Ander") {
      _betText.text =
        Utils.convertToK(localStorage.getItem(_selectionId)) +
        "/" +
        Utils.convertToK(Database.globalBetsOnAnder[_key]);
    } else {
      _betText.text =
        Utils.convertToK(localStorage.getItem(_selectionId)) +
        "/" +
        Utils.convertToK(Database.globalBetsOnBahar[_key - 13]);
    }
    // Update the second view
    for (let i = 0; i < game.secView.totalBetArr.length; i++) {
      if (game.secView.totalBetArr[i].Name === _selectionId) {
        game.secView.totalBetArr[i].text = Utils.convertToK(
          Utils.convertToK(localStorage.getItem(_selectionId))
        );
      }
    }
  }
  /**
   * Data sent to the server Method 10 as user bet placed to be recognise the user
   * @param {object} _betPlaceData
   */
  DataToBeSend(_betPlaceData) {
    const betPlaceDataObject = {
      Data: _betPlaceData,
      Method: 10,
      grpKey: Database.groupKeyObject,
    };
    const betPlaceEncryptedData = Utils.DataEncryption(
      JSON.stringify(betPlaceDataObject)
    );
    ServerManagement.connection.invoke("OnEventRequest", betPlaceEncryptedData);
  }

  /**
   * coin animation of those coins which are created at  TopPlayerCoin to all 26 markets
   */
  AnimateMethodSixCoin() {
    SoundManagement.PlayCoinMusic();
    const game = Constant.game.scene.scenes[1];
    for (let i = 0; i < game.topCoin.globalPlayersCoin.length; i++) {
      console.log("hbf");

      game.topCoin.globalPlayersCoin[i].list[0].visible = true;
      game.topCoin.globalPlayersCoin[i].list[0].setTexture("currency_list", Constant.currencyList[Math.floor(Math.random() * Constant.currencyList.length)] + ".png");
      game.topCoin.globalPlayersCoin[i].list[1].visible = false;
      let rndNum = Utils.RandomNumberGenerator(1, 6);
      game.topCoin.globalPlayersCoin[i].list[1].setText(
        Utils.ConvertToKArray(Database.coinStack)[rndNum]
      );
      game.tweens.add({
        targets: game.topCoin.globalPlayersCoin[i],
        ease: "Linear",
        duration: 300,
        x: Constant.bottomPanelCardPosition[i].x,
        y: Constant.bottomPanelCardPosition[i].y,
        onComplete: () => {
          setTimeout(() => {
            game.topCoin.globalPlayersCoin[i].setPosition(175, 1232);
            game.topCoin.globalPlayersCoin[i].list[0].visible = false;
            game.topCoin.globalPlayersCoin[i].list[1].visible = false;
          }, 100);
        },
      });
    }
  }
  /**
   * coin animation of those coins which are created at TopPlayerCoin to specific markets
   */
  AnimateMethodTwelveCoin(_response) {
    const game = Constant.game.scene.scenes[1];
    let playerId = _response.PlayerId;
    const coinStackArray = Utils.ConvertToKArray(Database.coinStack);
    let boxCode = _response.SelectionId;
    let betAmount = _response.BetAmount;
    let SelectionId = _response.SelectionId;
    let xPos, yPos;
    for (let i = 0; i < game.bottomPanel.allCardCodes.length; i++) {
      if (game.bottomPanel.allCardCodes[i].Name === SelectionId) {
        xPos = game.bottomPanel.allCardCodes[i].x;
        yPos = game.bottomPanel.allCardCodes[i].y;
      }
    }
    let index = coinStackArray.indexOf(Utils.convertToK(betAmount));

    index = index === -1 ? Utils.RandomNumberGenerator(1, 6) : index + 1;
    for (const playerImage of game.middlePanel.topPlayerImageArr) {
      if (playerImage.Name === playerId) {
        playerImage.y = playerImage.y + 10;
        game.middlePanel.ringArr[
          game.middlePanel.topPlayerImageArr.indexOf(playerImage)
        ].y =
          game.middlePanel.ringArr[
            game.middlePanel.topPlayerImageArr.indexOf(playerImage)
          ].y + 10;
        setTimeout(() => {
          playerImage.y = playerImage.y - 10;
          game.middlePanel.ringArr[
            game.middlePanel.topPlayerImageArr.indexOf(playerImage)
          ].y =
            game.middlePanel.ringArr[
              game.middlePanel.topPlayerImageArr.indexOf(playerImage)
            ].y - 10;
        }, 100);
        //======================================================================
        let cntainer = game.add.container(0, 0); //.setDepth(3);
        const coin = game.add
          .image(playerImage.x, playerImage.y, "currency_list", Constant.playerCurrency[index] + ".png")
          .setOrigin(0.5);
        // coin.setFrame("B_C" + index + ".png");

        const coinText = game.add
          .text(
            playerImage.x,
            playerImage.y,
            Utils.convertToK(betAmount),
            Constant.coinvalueTextStyle[index - 1]
          )
          .setOrigin(0.5);
        cntainer.add([coin, coinText]);
        game.tweens.add({
          targets: [coin, coinText],
          ease: "Linear",
          duration: 200,
          x: xPos,
          y: yPos,
          onComplete: () => {
            setTimeout(() => {
              coin.destroy();
              coinText.destroy();
            }, 50);
          },
        });
      }
    }
  }
  /**
   * second step animation of coins
   * @param {object} _response
   */
  DistributeCoins(_response) {
    const game = Constant.game.scene.scenes[1];
    let winnerPlayersId = [];
    let winningPosArr = [];
    let positionObj;
    let index = -1;
    let endAnimationCalled = false;
    let winAnims = [];
    let flag;
    flag = game.topPanel.viewSwitchCounter;
    winAnims = [...game.bottomPanel.winOuterAnim];

    for (let i = 0; i < _response.length; i++) {
      winnerPlayersId.push(_response[i].PlayerId);
    }
    for (let i = 0; i < game.bottomPanel.animativeCoinArray.length; i++) {
      // game.bottomPanel.animativeCoinArray[i].list[0]
      game.bottomPanel.animativeCoinArray[i].list[0].visible = true;
      game.bottomPanel.animativeCoinArray[i].list[0].setTexture("currency_list", Constant.currencyList[Math.floor(Math.random() * Constant.currencyList.length)] + ".png")
      game.bottomPanel.animativeCoinArray[i].list[1].visible = false;
      if (flag % 2 === 1) {
        game.bottomPanel.animativeCoinArray[i].list[0].setAlpha(0);
        game.bottomPanel.animativeCoinArray[i].list[0].visible = false;

        game.bottomPanel.animativeCoinArray[i].list[1].setAlpha(0);
      } else {
        game.bottomPanel.animativeCoinArray[i].list[0].setAlpha(1);
        game.bottomPanel.animativeCoinArray[i].list[0].visible = true;

        game.bottomPanel.animativeCoinArray[i].list[1].setAlpha(1);
      }
      game.bottomPanel.animativeCoinArray[i].list[1].setText(
        Utils.ConvertToKArray(Database.coinStack)[
        game.bottomPanel.coinTextVal[i]
        ]
      );
      let currentImageName = game.bottomPanel.animativeCoinArray[i].list[0].Name;
      if (winnerPlayersId.includes(currentImageName)) {
        winAnims[i].visible = true;
        positionObj = {
          xPos: game.bottomPanel.animativeCoinArray[i].x,
          yPos: game.bottomPanel.animativeCoinArray[i].y,
        };
        this.xPos = game.bottomPanel.animativeCoinArray[i].x;
        this.yPos = game.bottomPanel.animativeCoinArray[i].y;
        winningPosArr.push(positionObj);
        this.topPlayerPosArr = [...winningPosArr];
        setTimeout(() => {
          winAnims[i].visible = false;
        }, 6500);
      }
      if (winningPosArr.length == 0) return;
      if (!winnerPlayersId.includes(currentImageName)) {
        console.log("winningPosArr", winningPosArr);

        game.tweens.add({
          targets: game.bottomPanel.animativeCoinArray[i],
          ease: "Linear",
          duration: 600,
          x: 621,
          y: 815,
          onComplete: () => {
            setTimeout(() => {
              index += 1;
              game.tweens.add({
                targets: game.bottomPanel.animativeCoinArray[i],
                ease: "Linear",
                duration: 500,
                x: winningPosArr[index].xPos,
                y: winningPosArr[index].yPos,
                onComplete: () => {
                  if (index === 12 && !endAnimationCalled) {
                    setTimeout(() => {
                      this.EndAnimation();
                      endAnimationCalled = true; // Set the flag to true
                    }, 600);
                  }
                },
              });
            }, 700);
          },
        });
      }
    }
  }
  /**
   * lastly coins animate to the global players
   */
  EndAnimation() {
    // console.log("enter end animation===>");
    let counter = 0;
    const game = Constant.game.scene.scenes[1];
    for (let i = 0; i < game.bottomPanel.animativeCoinArray.length; i++) {
      game.tweens.add({
        targets: game.bottomPanel.animativeCoinArray[i],
        ease: "Linear",
        duration: 600,
        x: 178,
        y: 1223,
        onComplete: () => {
          counter += 1;
          setTimeout(() => {
            game.bottomPanel.animativeCoinArray[i].setPosition(
              Constant.bottomPanelCardPosition[i].x,
              Constant.bottomPanelCardPosition[i].y
            );
            game.bottomPanel.animativeCoinArray[i].list[0].visible = false;
            game.bottomPanel.animativeCoinArray[i].list[1].visible = false;
          }, 500);
        },
      });
    }
  }
  SelfUserAnim(_amt) {
    // console.log("amt", _amt);
    const game = Constant.game.scene.scenes[1];
    game.topCoin.selftUserCoins.setPosition(this.xPos, this.yPos);
    game.topCoin.selftUserCoins.list[1].text = 100;
    game.topCoin.selftUserCoins.list[1].setVisible(false);
    const styleOne = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#1EBFAF",
      fontStyle: "bold",
      align: "center",
    };
    game.topCoin.selftUserCoins.setVisible(true);
    game.topCoin.selftUserCoins.list[1].setStyle(styleOne);
    game.tweens.add({
      targets: game.topCoin.selftUserCoins,
      x: 200,
      y: 132,
      onComplete: () => {
        setTimeout(() => {
          game.topCoin.selftUserCoins.setVisible(false);
          game.topCoin.selftUserCoins.setPosition(175, 1332);
        }, 200);
      },
    });
  }
  AnimateTopPlayersCoins() {
    let game = Constant.game.scene.scenes[1];
    let topPlayersCoinsArr = [...game.topCoin.topPlyerCoinArray];
    let middlePanelPlayersNameArr = [...game.middlePanel.topPlayerImageArr];
    let round_AnimArr = [...game.middlePanel.topPlayerAnimArr];
    let winAmtArr = [...game.middlePanel.winAmtTextArray];
    let flag = game.topPanel.viewSwitchCounter;

    for (let i = 0; i < middlePanelPlayersNameArr.length; i++) {
      let playerName = middlePanelPlayersNameArr[i].Name;
      let winner = Database.winnerTopPlayers.find(
        (element) => element.playerId === playerName
      );

      if (winner) {
        let coin = topPlayersCoinsArr[i];
        coin.setPosition(
          this.topPlayerPosArr[i].xPos,
          this.topPlayerPosArr[i].yPos
        );
        coin.list[1].setText(
          Utils.ConvertToKArray(Database.coinStack)[game.topCoin.frameArray[i]]
        );
        coin.list[0].visible = true;
        coin.list[1].visible = true;

        // Toggle visibility based on flag
        coin.list[0].setAlpha(flag % 2 === 0 ? 1 : 0);
        coin.list[1].setAlpha(flag % 2 === 0 ? 1 : 0);

        // Tween animation for moving coins
        game.tweens.add({
          targets: coin,
          ease: "Linear",
          duration: 300,
          x: middlePanelPlayersNameArr[i].x,
          y: middlePanelPlayersNameArr[i].y,
          onComplete: () => {
            coin.list[0].visible = false;
            coin.list[1].visible = false;
            coin.setPosition(190, 1221);

            // Animation for round indication
            round_AnimArr[i].visible = true;
            winAmtArr[i].setText(winner.winAmt);
            winAmtArr[i].visible = true;

            // Tween animation for scaling win amount
            game.tweens.add({
              targets: winAmtArr[i],
              ease: "Linear",
              duration: 5000,
              scaleX: 1.2,
              scaleY: 1.2,
              onComplete: () => {
                winAmtArr[i].visible = false;
                winAmtArr[i].setScale(1);
              },
            });
          },
        });
      }
    }

    // Reset coins after animations
    setTimeout(() => {
      topPlayersCoinsArr.forEach((coin) => {
        coin.list[0].setVisible(false);
        coin.list[1].setVisible(false);
        coin.setPosition(190, 1221);
      });
    }, 1000);

    // Hide round animations and other elements
    setTimeout(() => {
      round_AnimArr.forEach((round) => (round.visible = false));
      winAmtArr.forEach((winAmt) => {
        winAmt.visible = false;
        winAmt.setScale(1);
      });
      game.bottomPanel.anderTableCardsArray.forEach((card) =>
        card.setVisible(false)
      );
      game.bottomPanel.baharTableCardsArray.forEach((card) =>
        card.setVisible(false)
      );
    }, 5000);
  }
}
let betPlace = new BetPlace();
export { betPlace as BetPlace };
