import { Constant } from "../Constant";

class Home {
    constructor(scene) {
        this.scene = scene;
        this.homeBtn;

    }
    CreateHome() {
        this.homeBtn = this.scene.add.image(1150, 90, "homeBtn").setInteractive({ useHandCursor: true });
        this.goToTrans = this.scene.add.image(621, 1340, "Portrait_BG").setDepth(14).setInteractive();
        this.GoToWrapper = this.scene.add.image(621, 1240, "goToWrapperImg").setDepth(14);
        this.GoToCross = this.scene.add.image(1080, 1010, "crossHome").setDepth(14).setInteractive({ useHandCursor: true });
        this.GoToCross.on("pointerdown", () => {
            this.DisableEnable(false);
        });
        this.GoToText = this.scene.add.text(621, 1190, "Are you sure\n You want to exit the game?", {
            fontFamily: "Roboto-Medium",
            fontSize: "50px",
            color: "#fff",
            align: "center",
            wordWrap: { width: 920, useAdvancedWrap: true }
        }).setVisible(true).setOrigin(0.5).setDepth(14);
        this.GoToCancel = this.scene.add.image(421, 1385, "gotoCancel").setVisible(true).setInteractive({ useHandCursor: true }).setDepth(14);
        this.GoToButton = this.scene.add.image(821, 1385, "goToGreenOk").setVisible(true).setInteractive({ useHandCursor: true }).setDepth(14);

        this.homeBtn.on("pointerdown", () => {
            this.DisableEnable(true);
        });
        this.GoToCancel.on("pointerdown", () => {
            this.DisableEnable(false);
        });
        this.GoToButton.on("pointerdown", () => {
            if (Constant.backURLL == "") {
                parent.postMessage("'back'", "*");
            }
            else {
                window.location.href = Constant.backURLL;
            }
        });
        this.DisableEnable(false);
    }
    DisableEnable(_val) {
        this.goToTrans.setVisible(_val);
        this.GoToWrapper.setVisible(_val);
        this.GoToText.setText("Are you sure\n You want to exit the game?").setVisible(_val);
        this.GoToCancel.setVisible(_val);
        this.GoToButton.setPosition(821, 1385).setVisible(_val);
        if (!_val)
            this.GoToCross.setVisible(_val);
    }

    showConfirm(_txt) {
        this.goToTrans.setVisible(true);
        this.GoToWrapper.setVisible(true);
        this.GoToText.setText(_txt).setVisible(true);
        (Constant.pm) ? this.GoToButton.setTexture("goToYellowOk").setPosition(621, 1385).setVisible(true) : this.GoToCross.setVisible(true);

    }
    notificationPopUP(_txt) {
        this.goToTrans.setVisible(true);
        this.GoToWrapper.setVisible(true);
        this.GoToText.setText(_txt).setVisible(true);
        this.GoToCross.setVisible(true);
    }
    goToHomePopUp(_txt) {
        this.goToTrans.setVisible(true);
        this.GoToWrapper.setVisible(true);
        this.GoToText.setText(_txt).setVisible(true);
    }



}

export default Home;