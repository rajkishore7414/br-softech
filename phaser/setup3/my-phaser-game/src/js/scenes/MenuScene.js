export default class MenuScene extends Phaser.Scene {

  constructor() {
    super('MenuScene'); // 'MenuScene' is the KEY - used to switch scenes
  }

  create() {
    // Background color
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Title text
    this.add.text(400, 200, 'Star Collector', {
      fontSize: '48px',
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5); // setOrigin(0.5) = center the text on x:400, y:200

    // Play button (just a text for now)
    const playBtn = this.add.text(400, 350, '▶  Play', {
      fontSize: '32px',
      fill: '#00d4aa',
      backgroundColor: '#16213e',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5);

    // Make it clickable
    playBtn.setInteractive({ useHandCursor: true });

    // When clicked → switch to GameScene
    playBtn.on('pointerdown', () => {
      this.scene.start('GameScene'); // uses the KEY we defined above
    });

    // Hover effect
    playBtn.on('pointerover', () => playBtn.setStyle({ fill: '#ffffff' }));
    playBtn.on('pointerout',  () => playBtn.setStyle({ fill: '#00d4aa' }));
  }
}