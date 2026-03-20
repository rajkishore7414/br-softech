import { Constant } from "../Constant.js";

class HistoryPopUp {
  constructor(scene) {
    this.scene = scene;
    this.singleHistoryPopUpContainer = null;

    this.anderGridArray = [];
    this.anderCardsArray = [];

    this.baharGridArray = [];
    this.baharCardsArray = [];

    this.dealerCardGrid = null;
    this.dealerCard = null;
    this.roundId = null;
  }
  /**
   * On click to the significant history button history pop up will be shown
   * by showing details of that corresponding bet as history
   */
  CreateSingleHistoryPopUp() {
    this.singleHistoryPopUpContainer = this.scene.add
      .container(621, 1340)
      .setDepth(6);

    this.CreateBgAndResultText();
    this.CreateRoundIdText();
    this.CreateAnder();
    this.CreateAnderCardGrids();
    this.CreateBahar();
    this.CreateBaharCardGrid();
    this.CreateCloseButton();
    this.singleHistoryPopUpContainer.visible = false;
  }
  CreateBgAndResultText() {
    let overlay = this.scene.add
      .image(0, 0, "black")
      .setOrigin(0.5)
      .setAlpha(0.7)
      .setScale(1242, 2680);
    let historyPopUpBg = this.scene.add
      .image(0, 320, "resultpopupBg")
      .setOrigin(0.5, 0.5)
      .setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 0.75)
      .setInteractive();
    historyPopUpBg.on("pointerdown", this.OnBgClick, this);
    historyPopUpBg.on("pointerup", this.OnBgUp, this);
    const resultsTextStyle = {
      fontFamily: "Arial",
      fontSize: 115,
      fill: "#FBBC00",
      fontStyle: "bold",
      align: "center",
    };
    let historytext = this.scene.add
      .text(0, -590, "Results", resultsTextStyle)
      .setScale(1, 1)
      .setOrigin(0.5);

    this.singleHistoryPopUpContainer.add(overlay);
    this.singleHistoryPopUpContainer.add(historyPopUpBg);
    this.singleHistoryPopUpContainer.add(historytext);
  }
  OnBgClick() { }
  OnBgUp() { }
  CreateRoundIdText() {
    const ipTextStyle = {
      fontFamily: "Arial",
      fontSize: "55px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };
    this.roundId = this.scene.add.text(0, -430, "", ipTextStyle).setOrigin(0.5);
    this.singleHistoryPopUpContainer.add(this.roundId);
  }
  CreateAnder() {
    const ipTextStyle = {
      fontFamily: "Arial",
      fontSize: "65px",
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };
    let upperBox = this.scene.add
      .image(0, -20, "ander_bahar_atlas", "Popup-uper-box.png")
      .setOrigin(0.5)
      .setScale(1, 1.1);
    this.winnerTagAnder = this.scene.add
      .image(0, -510, "ander_bahar_atlas", "winner.png")
      .setOrigin(0.5)
      .setVisible(false);
    let playerAText = this.scene.add
      .text(0, -220, "Andar", ipTextStyle)
      .setOrigin(0.5, 0.5);

    this.singleHistoryPopUpContainer.add(upperBox);
    this.singleHistoryPopUpContainer.add(this.winnerTagAnder);
    this.singleHistoryPopUpContainer.add(playerAText);
  }
  CreateAnderCardGrids() {
    //optimize way
    const anderGridPositions = [
      { x: -430, y: -35 },
      { x: -1392, y: 100 },
      { x: -2353, y: 235 },
    ];

    let cardOuterBox;
    let andercards;

    for (let i = 0; i <= 24; i++) {
      let anderGridIndex = 0;

      if (i > 8 && i <= 17) {
        anderGridIndex = 1;
      } else if (i > 17) {
        anderGridIndex = 2;
      }

      const xPosition = anderGridPositions[anderGridIndex].x + i * 107;
      const yPosition = anderGridPositions[anderGridIndex].y;

      cardOuterBox = this.scene.add
        .image(xPosition, yPosition, "card-outer-box")
        .setOrigin(0.5)
        .setScale(0.6);
      andercards = this.scene.add
        .image(xPosition, yPosition, "2001")
        .setOrigin(0.5)
        .setScale(0.43);

      this.anderGridArray.push(cardOuterBox);
      this.anderCardsArray.push(andercards);

      this.anderGridArray[i].visible = false;
      this.anderCardsArray[i].visible = false;
    }

    this.singleHistoryPopUpContainer.add(this.anderGridArray);
    this.singleHistoryPopUpContainer.add(this.anderCardsArray);
  }
  CreateBahar() {
    const ipTextStyle = {
      fontFamily: "Arial",
      fontSize: 65,
      fill: "#FFFFFF",
      fontStyle: "bold",
      align: "center",
    };
    let lowerBox = this.scene.add
      .image(0, 770, "ander_bahar_atlas", "Popup-uper-box.png")
      .setOrigin(0.5)
      .setScale(1, 1.1);
    this.winnerTagBahar = this.scene.add
      .image(0, 430, "ander_bahar_atlas", "winner.png")
      .setOrigin(0.5, 0.5); //.setVisible(false);
    let playerBText = this.scene.add
      .text(0, 545, "Bahar", ipTextStyle)
      .setOrigin(0.5, 0.5);

    this.singleHistoryPopUpContainer.add(lowerBox);
    this.singleHistoryPopUpContainer.add(this.winnerTagBahar);
    this.singleHistoryPopUpContainer.add(playerBText);
  }
  CreateBaharCardGrid() {
    //optimize way
    const baharGridPositions = [
      { x: -430, y: 755 },
      { x: -1392, y: 890 },
      { x: -2353, y: 1020 },
    ];

    for (let i = 0; i <= 24; i++) {
      let baharGridIndex = 0;

      if (i > 8 && i <= 17) {
        baharGridIndex = 1;
      } else if (i > 17) {
        baharGridIndex = 2;
      }

      const xPosition = baharGridPositions[baharGridIndex].x + i * 107;
      const yPosition = baharGridPositions[baharGridIndex].y;

      const cardLowerBox = this.scene.add
        .image(xPosition, yPosition, "card-outer-box")
        .setOrigin(0.5)
        .setScale(0.6);
      const baharCards = this.scene.add
        .image(xPosition, yPosition, "cards", "1001")
        .setOrigin(0.5)
        .setScale(0.43);

      this.baharGridArray.push(cardLowerBox);
      this.baharCardsArray.push(baharCards);
      this.baharGridArray[i].visible = false;
    }

    this.singleHistoryPopUpContainer.add(this.baharGridArray);
    this.singleHistoryPopUpContainer.add(this.baharCardsArray);
    this.singleHistoryPopUpContainer.visible = false;
  }

  CreateCloseButton() {
    let closeBtn = this.scene.add
      .image(0, 1215, "ander_bahar_atlas", "close.png")
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });
    closeBtn.on("pointerdown", this.OnCloseBottonDown, this);
    closeBtn.on("pointerup", this.OnCloseBottonUp, this);

    this.singleHistoryPopUpContainer.add(closeBtn);
  }
  OnCloseBottonDown() { }
  OnCloseBottonUp() {
    this.singleHistoryPopUpContainer.visible = false;
  }

  /**
   * Set data on history pop up according to the specific click on the history panel icon
   */
  SetDataToHistoryPopUp(_gameHistory, _index) {
    this.roundId.setText(_gameHistory.RoundId); //Round Text
    let anderCardsArr = [];
    let baharCardsArr = [];
    anderCardsArr = _gameHistory.CardDetails[0].Cards.split(",");
    baharCardsArr = _gameHistory.CardDetails[1].Cards.split(",");
    let previousPartsAnder = anderCardsArr.map(
      (element) => element.split("$")[0]
    );
    let previousPartsBahar = baharCardsArr.map(
      (element) => element.split("$")[0]
    );

    console.log("previousPartsAnder", previousPartsAnder, previousPartsBahar);
    previousPartsAnder.forEach((element, _index) => {
      this.anderGridArray[_index].visible = true;
      this.anderCardsArray[_index].setVisible(true);
      this.anderCardsArray[_index].setTexture("cards", element);
    });
    previousPartsBahar.forEach((element, _index) => {
      this.baharGridArray[_index].visible = true;
      this.baharCardsArray[_index].setVisible(true);
      this.baharCardsArray[_index].setTexture("cards", element);
    });
    this.fillColorForCards(_gameHistory);
  }
  fillColorForCards(_gameHistory) {
    let anderCardsArr = [];
    let baharCardsArr = [];
    anderCardsArr = _gameHistory.CardDetails[0].Cards.split(",");
    baharCardsArr = _gameHistory.CardDetails[1].Cards.split(",");
    anderCardsArr.forEach((element, index) => {
      if (element.endsWith("$1")) {
      } else if (element.endsWith("$0")) {
        this.anderCardsArray[index].setTint(0xf8e07e);
      }
    });
    baharCardsArr.forEach((element, index) => {
      if (element.endsWith("$1")) {
      } else if (element.endsWith("$0")) {
        this.baharCardsArray[index].setTint(0xf8e07e);
      }
    });
  }
}
export default HistoryPopUp;
