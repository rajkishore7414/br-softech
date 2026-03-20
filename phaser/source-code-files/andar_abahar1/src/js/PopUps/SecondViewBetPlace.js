import { BetPlace } from "../BetPlace.js";
import { Constant } from "../Constant.js";
import { Database } from "../Network/DataBase.js";
import { ServerManagement } from "../Network/ServerManagement.js";
import { Utils } from "../Utils.js";

class SecondViewBetPlace {
  constructor(scene) {
    this.scene = scene;
    this.betAmtPrimaryValText = null;
    this.betVariableValue = 100;
    this.decrement = null;
    this.increment = null;
    this.colorArray = [
      "#0EF25F",
      "#F1ED05",
      "#08E5FF",
      "#FF00F5",
      "#FFBB05",
      "#F7A511",
      "#FD5AD1",
      "#B400FF",
      "#0EF25F",
      "#FE1999",
    ];
    this.buttonArray = [];
    this.buttonValueArray = [];
    this.offset = 100;
    this.betPlaceData;
    this.indexVal = 0;
    this.betPlaceVal = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ];
    this.counter = 0;
  }
  CreateSecViewBetPopUp() {
    this.scene.game.events.on("UPDATE_COIN_SECOND", this.updateCoin, this);
    const textStyle = {
      fontFamily: "Arial",
      fontSize: "50px",
      fill: "#000000",
      fontStyle: "bold",
      align: "center",
    };
    this.changeViewBetContainer = this.scene.add
      .container(
        Constant.game.config.width / 2,
        Constant.game.config.height / 1.25
      )
      .setDepth(6);
    let popUpBg = this.scene.add
      .image(0, 0, "ander_bahar_atlas", "s_view_bet_bg_box.png")
      .setOrigin(0.5)
      .setInteractive();
    popUpBg.on("pointerdown", this.OnBgPress, this);
    popUpBg.on("pointerup", this.OnBgRelease, this);
    let amount_box = this.scene.add.image(
      -400,
      -240,
      "ander_bahar_atlas",
      "amount-box.png"
    );
    this.payOutText = this.scene.add
      .text(-400, -240, "", textStyle)
      .setOrigin(0.5);
    let add_or_remove_box = this.scene.add.image(
      220,
      -240,
      "ander_bahar_atlas",
      "add-or-remove-box.png"
    );

    this.betAmtPrimaryValText = this.scene.add
      .text(220, -240, "", textStyle)
      .setOrigin(0.5);
    this.decrement = this.scene.add
      .image(-75, -240, "ander_bahar_atlas", "remove.png")
      .setInteractive({ useHandCursor: true });
    this.decrement.on("pointerdown", this.OnDecrementPress, this);
    this.decrement.on("pointerup", this.OnDecrementRelease, this);

    this.increment = this.scene.add
      .image(510, -240, "ander_bahar_atlas", "add.png")
      .setInteractive({ useHandCursor: true });
    this.increment.on("pointerdown", this.OnIncrementPress, this);
    this.increment.on("pointerup", this.OnIncrementRelease, this);
    // if (this.counter == arr.length - 1) {
    // this.TogglePlusMinusBtn(true);
    // } else if (this.counter == 0) {
    this.TogglePlusMinusBtn(false);
    // } else {
    //   this.Normalize();
    // }
    //###################################################
    this.changeViewBetContainer.add([
      popUpBg,
      amount_box,
      this.payOutText,
      add_or_remove_box,
      this.betAmtPrimaryValText,
      this.decrement,
      this.increment,
    ]);
    let betAmtButton;
    let betAmtText;
    const nameTextStyle = {
      fontFamily: "Arial",
      fontSize: "40px",
      fill: "#DEAE24",
      fontStyle: "bold",
      align: "center",
    };
    const xOffset = [-380, -1285];
    const yOffset = [-60, 80];

    for (let i = 0; i < 7; i++) {
      const indexOffset = i < 4 ? 0 : 1;

      const betAmtButton = this.scene.add
        .image(
          xOffset[indexOffset] + 260 * i,
          yOffset[indexOffset],
          "ander_bahar_atlas",
          "amount-boxes.png"
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      const betAmtText = this.scene.add
        .text(
          xOffset[indexOffset] + 260 * i,
          yOffset[indexOffset],
          "",
          nameTextStyle
        )
        .setOrigin(0.5);
      betAmtText.setColor(this.colorArray[i]);

      betAmtButton.on(
        "pointerdown",
        () => {
          this.OnBetAmtBtnPressed();
        },
        this
      );

      betAmtButton.on(
        "pointerup",
        () => {
          this.OnBetAmtBtnReleased(i);
        },
        this
      );

      this.buttonArray.push(betAmtButton);
      this.buttonValueArray.push(betAmtText);
    }
    const cancelTextStye = {
      fontFamily: "Arial",
      fontSize: "60px",
      fill: "#000000",
      fontStyle: "bold",
      align: "center",
    };
    const placeBetTextStyle = {
      fontFamily: "Arial",
      fontSize: "60px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };
    this.cancelButton = this.scene.add
      .image(-300, 250, "ander_bahar_atlas", "cancle.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    let cancelText = this.scene.add
      .text(-300, 250, "Cancel", cancelTextStye)
      .setOrigin(0.5);
    this.betPlaceButton = this.scene.add
      .image(300, 250, "ander_bahar_atlas", "place-bet.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    let placeBetText = this.scene.add
      .text(300, 250, "Place Bet", placeBetTextStyle)
      .setOrigin(0.5);

    this.cancelButton.on("pointerdown", this.OnCancelPressed, this);
    this.cancelButton.on("pointerup", this.OnCancelReleased, this);
    this.changeViewBetContainer.add(this.buttonArray);
    this.changeViewBetContainer.add(this.buttonValueArray);
    this.changeViewBetContainer.add(this.cancelButton);
    this.changeViewBetContainer.add(cancelText);
    this.changeViewBetContainer.add(this.betPlaceButton);
    this.changeViewBetContainer.add(placeBetText);

    this.changeViewBetContainer.setVisible(false);

    this.betPlaceButton.on("pointerdown", this.OnBetPlacePressed, this);
    // this.betPlaceButton.on("pointerup", this.OnBetPlaceReleased, this);
    this.betPlaceButton.on(
      "pointerup",
      () => {
        this.OnBetPlaceReleased();
      },
      this
    );
  }
  updateCoin(index) {
    this.counter = index - 1;

    let arr = Utils.convertKToNumber(Database.coinStack);
    console.log("this.counter", this.counter, arr.length);
    // if (this.counter >= 0) {
    let value = Utils.convertKToNumber(Database.coinStack)[this.counter];
    this.betVariableValue = Number(value);
    this.betAmtPrimaryValText.setText(this.betVariableValue);
    //   if (arr.indexOf(value) == arr.length - 1) {
    //     this.TogglePlusMinusBtn(false);
    //   } else if (arr.indexOf(value) == 0) {
    //     this.TogglePlusMinusBtn(true);
    //   } else {
    //     this.Normalize();
    //   }
    // }
    if (this.counter == 0) {
      this.increment.setAlpha(1)
      this.increment.setInteractive({ useHandCursor: true })

      this.decrement.removeInteractive()
      this.decrement.setAlpha(0.5)
    }
    if (this.counter == arr.length - 1) {
      this.increment.setAlpha(0.5)
      this.increment.removeInteractive()
      this.decrement.setInteractive({ useHandCursor: true })
      this.decrement.setAlpha(1)
    }

    if (this.counter > 0 && this.counter < arr.length - 1) {
      this.Normalize();
    }
  }
  OnBgPress() { }
  OnBgRelease() { }
  OnDecrementPress() { }
  OnDecrementRelease() {
    if (this.counter <= 0) return
    this.counter -= 1;
    this.scene.game.events.emit("UPDATE_COUNTER_1", this.counter)
    let arr = Utils.convertKToNumber(Database.coinStack);
    if (this.counter >= 0) {
      let value = Utils.convertKToNumber(Database.coinStack)[this.counter];
      this.betVariableValue = (value);
      this.betAmtPrimaryValText.setText(this.betVariableValue);

      if (arr.indexOf(value) == arr.length - 1) {
        this.TogglePlusMinusBtn(true);
      } else if (arr.indexOf(value) == 0) {
        this.TogglePlusMinusBtn(false);
      } else {
        this.Normalize();
      }
    } else if (this.counter == 0) {
      this.TogglePlusMinusBtn(false);
    }
  }
  OnIncrementPress() { }
  OnIncrementRelease() {
    // this.counter += 1;
    // console.log(
    //   "=======>",
    //   Utils.ConvertToKArray(Database.coinStack)[this.counter]
    // );
    // let value = Utils.convertKToNumber(this.betVariableValue);
    // if (value + this.offset <= Database.maxBetAmt) {
    //   value += this.offset;
    //   this.betVariableValue = value;
    //   this.betAmtPrimaryValText.setText(this.betVariableValue);
    // }
    if (this.counter > 5) return
    console.log(" this.counter", this.counter);

    this.Normalize();
    this.counter += 1;
    this.scene.game.events.emit("UPDATE_COUNTER_1", this.counter)
    let arr = Utils.convertKToNumber(Database.coinStack);
    if (this.counter <= arr.length - 1) {
      let value = Utils.convertKToNumber(Database.coinStack)[this.counter];
      this.betVariableValue = (value);
      this.betAmtPrimaryValText.setText(this.betVariableValue);

      if (arr.indexOf(value) == arr.length - 1) {
        this.TogglePlusMinusBtn(true);
      } else if (arr.indexOf(value) == 0) {
        this.TogglePlusMinusBtn(false);
      } else {
        this.Normalize();
      }
    } else if (this.counter == arr.length - 1) {
      this.TogglePlusMinusBtn(true);
    }
  }
  OnCancelPressed() { }
  OnCancelReleased() {
    this.DisableSecViewBetPopUp();
  }
  OnBetPlacePressed() { }
  OnBetPlaceReleased() {
    this.PlaceBet();
  }
  //########UpdateBetValue#######
  OnBetAmtBtnPressed() { }
  OnBetAmtBtnReleased(_index) {
    this.scene.game.events.emit("UPDATE_COUNTER_1", _index)
    const arr = Utils.ConvertToKArray(Database.coinStack);
    this.betVariableValue = arr[_index];
    this.counter = _index;

    this.betAmtPrimaryValText.setText(
      Utils.convertKToNumber(this.betVariableValue)
    );
    // this.offset = _value;

    if (this.counter == arr.length - 1) {
      this.TogglePlusMinusBtn(true);
    } else if (this.counter == 0) {
      this.TogglePlusMinusBtn(false);
    } else {
      this.Normalize();
    }
  }
  //####################################
  EnableSecViewBetPopUp(_index, _scode) {
    this.indexVal = _index;
    // this.ResetPopUp(this.counter);
    this.payOutText.setText(this.scene.secView.payOutArr[_index]._text);
    this.changeViewBetContainer.setVisible(true);
    this.scene.game.events.emit("SECOND_VIEW_ENABLE");
  }
  DisableSecViewBetPopUp() {
    this.changeViewBetContainer.setVisible(false);
    this.scene.game.events.emit("SECOND_VIEW_DISABLE");
  }
  ResetPopUp(_index) {
    this.payOutText.setText(this.scene.secView.payOutArr[_index]._text);
    let priVal = Utils.ConvertToKArray(Database.coinStack);
    this.counter = 0;
    // this.betAmtPrimaryValText.text = priVal[0];
    // this.betVariableValue = priVal[0];
    this.TogglePlusMinusBtn(false);
  }
  //################PlaceBet####################
  PlaceBet() {
    this.DisableSecViewBetPopUp();
    // console.log("====>", Database.accountBalance, this.betVariableValue);
    this.balanceAmt = Database.accountBalance;
    if (
      Database.accountBalance >= Utils.convertKToNumber(this.betVariableValue)
    ) {
      this.betPlaceData = {
        BetAmount: Utils.convertKToNumber(this.betVariableValue),
        MarketId: Database.marketId,
        mcode: Database.mCode,
        PlayerId: Database.userId,
        SelectionId: Database.selectionIdArr[this.indexVal],
        scode: Database.sCodeArray[this.indexVal],
      };
      // console.log("this.betPlaceData", this.betPlaceData);
      let sid = Database.selectionIdArr[this.indexVal];
      this.balanceAmt = Utils.BetUpdate(
        Database.accountBalance, Utils.convertKToNumber(this.betVariableValue), "-"
      );
      Database.accountBalance = this.balanceAmt;
      this.scene.topPanel.currentAmountText.setText(this.balanceAmt);
      this.DataToBeSend(this.betPlaceData, sid);
    } else {
      this.scene.guideLines.MakeInSuffBalanceEnable();
    }
  }
  DataToBeSend(_betPlaceData, sid) {
    const betPlaceDataObject = {
      Data: _betPlaceData,
      Method: 10,
      grpKey: Database.groupKeyObject,
    };
    const betPlaceEncryptedData = Utils.DataEncryption(
      JSON.stringify(betPlaceDataObject)
    );
    ServerManagement.connection.invoke("OnEventRequest", betPlaceEncryptedData);

    this.betPlaceVal[this.indexVal] =
      Utils.BetUpdate(this.betPlaceVal[this.indexVal],
        Utils.convertKToNumber(this.betVariableValue), "+");

    this.DataSetOnPanel(this.betVariableValue, this.indexVal, sid);
  }
  DataSetOnPanel(_betAmount, _key, SelectionId) {
    // console.log("_betAmount", _betAmount,_key);
    let prevValue, value;

    prevValue = localStorage.getItem(SelectionId);
    if (isNaN(prevValue) || prevValue == null) {
      prevValue = 0;
    }
    value =
      Utils.BetUpdate(Utils.convertKToNumber(_betAmount), Utils.convertKToNumber(prevValue), "+");
    localStorage.setItem(SelectionId, value);

    this.scene.secView.totalBetArr[_key].text = Utils.convertToK(
      localStorage.getItem(SelectionId)
    );

    // console.log("data on localstorage", localStorage.getItem(_key));

    if (_key < 13) {
      this.scene.bottomPanel.anderBetPlayerAndGlobal[_key].text =
        Utils.convertToK(
          localStorage.getItem(SelectionId) +
          "/" +
          Database.globalBetsOnAnder[_key]
        );
    } else {
      this.scene.bottomPanel.baharBetPlayerAndGlobal[_key - 13].text =
        Utils.convertToK(
          localStorage.getItem(SelectionId) +
          "/" +
          Database.globalBetsOnBahar[_key - 13]
        );
    }
  }
  SetDataForPopUp(_coinStack) {
    for (let i = 0; i < _coinStack.length; i++) {
      this.buttonValueArray[i].text = _coinStack[i];
    }
    this.betAmtPrimaryValText.text = _coinStack[0];
    this.betVariableValue = _coinStack[0];
  }
  TogglePlusMinusBtn(_bool) {
    _bool == true
      ? (this.increment.setAlpha(0.5),
        this.increment.removeInteractive(),
        this.decrement.setAlpha(1),
        this.decrement.setInteractive({ useHandCursor: true }))
      : (this.decrement.setAlpha(0.5),
        this.decrement.removeInteractive(),
        this.increment.setAlpha(1),
        this.increment.setInteractive({ useHandCursor: true }));
  }
  Normalize() {
    this.increment.setAlpha(1);
    this.increment.setInteractive({ useHandCursor: true });
    this.decrement.setAlpha(1);
    this.decrement.setInteractive({ useHandCursor: true });
  }
}
export default SecondViewBetPlace;
