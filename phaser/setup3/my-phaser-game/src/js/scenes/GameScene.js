// export default class GameScene extends Phaser.Scene {

//   constructor() {
//     super('GameScene');
//   }

//   create() {
//     this.cameras.main.setBackgroundColor('#0f3460');
//         // this.setBackgroundColor('#0f3460');

//     this.add.text(400, 300, 'Game Scene\n(coming next step!)', {
//       fontSize: '28px',
//       fill: '#ffffff',
//       align: 'center'
//     }).setOrigin(1,1);

// //     this.add.text(400, 300, 'Hello!', {
// //   fontFamily: 'Arial',
// //   fontSize: '32px',
// //   fontStyle: 'bold',
// //   fill: '#ffffff',
// //   stroke: '#000000',
// //   strokeThickness: 4,
// //   backgroundColor: '#1a1a2e',
// //   padding: { x: 15, y: 8 },
// //   shadow: { offsetX: 2, offsetY: 2, color: '#000', blur: 4, fill: true }
// // }).setOrigin(0.5);
//   }
// }
























// export default class GameScene extends Phaser.Scene {

//   constructor() {
//     super('GameScene');
//   }

//   create() {
//     this.cameras.main.setBackgroundColor('#0f3460');

//     // ── GROUND ──────────────────────────────
//     // add.rectangle(x, y, width, height, color)
//     this.add.rectangle(400, 480, 800, 40, 0x16213e);

//     // ── PLAYER ──────────────────────────────
//     // A simple blue rectangle as our player
//     this.player = this.add.rectangle(100, 430, 40, 40, 0x00d4aa);

//     // ── STARS ───────────────────────────────
//     this.add.circle(200, 400, 12, 0xffdd57); // circle(x, y, radius, color)
//     this.add.circle(400, 350, 12, 0xffdd57);
//     this.add.circle(600, 400, 12, 0xffdd57);

//     // ── SCORE TEXT ──────────────────────────
//     this.add.text(16, 16, 'Score: 0', {
//       fontSize: '24px',
//       fill: '#ffffff',
//       fontStyle: 'bold'
//     }); // no setOrigin here — top-left is fine for UI text
//   }
// }





























// export default class GameScene extends Phaser.Scene {

//   constructor() {
//     super('GameScene');
//   }

//   create() {
//     this.cameras.main.setBackgroundColor('#0f3460');

//     // Ground
//     this.add.rectangle(400, 480, 800, 40, 0x16213e);

//     // Player
//     this.player = this.add.rectangle(100, 430, 40, 40, 0x00d4aa);

//     // Stars
//     this.add.circle(200, 400, 12, 0xffdd57);
//     this.add.circle(400, 350, 12, 0xffdd57);
//     this.add.circle(600, 400, 12, 0xffdd57);

//     // Score
//     this.add.text(16, 16, 'Score: 0', {
//       fontSize: '24px',
//       fill: '#ffffff',
//       fontStyle: 'bold'
//     });

//     // ── INPUT ────────────────────────────────
//     // createCursorKeys() gives you arrow keys + shift + space
//     this.cursors = this.input.keyboard.createCursorKeys();

//     // Player speed
//     this.speed = 4;
//   }

//   // ── UPDATE ───────────────────────────────
//   // Runs 60 times per second automatically
//   update() {
//     if (this.cursors.left.isDown) {
//       this.player.x -= this.speed;  // move left
//     }

//     if (this.cursors.right.isDown) {
//       this.player.x += this.speed;  // move right
//     }

//     if (this.cursors.up.isDown) {
//       this.player.y -= this.speed;  // move up
//     }

//     if (this.cursors.down.isDown) {
//       this.player.y += this.speed;  // move down
//     }
//   }
// }



// export default class GameScene extends Phaser.Scene {

//   constructor() {
//     super('GameScene');
//   }

//   create() {
//     this.cameras.main.setBackgroundColor('#0f3460');

//     // ── GROUND ──────────────────────────────
//     // this.physics.add.staticGroup() → objects that DON'T move
//     this.ground = this.physics.add.staticGroup();

//     // create() adds a game object into the group
//     this.ground.create(400, 480, null)
//       .setDisplaySize(800, 40)  // width, height
//       .refreshBody()            // MUST call after resizing static body
//       .setFillStyle(0x16213e);  // color

//     // ── PLAYER ──────────────────────────────
//     // this.physics.add.existing() → adds physics to a regular object
//     this.player = this.add.rectangle(100, 200, 40, 40, 0x00d4aa);
//     this.physics.add.existing(this.player);

//     // player physics body settings
//     this.player.body.setCollideWorldBounds(true); // can't go off screen

//     // ── STARS ───────────────────────────────
//     this.add.circle(200, 400, 12, 0xffdd57);
//     this.add.circle(400, 350, 12, 0xffdd57);
//     this.add.circle(600, 400, 12, 0xffdd57);

//     // ── SCORE ───────────────────────────────
//     this.add.text(16, 16, 'Score: 0', {
//       fontSize: '24px',
//       fill: '#ffffff',
//       fontStyle: 'bold'
//     });

//     // ── COLLIDER ────────────────────────────
//     // makes player land ON ground instead of falling through
//     this.physics.add.collider(this.player, this.ground);

//     // ── INPUT ───────────────────────────────
//     this.cursors = this.input.keyboard.createCursorKeys();
//   }

//   update() {
//     // Left / Right movement
//     if (this.cursors.left.isDown) {
//       this.player.body.setVelocityX(-200); // push left
//     } else if (this.cursors.right.isDown) {
//       this.player.body.setVelocityX(200);  // push right
//     } else {
//       this.player.body.setVelocityX(0);    // stop
//     }

//     // Jump — only when touching ground
//     if (this.cursors.space.isDown && this.player.body.blocked.down) {
//       this.player.body.setVelocityY(-400); // push upward
//     }
//   }
// }







// export default class GameScene extends Phaser.Scene {

//   constructor() {
//     super('GameScene'); 
//   }

//   create() {
//     this.cameras.main.setBackgroundColor('#0f3460');

//     // ── GROUND ──────────────────────────────
//     this.groundRect = this.add.rectangle(400, 480, 800, 40, 0x16213e);
//     this.physics.add.existing(this.groundRect, true); // true = static

//     // ── PLAYER ──────────────────────────────
//     this.player = this.add.rectangle(100, 200, 40, 40, 0x00d4aa);
//     this.physics.add.existing(this.player);
//     this.player.body.setCollideWorldBounds(true);

//     // ── STARS ───────────────────────────────
//     this.add.circle(200, 400, 12, 0xffdd57);
//     this.add.circle(400, 350, 12, 0xffdd57);
//     this.add.circle(600, 400, 12, 0xffdd57);

//     // ── SCORE ───────────────────────────────
//     this.add.text(16, 16, 'Score: 0', {
//       fontSize: '24px',
//       fill: '#ffffff',
//       fontStyle: 'bold'
//     });

//     // ── COLLIDER ────────────────────────────
//     this.physics.add.collider(this.player, this.groundRect);

//     // ── INPUT ───────────────────────────────
//     this.cursors = this.input.keyboard.createCursorKeys();
//   }

//   update() {
//     // Left / Right movement
//     if (this.cursors.left.isDown) {
//       this.player.body.setVelocityX(-200);
//     } else if (this.cursors.right.isDown) {
//       this.player.body.setVelocityX(200);
//     } else {
//       this.player.body.setVelocityX(0);
//     }

//     // Jump — only when touching ground
//     if (this.cursors.space.isDown && this.player.body.blocked.down) {
//       this.player.body.setVelocityY(-400);
//     }
//   }
// }





export default class GameScene extends Phaser.Scene {f

  constructor() {
    super('GameScene');
  }

  create() {
    this.cameras.main.setBackgroundColor('#0f3460');

    // ── SCORE VARIABLE ──────────────────────
    this.score = 0;

    // ── GROUND ──────────────────────────────
    this.groundRect = this.add.rectangle(400, 480, 800, 40, 0x16213e);
    this.physics.add.existing(this.groundRect, true);

    // ── PLAYER ──────────────────────────────
    this.player = this.add.rectangle(100, 200, 40, 40, 0x00d4aa);
    this.physics.add.existing(this.player);
    this.player.body.setCollideWorldBounds(true);

    // ── STARS GROUP ─────────────────────────
    // a group holds multiple similar objects together
    this.stars = this.physics.add.group();

    // star positions array
    const positions = [150, 250, 350, 450, 550, 650, 750];

    // loop through positions and create a star at each one
    positions.forEach(xPos => {
      const star = this.add.circle(xPos, 100, 12, 0xffdd57);
      this.physics.add.existing(star); // give each star physics
      star.body.setCollideWorldBounds(true);
      this.stars.add(star); // add star into the group
    });

    // ── SCORE TEXT ──────────────────────────
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '24px',
      fill: '#ffffff',
      fontStyle: 'bold'
    });

    // ── COLLIDERS ───────────────────────────
    this.physics.add.collider(this.player, this.groundRect);
    this.physics.add.collider(this.stars, this.groundRect);

    // ── OVERLAP ─────────────────────────────
    // overlap = when player TOUCHES a star → collectStar() fires
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,  // function to call
      null,
      this               // context (important!)
    );

    // ── INPUT ───────────────────────────────
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  // ── COLLECT STAR FUNCTION ────────────────
  collectStar(player, star) {
    star.destroy(); // remove star from scene

    this.score += 10;
    this.scoreText.setText('Score: ' + this.score); // update score text
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(200);
    } else {
      this.player.body.setVelocityX(0);
    }

    if (this.cursors.space.isDown && this.player.body.blocked.down) {
      this.player.body.setVelocityY(-400);
    }
  }
}