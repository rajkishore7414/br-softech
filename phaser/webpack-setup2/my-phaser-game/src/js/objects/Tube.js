// import Phaser from "phaser";
// import Stack from "../structures/Stack";
// import { KEYS } from "../constants";

// export default class Tube {
//   constructor(scene, x, y, cans = []) {
//     this.scene = scene;
//     this.x = x;
//     this.y = y;
//     this.stack = new Stack();
//     this.canSprites = [];
//     this.isSelected = false;

//     // draw tube image
//     this.tubeImage = scene.add.image(x, y, KEYS.TUBE)
//       .setDisplaySize(60, 200);

//     // fill stack with cans from level data
//     cans.forEach(color => this.stack.push(color));

//     // draw cans on screen
//     this.drawCans();
//   }

//   drawCans() {
//     // remove old sprites
//     this.canSprites.forEach(s => s.destroy());
//     this.canSprites = [];

//     // draw each can bottom → top
//     this.stack.items.forEach((color, index) => {
//       const canY = this.y + 70 - index * 48;
//       const sprite = this.scene.add.image(
//         this.x,
//         canY,
//         `can-${color}`
//       ).setDisplaySize(50, 45);

//       this.canSprites.push(sprite);
//     });
//   }

//   // highlight when selected
//   highlight() {
//     this.isSelected = true;
//     this.tubeImage.setTint(0xffff00);
//   }

//   // remove highlight
//   deselect() {
//     this.isSelected = false;
//     this.tubeImage.clearTint();
//   }

//   // push can + redraw
//   addCan(color) {
//     this.stack.push(color);
//     this.drawCans();
//   }

//   // pop can + redraw
//   removeCan() {
//     const color = this.stack.pop();
//     this.drawCans();
//     return color;
//   }

//   // is tube sorted?
//   isSorted() {
//     return this.stack.isSorted();
//   }

//   // is tube empty?
//   isEmpty() {
//     return this.stack.isEmpty();
//   }

//   // is tube full?
//   isFull() {
//     return this.stack.isFull();
//   }

//   // top can color
//   topColor() {
//     return this.stack.peek();
//   }
// }



























import Phaser from "phaser";
import Stack from "../structures/Stack";
import { KEYS } from "../constants";

export default class Tube {

  constructor(scene, x, y, cans) {
    this.scene = scene;
    this.x = x; //to position the cans, we are passing the x position
    this.y = y; //same
    this.stack = new Stack();
    this.canSprites = [];
    this.isSelected = false;

    // draw tube image
    this.tubeImage = scene.add.image(x, y, KEYS.TUBE)
      .setDisplaySize(60, 200);

    // fill stack with cans from level data
    if (cans) {
      for (let i = 0; i < cans.length; i++) {
        this.stack.push(cans[i]);
      }
    }

    // draw cans on screen
    this.drawCans();
  }

  drawCans() {
    // remove old can sprites first
    for (let i = 0; i < this.canSprites.length; i++) {
      this.canSprites[i].destroy();
    }
    this.canSprites = [];

    // draw each can bottom to top
    for (let i = 0; i < this.stack.items.length; i++) {
      const color = this.stack.items[i];
      const canY = this.y + 70 - i * 48; //CANS Y - POSITION TO PLACE NEXT,

      const sprite = this.scene.add.image(
        this.x,
        canY,
        "can-" + color
      ).setDisplaySize(50, 45);

      this.canSprites.push(sprite);
    }
  }

  highlight() {
    this.isSelected = true;
    this.tubeImage.setTint(0xffff00);
  }

  deselect() {
    this.isSelected = false;
    this.tubeImage.clearTint();
  }

  addCan(color) {
    this.stack.push(color);
    this.drawCans();
  }

  removeCan() {
    const color = this.stack.pop();
    this.drawCans();
    return color;
  }

  isSorted() {
    return this.stack.isSorted();
  }

  isEmpty() {
    return this.stack.isEmpty();
  }

  isFull() {
    return this.stack.isFull();
  }

  topColor() {
    return this.stack.peek();
  }
}

