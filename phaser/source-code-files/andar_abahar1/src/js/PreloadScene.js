/**
 * here we will do the loading related work and start the requird scene as per the game requirment
 */
import { Constant } from "./Constant.js";
// import { ServerManagement } from "./Network/ServerManagement.js";
import { SoundManagement } from "./SoundManagement.js";
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
    this.fonts = {
      "Roboto-Bold": null,
      "RobotoCondensed-Regular": null,
      "Montserrat-Bold": null,
      "Americana Extra Bold": null,
      "Noto Sans Arabic": null,
      "Noto Sans Thai": null,
      "TiroDevanagari": null,
      "Roboto-Medium": null
    };
  }
  preload() { }
  create() {
    this.loadFonts();
  }
  /**
   * loading fonts
   */
  loadFonts() {
    let propName = Object.getOwnPropertyNames(this.fonts);
    propName.forEach((fontName, index) => {
      let isLast = index >= propName.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);

      this.fonts[fontName]
        .load()
        .then(
          this.FontLoadSuccess.bind(this, fontName, isLast),
          this.FontLoadError.bind(this, fontName)
        );
    });
  }
  /***
   * on successfont load this method will be called
   * only then the assets will be loaded
   */
  FontLoadSuccess(fontName, isLast) {
    if (isLast) {
      this.loadAssets();
    }
  }
  /**
   * If we face any kind of error at the time of loading fonts
   * here we will be able to see the specific error
   * @param {font name} fontName
   */
  FontLoadError(fontName, error) {
    // console.log(`Font load error for ${fontName}:`, error);
  }
  /**
   * loading all the assets required for the game
   */
  loadAssets() {
    this.load.on("progress", this.loadProgress, this);
    this.load.on("complete", this.OnComplete, { scene: this.scene });

    //=========================================================
    this.load.multiatlas(
      "ander_bahar_atlas",
      "assets/images/_Vir_Andar_Bahr_1.0_Sprite_Sheet/Vir_Andar_Bahr_1.0_Sprite_Sheet.json"
    );
    this.load.multiatlas(
      "topPlayer",
      "assets/images/Home/Avtar/Avtar.json"
    );
    this.load.multiatlas(
      "cards",
      "assets/images/cards/Card_Sprite.json"
    );
    this.load.image("side_black", "assets/images/home/side_black.png");
    this.load.image("nextBtn", "assets/images/next_bttn.png");
    this.load.image("resultpopupBg", "assets/images/result/resultpopupBg.png");
    this.load.image("Portrait_BG", "assets/images/Portrait_BG.png");

    this.load.image("homeBtn", "assets/images/Home/home_icon.png");
    this.load.image("goToWrapperImg", "assets/images/Home/go_to_home_popup.png");
    this.load.image("goToGreenOk", "assets/images/Home/green_bttn.png");
    this.load.image("goToYellowOk", "assets/images/Home/yellow_bttn.png");
    this.load.image("gotoCancel", "assets/images/Home/red_bttn.png");
    this.load.image("strip", "assets/images/Home/Coinamount.png");
    this.load.image("crossHome", "assets/images/Home/cross_super-virtual.png");
    this.load.multiatlas("currency_list", "https://ik.imagekit.io/iyafbeire/currency list/currency list.json");
    // //sounds load
    this.load.audio(
      "bg_music",
      "assets/sound/dragon tiger background music 02.mp3"
    );
    this.load.audio("coin_music", "assets/sound/Coin Sound Revise.mp3");

    this.load.image("black", "assets/images/rules/black.png");
    this.load.image("loaderBg", "assets/images/loading/loader.jpg");
    this.load.spine(
      "spine_round",
      "assets/images/spine/top_platers_win_ani/skeleton.json",
      "assets/images/spine/top_platers_win_ani/skeleton.atlas"
    );
    this.load.spine(
      "dealerLady",
      "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.json",
      "assets/images/spine/Andar_Bahr_1.0/Andar_Bahr_1.0.atlas"
    );
    this.load.spine(
      "winnerBox",
      "assets/images/spine/Win_Outer/Win_Outer.json",
      "assets/images/spine/Win_Outer/Win_Outer.atlas"
    );
    this.load.spine(
      "Connection_Lose",
      "assets/images/spine/Connection_Lose/skeleton.json",
      "assets/images/spine/Connection_Lose/skeleton.atlas"
    );

    this.load.start();
  }
  loadProgress() { }
  /**
   * on completion of loading od all  the assets
   * this method will be called and here we are stopping the current scene and starting the
   * GameScene.js
   */
  OnComplete() {
    Constant.game.scene.stop("PreloadScene");
    SoundManagement.CreateSound();
    Constant.game.scene.start("GameScene");
  }
  update() { }
}
