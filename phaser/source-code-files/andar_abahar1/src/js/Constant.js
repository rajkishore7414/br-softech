/**
 * all the constant variables that wouldn't be changed through out the game
 * is over here
 */
class Constant {
  constructor() {
    this.game = null;
    this.isMobile = null;
    this.scaleFactor = null;
    this.scaleFactorX = null;
    this.scaleFactorY = null;
    this.currentAspectRatio = null;
    this.originalAspectRatio = null;
    this.currentRatio = null;
    this.coinvalueTextStyle = [];
    this.bottomPanelCardPosition = [];
    this.panel = null;
    this.wholeCardCodes = [];
    this.IsMoving = false;
    this.tourData;
    this.backURLL;
    this.pm;
    this.currencyList = [];
    this.playerCurrency = [];
    this.currency = "";
  }
  CreateCoinStyle() {
    const styleOne = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#1EBFAF",
      fontStyle: "bold",
      align: "center",
    };
    const styleTwo = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#6F12D1",
      fontStyle: "bold",
      align: "center",
    };
    const styleThree = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#0C97E4",
      fontStyle: "bold",
      align: "center",
    };
    const styleFour = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#5FB318",
      fontStyle: "bold",
      align: "center",
    };
    const styleFive = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#BF1E2E",
      fontStyle: "bold",
      align: "center",
    };
    const styleOnSix = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#BC1EBF ",
      fontStyle: "bold",
      align: "center",
    };
    const styleOnSeven = {
      fontFamily: "Montserrat-Bold",
      fontSize: 30,
      fill: "#C88006",
      fontStyle: "bold",
      align: "center",
    };
    this.isSecondView = "";
    this.coinvalueTextStyle.push(styleOne);
    this.coinvalueTextStyle.push(styleTwo);
    this.coinvalueTextStyle.push(styleThree);
    this.coinvalueTextStyle.push(styleFour);
    this.coinvalueTextStyle.push(styleFive);
    this.coinvalueTextStyle.push(styleOnSix);
    this.coinvalueTextStyle.push(styleOnSeven);
    this.bottomPanelCardPosition = [
      { x: 110, y: 1580 },
      { x: 280, y: 1580 },
      { x: 450, y: 1580 },
      { x: 620, y: 1580 },
      { x: 790, y: 1580 },
      { x: 960, y: 1580 },
      { x: 1130, y: 1580 },
      { x: 195, y: 1850 },
      { x: 365, y: 1850 },
      { x: 535, y: 1850 },
      { x: 705, y: 1850 },
      { x: 875, y: 1850 },
      { x: 1045, y: 1850 },
      //-----------------------
      { x: 110, y: 2260 },
      { x: 280, y: 2260 },
      { x: 450, y: 2260 },
      { x: 620, y: 2260 },
      { x: 790, y: 2260 },
      { x: 960, y: 2260 },
      { x: 1130, y: 2260 },
      { x: 195, y: 2535 },
      { x: 365, y: 2535 },
      { x: 535, y: 2535 },
      { x: 705, y: 2535 },
      { x: 875, y: 2535 },
      { x: 1045, y: 2535 },
    ];
    this.wholeCardCodes = [
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
  }
}

let constant = new Constant();
export { constant as Constant };
