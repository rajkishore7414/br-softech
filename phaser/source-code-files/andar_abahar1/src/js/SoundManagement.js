import { Constant } from "./Constant.js";

class SoundManagement {
  constructor() {
    this.bgMusic = null;
    this.coinMusic = null;
    this.soundOn = 1;
  }
  CreateSound() {
    this.bgMusic = Constant.game.sound.add("bg_music");
    this.coinMusic = Constant.game.sound.add("coin_music");
  }
  PlayBgMusic() {
    if (this.soundOn === 1) {
      this.bgMusic.play();
      this.bgMusic.setLoop(true);
    }
  }
  PlayCoinMusic() {
    if (this.soundOn === 1) {
      this.coinMusic.play();
    }
  }
  StopGameSound() {
    if (this.soundOn === 0) {
      this.bgMusic.stop();
      this.coinMusic.stop();
    }
  }
  PlayGameSound() {
    if (this.soundOn === 1) {
      this.bgMusic.play();
      this.coinMusic.play();
    }
  }
}
let sound = new SoundManagement();
export { sound as SoundManagement };
