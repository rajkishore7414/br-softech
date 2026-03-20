import { Constant } from "../Constant.js";
import { Database } from "../Network/DataBase.js";
import { Utils } from "../Utils.js";

class MiddlePanel {
  constructor(scene) {
    this.scene = scene;
    this.topPlayerImageArr = [];
    this.topPlayerNameArr = [];
    this.topPlayerAnimArr = [];
    this.winAmtTextArray = [];
    this.ringArr = [];
    this.anderCard = null;
    this.baharCard = null;
    this.anderCardToAnimate = null;
    this.baharCardToAnimate = null;
    this.combineCardsAndarAndBahar = [];
    this.uniqueCards = [];
    this.dealerLady = null;
  }
  CreateMiddlePanel() {
    this.CreateTableAndUser();
    this.CreateTopPlayers();
    this.CreateTableGrids();
    this.CreateAnimativeCards();
    this.CreateDealerLady();
  }
  EnableSquareAnimAnder() {
    this.squareAnimAnder.visible = true;
    this.squareAnimAnder.play("animation", true);
    setTimeout(() => {
      this.squareAnimAnder.visible = false;
    }, 3000);
  }
  EnableSquareAnimBahar() {
    this.squareAnimBahar.visible = true;
    this.squareAnimBahar.play("animation", true);
    setTimeout(() => {
      this.squareAnimBahar.visible = false;
    }, 3000);
  }
  /**
   * the girl animation and the corresponding table is creating over here
   */
  CreateTableAndUser() {
    this.gameTable = this.scene.add
      .image(
        Constant.game.config.width / 2,
        Constant.game.config.height / 2.6,
        "ander_bahar_atlas",
        "Table.png"
      )
      .setOrigin(0.5);
  }
  CreateAnimativeCards() {
    let conainer = this.scene.add.container(0, 0).setDepth(4);
    this.anderCardToAnimate = this.scene.add
      .image(553, 1022, "4001")
      .setOrigin(0.5)
      .setScale(0.394)
      .setVisible(false);
    this.baharCardToAnimate = this.scene.add
      .image(688, 1022, "2003")
      .setOrigin(0.5)
      .setScale(0.394)
      .setVisible(false);
    conainer.add([this.anderCardToAnimate, this.baharCardToAnimate]);
  }
  CreateTopPlayers() {
    let topPlayer;
    let topPlyerName;
    let topPlayerCircle;
    let anim;
    let winAmtTextForTopPlayers;
    const nameTextStyle = {
      fontFamily: "Montserrat-Bold",
      fontSize: "30px",
      fill: "#DEAE24",
      fontStyle: "bold",
      align: "center",
    };
    const amountTextStyle = {
      fontFamily: "Arial-Black",
      fontSize: "38px",
      fill: "#BEEC6E",
      fontStyle: "bold",
      align: "center",
    };
    for (let i = 0; i <= 5; i++) {
      if (i < 3) {
        topPlayer = this.scene.add
          .sprite(100, 390 + 190 * i, "topPlayer")
          .setOrigin(0.5);
        topPlayerCircle = this.scene.add.sprite(
          100,
          390 + 190 * i,
          "ander_bahar_atlas",
          "yellow_ring_pic.png"
        );
        topPlyerName = this.scene.add
          .text(100, 475 + 190 * i, "Banty", nameTextStyle)
          .setOrigin(0.5);

        const top_players_gradient_left =
          topPlyerName.context.createLinearGradient(
            0,
            0,
            0,
            topPlyerName.height
          );
        top_players_gradient_left.addColorStop(0, "#fee83b");
        top_players_gradient_left.addColorStop(0.2, "#ca8618");
        top_players_gradient_left.addColorStop(0.5, "#eed22e");
        top_players_gradient_left.addColorStop(0.8, "#fee83b");
        top_players_gradient_left.addColorStop(1, "#ca8618");
        topPlyerName.setFill(top_players_gradient_left);
        winAmtTextForTopPlayers = this.scene.add
          .text(210, 365 + 190 * i, "amount", amountTextStyle)
          .setVisible(false);
        anim = this.scene.add
          .spine(970, 360 + 190 * i, "spine_round")
          .setVisible(false);
        anim.play("animation", true);
      } else if (i > 2) {
        topPlayer = this.scene.add
          .sprite(1150, -175 + 190 * i, "topPlayer")
          .setOrigin(0.5);
        topPlyerName = this.scene.add
          .text(1150, -88 + 190 * i, "Mukherjee", nameTextStyle)
          .setOrigin(0.5);
        topPlayerCircle = this.scene.add.sprite(
          1150,
          -175 + 190 * i,
          "ander_bahar_atlas",
          "blue_ring_pic.png"
        );

        const top_players_gradient_right =
          topPlyerName.context.createLinearGradient(
            0,
            0,
            0,
            topPlyerName.height
          );
        top_players_gradient_right.addColorStop(0, "#0ee5e7");
        top_players_gradient_right.addColorStop(0.3, "#1be66a");
        top_players_gradient_right.addColorStop(0.5, "#18f2ec");
        top_players_gradient_right.addColorStop(0.7, "#67F1E6");
        top_players_gradient_right.addColorStop(1, "#67F1E6");
        topPlyerName.setFill(top_players_gradient_right);
        winAmtTextForTopPlayers = this.scene.add
          .text(925, -200 + 190 * i, "amount", amountTextStyle)
          .setVisible(false);
        anim = this.scene.add
          .spine(2020, -205 + 190 * i, "spine_round")
          .setVisible(false);
        anim.play("animation", true);
      }
      this.topPlayerImageArr.push(topPlayer);
      this.topPlayerNameArr.push(topPlyerName);
      this.topPlayerAnimArr.push(anim);
      this.ringArr.push(topPlayerCircle);
      this.winAmtTextArray.push(winAmtTextForTopPlayers);
    }
  }
  CreateTableGrids() {
    let gridTagSetUpImg = this.scene.add
      .image(622, 1037, "ander_bahar_atlas", "CC.png")
      .setOrigin(0.5);
    this.anderCard = this.scene.add
      .image(553, 1037, "cards", "4001")
      .setOrigin(0.5)
      .setScale(0.394)
      .setVisible(false);
    this.baharCard = this.scene.add
      .image(688, 1037, "cards", "4003")
      .setOrigin(0.5)
      .setScale(0.394)
      .setVisible(false);
  }
  CreateDealerLady() {
    this.dealerLady = this.scene.add.spine(621, 1370, "dealerLady");
    this.dealerLady.play("Idle_Eb");
  }
  PlayAnderAnimation() {
    this.dealerLady.play("Andar");
    this.dealerLady.timeScale = 1.1;
  }
  PlayBaharAnimation() {
    this.dealerLady.play("Bahar");
    this.dealerLady.timeScale = 1.1;
  }
  PlayCardShuffleAnimation() {
    this.dealerLady.play("Card_Suffle");
    this.dealerLady.timeScale = 1.2;
  }
  PlayIdle() {
    this.dealerLady.play("Idle_Eb");
  }

  async SetCardsExplicitly(_response) {
    let cardObjArr = [],
      cardCode,
      playerId,
      cardValue,
      IsOpen,
      cardObj;

    this.combineCardsAndarAndBahar = [
      ...this.scene.bottomPanel.anderTableCardsArray,
      ...this.scene.bottomPanel.baharTableCardsArray,
    ];
    for (let i = 0; i < _response.length; i++) {
      cardCode = _response[i].CardCode;
      playerId = _response[i].PlayerId;
      cardValue = _response[i].CardValue;
      IsOpen = _response[i].IsOpen;
      cardObj = {
        cardCode: cardCode,
        playerId: playerId,
        cardValue: cardValue,
        IsOpen: IsOpen,
      };
      cardObjArr.push(cardObj);
    }
    for (let i = 0; i < cardObjArr.length; i++) {
      if (cardObjArr[i].IsOpen == 1) {
        this.SetPreviouslyShownCards(cardObjArr[i]);
      } else {
        if (cardObjArr[i].playerId >= 1795 && cardObjArr[i].playerId <= 1807) {
          this.PlayAnderAnimation();
          await this.delay(2000);
          this.anderCard.visible = true;
          this.anderCard.setTexture("cards", cardObjArr[i].cardCode);
          setTimeout(() => {
            this.anderCard.visible = false;
          }, 200);
          if (this.uniqueCards.includes(cardObjArr[i].cardValue) == false) {
            setTimeout(() => {
              this.SetCardsToAnder(cardObjArr[i]);
            }, 200);
          }
        } else {
          this.PlayBaharAnimation();
          await this.delay(2000);
          this.baharCard.visible = true;
          this.baharCard.setTexture("cards", cardObjArr[i].cardCode);
          setTimeout(() => {
            this.baharCard.visible = false;
          }, 200);
          if (this.uniqueCards.includes(cardObjArr[i].cardValue) == false) {
            setTimeout(() => {
              this.SetCardsToBahar(cardObjArr[i]);
            }, 200);
          }
        }
      }
    }
  }
  SetCardsToAnder(_cardObj) {
    this.anderCardToAnimate.visible = true;
    this.anderCardToAnimate.setTexture("cards", _cardObj.cardCode);
    for (
      let i = 0;
      i < this.scene.bottomPanel.anderTableCardsArray.length;
      i++
    ) {
      if (
        _cardObj.playerId ===
        this.scene.bottomPanel.anderTableCardsArray[i].Name
      ) {
        this.scene.tweens.add({
          targets: this.anderCardToAnimate,
          ease: "Linear",
          duration: 300,
          x: this.scene.bottomPanel.anderTableCardsArray[i].x,
          y: this.scene.bottomPanel.anderTableCardsArray[i].y,
          onComplete: () => {
            this.uniqueCards.push(_cardObj.cardValue);
            this.scene.bottomPanel.anderTableCardsArray[i].setTexture("cards",
              _cardObj.cardCode
            );
            this.scene.bottomPanel.anderTableCardsArray[i].setVisible(true);
            this.anderCardToAnimate.setPosition(553, 1022);
            this.anderCardToAnimate.visible = false;
          },
        });
      }
    }
  }
  SetCardsToBahar(_cardObj) {
    this.baharCardToAnimate.visible = true;
    this.baharCardToAnimate.setTexture("cards", _cardObj.cardCode);
    for (
      let i = 0;
      i < this.scene.bottomPanel.baharTableCardsArray.length;
      i++
    ) {
      if (
        _cardObj.playerId ===
        this.scene.bottomPanel.baharTableCardsArray[i].Name
      ) {
        this.scene.tweens.add({
          targets: this.baharCardToAnimate,
          ease: "Linear",
          duration: 300,
          x: this.scene.bottomPanel.baharTableCardsArray[i].x,
          y: this.scene.bottomPanel.baharTableCardsArray[i].y,
          onComplete: () => {
            this.uniqueCards.push(_cardObj.cardValue);
            this.scene.bottomPanel.baharTableCardsArray[i].setTexture("cards",
              _cardObj.cardCode
            );
            this.scene.bottomPanel.baharTableCardsArray[i].setVisible(true);
            this.baharCardToAnimate.setPosition(688, 1022);
            this.baharCardToAnimate.visible = false;
          },
        });
      }
    }
  }
  SetPreviouslyShownCards(_cardObj) {
    for (let i = 0; i < this.combineCardsAndarAndBahar.length; i++) {
      if (this.uniqueCards.includes(_cardObj.cardValue) == false) {
        if (this.combineCardsAndarAndBahar[i].Name === _cardObj.playerId) {
          this.combineCardsAndarAndBahar[i].setTexture("cards", _cardObj.cardCode);
          this.combineCardsAndarAndBahar[i].visible = true;
          this.uniqueCards.push(_cardObj.cardValue);
        }
      }
    }
  }
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
export default MiddlePanel;
