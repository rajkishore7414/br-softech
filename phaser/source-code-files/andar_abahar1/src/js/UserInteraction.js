/**
 * this is a utility class and can be reuse whenever needed for scrolling purpose
 * of a container
 */
import { Constant } from "./Constant.js";
// import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";

class UserInteraction {
  constructor(scene) {
    this.scene = scene;
    this.graphics = null;
    this.scrollablePanel = null;
    this.panel = null;
  }
  /**
   * settoing up mast to the container
   * @param {obj} _ScrollableObject
   */
  ApplyScrollability(_ScrollableObject) {
    this.changedViewPanelGraphics = this.scene.add.graphics();
    let xPos = 0,
      yPos = Constant.game.config.height / 1.66,
      width = Constant.game.config.width,
      height = Constant.game.config.height / 1.55;
    const slidingDeceleration = 0;
    const backDeceleration = 0;
    // this.changedViewPanelGraphics.fillStyle(0xFF0000);
    this.changedViewPanelGraphics.fillRect(xPos, yPos, width, height);
    this.changedViewPanelGraphics.setInteractive(
      new Phaser.Geom.Rectangle(xPos, yPos, width, height),
      Phaser.Geom.Rectangle.Contains
    );
    this.maskingArea = this.changedViewPanelGraphics.createGeometryMask();
    _ScrollableObject.setMask(this.maskingArea);
    this.changedViewPanelGraphics.visible = false;
  }
}
export default UserInteraction;
//############################Above code is working##############################
// // import { ScrollablePanel } from "phaser3-rex-plugins/templates/ui/ui-components.js";
// import { Constant } from "./Constant.js";
// class UserInteraction {
//   constructor(scene) {
//     this.scene = scene;
//   }
//   ApplyScrollability(_height) {
//     //=====
//     this.panel = this.scene.rexUI.add
//       .scrollablePanel({
//         x: 621,
//         y: 2150, //1910,
//         width: 1221,
//         height: 1066,
//         scrollMode: 0,
//         panel: {
//           child: this.CreatePanel(),
//         },
//         mouseWheelScroller: {
//           focus: false,
//           speed: 0.1,
//         },
//         space: {
//           left: 10,
//           right: 10,
//           top: 10,
//           bottom: 10,

//           panel: 10,
//         },
//       })
//       .setDepth(5);

//     this.panel.layout();
//   }
//   CreatePanel() {
//     let sizer = this.scene.rexUI.add
//       .sizer({
//         orientation: "y",
//       })
//       .add(
//         this.createTable() // child
//       );

//     return sizer;
//   }
//   createTable() {
//     let cont = this.scene.add.container(0, 0).setDepth(5);
//     console.log("this.scene", this.scene);
//     const sizer = this.scene.rexUI.add.sizer({
//       orientation: "y",
//       space: { item: 5 },
//     });
//     for (let i = 0; i <= 25; i++) {
//       const blueTag = this.scene.add.image(
//         0,
//         0,
//         "ander_bahar_atlas",
//         "Color-box2.png"
//       );
//       sizer.add(blueTag);
//       cont.add(blueTag);
//     }
//     this.MaskApply(cont);
//     return sizer;
//   }
//   MaskApply(_ScrollableObject) {
//     this.changedViewPanelGraphics = this.scene.add.graphics();
//     let xPos = 0,
//       yPos = Constant.game.config.height / 1.66,
//       width = Constant.game.config.width,
//       height = Constant.game.config.height / 1.55;
//     // this.changedViewPanelGraphics.fillStyle(0xFF0000);
//     this.changedViewPanelGraphics.fillRect(xPos, yPos, width, height);
//     this.changedViewPanelGraphics.setInteractive(
//       new Phaser.Geom.Rectangle(xPos, yPos, width, height),
//       Phaser.Geom.Rectangle.Contains
//     );
//     this.maskingArea = this.changedViewPanelGraphics.createGeometryMask();
//     _ScrollableObject.setMask(this.maskingArea);
//   }
// }
// export default UserInteraction;
