/**
 * Second January 6 PM this project has been started by Supriyo Mukherjee from scratch
 * This scene will be the controller for the entire game
 */
//Network

import { ServerManagement } from "./Network/ServerManagement.js";
//panels
import Background from "./Panels/Background.js";
import BottomPanel from "./Panels/BottomPanel.js";
import GameStatus from "./Panels/GameStatus.js";
import HistoryPanel from "./Panels/HistoryPanel.js";
import MiddlePanel from "./Panels/MiddlePanel.js";
import TopPanel from "./Panels/TopPanel.js";
import TopPlayersCoin from "./TopPlyersCoin.js";
import ChangeViewPanel from "./Panels/ChangeViewPanel.js";
//Popups
import CoinPopUp from "./PopUps/CoinPopUp.js";
import MenuPopUp from "./PopUps/MenuPopUp.js";
import RulesPopUp from "./PopUps/RulesPopUp.js";
import HistoryPopUp from "./PopUps/HistoryPopUp.js";
import SecondViewBetPlace from "./PopUps/SecondViewBetPlace.js";
import GuideLinesHelper from "./PopUps/GuideLinesHelper.js";
import { Constant } from "./Constant.js";
import chalk from "chalk";
import tour from "./PopUps/tour.js";
import Home from "./PopUps/HomePanel.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    //panels
    this.bg;
    this.topPanel;
    this.historyPanel;
    this.MiddlePanel;
    this.gameStatus;
    this.bottomPanel;
    this.secView;
    //Popups
    this.coinPopUp;
    this.menuPopUp;
    this.rulesPopUp;
    this.historyPopUp;
    this.secViewBet;
    this.guideLines;

    this.topCoin;
    this.userIn;
    this.tour;
    this.Home;
  }
  preload() {
    //panels
    this.bg = new Background(this);
    this.topPanel = new TopPanel(this);
    this.historyPanel = new HistoryPanel(this);
    this.middlePanel = new MiddlePanel(this);
    this.gameStatus = new GameStatus(this);
    this.bottomPanel = new BottomPanel(this);
    this.secView = new ChangeViewPanel(this);
    this.topCoin = new TopPlayersCoin(this);
    //Popups
    this.coinPopUp = new CoinPopUp(this);
    this.menuPopUp = new MenuPopUp(this);
    this.rulesPopUp = new RulesPopUp(this);
    this.historyPopUp = new HistoryPopUp(this);
    this.secViewBet = new SecondViewBetPlace(this);
    this.guideLines = new GuideLinesHelper(this);
    this.tour = new tour(this);
    this.Home = new Home(this);
  }
  create() {
    Constant.CreateCoinStyle();
    //panels
    this.bg.CreateBackground();
    this.topPanel.CreateTopPanel();
    this.historyPanel.CreateHistoryPanel();
    this.middlePanel.CreateMiddlePanel();
    this.gameStatus.CreateGameStatusTable();
    this.bottomPanel.CreateBottomPanel();
    this.secView.CreateChangeViewPanel();
    this.topCoin.CreateGlobalPlyersCoin();
    this.topCoin.CreateTopPlyersCoin();
    this.topCoin.CreateSelfUserCoin();

    //Popups
    this.coinPopUp.CreateCoinPopUp();
    this.menuPopUp.CreateMenuPopUp();
    this.rulesPopUp.CreateRulesPopUp();
    this.historyPopUp.CreateSingleHistoryPopUp();
    this.secViewBet.CreateSecViewBetPopUp();
    this.guideLines.CreateGuideLines();
    this.Home.CreateHome();

    ServerManagement.initializeConnection();
    if (ServerManagement.isSignalRConnected) {
      console.log(
        chalk.bold
          .rgb(87, 65, 197)
          .bgYellowBright.bold("Hey user, SignalR is connected")
      );
    } else {
      console.log(
        chalk.bold
          .rgb(11, 11, 197)
          .bgWhite.bold("error occured : SignalR is not connected")
      );
    }
  }
  update() { }
}
