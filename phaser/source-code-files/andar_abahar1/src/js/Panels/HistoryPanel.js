import { Constant } from "../Constant.js";
class HistoryPanel {
  constructor(scene) {
    this.scene = scene;
    this.historyPanelContainer = null;
    this.historyIconTextArray = [];
  }
  /**
   * history of 10 significant bets as history is showing
   */
  CreateHistoryPanel() {
    this.historyPanelContainer = this.scene.add
      .container(0, Math.floor(Constant.game.config.height / 10.3))
      .setDepth(6);

    for (let i = 0; i < 10; i++) {
      let singleHistory = this.scene.add
        .image(
          Math.floor(Constant.game.config.width / 17.74) +
            i * Math.floor(Constant.game.config.width / 10.143),
          15,
          "ander_bahar_atlas",
          "R.png"
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .setVisible(false);
      this.historyPanelContainer.add(singleHistory);
    }
  }
  OnSpecificHistoryPressed() {}
  /**
   * @param {object} _response
   * @param {like e.g. "Ander" or "Bahar"} _name
   */
  OnSpecificHistoryReleased(_response, _index) {
    this.scene.historyPopUp.singleHistoryPopUpContainer.visible = true;

    //====================================for toggle==========================================
    this.scene.historyPopUp.winnerTagAnder.visible = false;
    this.scene.historyPopUp.winnerTagBahar.visible = false;

    for (let i = 0; i < this.scene.historyPopUp.anderGridArray.length; i++) {
      this.scene.historyPopUp.anderGridArray[i].visible = false;
    }
    for (let i = 0; i < this.scene.historyPopUp.anderCardsArray.length; i++) {
      this.scene.historyPopUp.anderCardsArray[i].visible = false;
      this.scene.historyPopUp.anderCardsArray[i].setTint(0xfefffe);
    }
    for (let i = 0; i < this.scene.historyPopUp.baharGridArray.length; i++) {
      this.scene.historyPopUp.baharGridArray[i].visible = false;
    }
    for (let i = 0; i < this.scene.historyPopUp.baharCardsArray.length; i++) {
      this.scene.historyPopUp.baharCardsArray[i].visible = false;
      this.scene.historyPopUp.baharCardsArray[i].setTint(0xfefffe);
    }
    //===============================================================================
    this.scene.historyPopUp.SetDataToHistoryPopUp(_response, _index);
  }
  SetDataForHistoryPanel(_gameHistoryDataArray) {
    for (let i = 0; i <= _gameHistoryDataArray.length; i++) {
      if (i > 9) {
        break;
      } else {
        this.historyPanelContainer.list[i].visible = true;
        this.historyPanelContainer.list[i].on(
          "pointerdown",
          () => {
            this.OnSpecificHistoryPressed();
          },
          this
        );

        this.historyPanelContainer.list[i].on(
          "pointerup",
          () => {
            this.OnSpecificHistoryReleased(_gameHistoryDataArray[i], i);
          },
          this
        );
      }
    }
  }
}
export default HistoryPanel;
