import { BetPlace } from "./BetPlace.js";
import { Constant } from "./Constant.js";
import { Utils } from "./Utils.js";

class TopPlayersCoin {
  constructor(scene) {
    this.scene = scene;
    this.topPlyerCoinArray = [];
    this.globalPlayersCoin = [];
    this.frameArray = [];
    this.selftUserCoins = [];
  }
  /**
   * coins for top playes
   */
  CreateTopPlyersCoin() {
    for (let i = 0; i < 6; i++) {
      let coinContainer = this.scene.add.container(190, 1221).setDepth(3);
      //=====================================
      let rndNum = Utils.RandomNumberGenerator(1, 6);
      let coinImg = this.scene.add
        .image(0, 0, "currency_list", Constant.playerCurrency[i] + ".png")
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(1);
      // coinImg.setFrame("B_C" + rndNum + ".png");
      coinImg.Name = Constant.wholeCardCodes[i];
      let coinText = this.scene.add
        .text(0, 0, "0", Constant.coinvalueTextStyle[rndNum - 1])
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(1);
      coinContainer.add(coinImg);
      coinContainer.add(coinText);
      this.frameArray.push(rndNum - 1);
      this.topPlyerCoinArray.push(coinContainer);
    }
  }
  /**
   * coins for global playes
   */
  CreateGlobalPlyersCoin() {
    for (let i = 0; i < 26; i++) {
      let coinContainer = this.scene.add.container(175, 1232).setDepth(4);
      //=====================================
      let rndNum = Utils.RandomNumberGenerator(1, 6);
      let coinImg = this.scene.add
        .image(0, 0, "currency_list", Constant.currencyList[Math.floor(Math.random() * Constant.currencyList.length)] + ".png")
        .setOrigin(0.5)
        .setVisible(false);
      // coinImg.setFrame("INR" + ".png");
      coinImg.Name = Constant.wholeCardCodes[i];
      let coinText = this.scene.add
        .text(0, 0, "0", Constant.coinvalueTextStyle[rndNum - 1])
        .setOrigin(0.5)
        .setVisible(false);
      coinContainer.add(coinImg);
      coinContainer.add(coinText);
      this.globalPlayersCoin.push(coinContainer);
    }
  }
  CreateSelfUserCoin() {
    this.selftUserCoins = this.scene.add
      .container(175, 1232)
      .setDepth(4)
      .setVisible(false);
    // let rndNum = Utils.RandomNumberGenerator(1, 6);
    let coinImg = this.scene.add
      .image(0, 0, "currency_list", Constant.currency + "png")
      .setOrigin(0.5);

    let coinText = this.scene.add.text(0, 0, "0").setOrigin(0.5);

    this.selftUserCoins.add(coinImg);
    this.selftUserCoins.add(coinText);
  }
}
export default TopPlayersCoin;
