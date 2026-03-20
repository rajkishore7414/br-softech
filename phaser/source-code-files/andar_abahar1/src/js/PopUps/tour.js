import { BetPlace } from "../BetPlace";
import { Constant } from "../Constant";

class tour {
    constructor(scene) {
        this.scene = scene;
        this.tourFlag = false;
        this.tourOnceFlag = false;
    }
    tour(data) {
        let flag = false;
        const textStyle = {
            fontFamily: "Roboto-Bold",
            fontSize: "35px",
            fill: "#ffffff",
            fontStyle: "bold",
            align: "center",
        };
        let counter = 1;
        let pos = [null, null, 380, 621, 645, 621, 1120, 1080, 1080, 1080];
        let arr = [];

        let mainCon = this.scene.add.container().setDepth(21);
        this.popConatiner = this.scene.add.container().setDepth(21);

        let bgImg = this.scene.add.image(621, 1340, "Portrait_BG").setInteractive().setDepth(20);
        let popBgImg = this.scene.add.image(621, 1340, "ander_bahar_atlas", "popup-box.png");
        let nextBtn = this.scene.add.image(1025, 1280, "nextBtn").setInteractive({ useHandCursor: true });
        let nextBtnTxt = this.scene.add.text(1025, 1280, data.next, {
            fontFamily: data.fontFamily,
            fontSize: parseInt(data.fontSize),
            color: "#ffffff",
            align: data.align,
        }).setOrigin(0.5);

        let popUpContent = this.scene.add.text(95, 1345, data.step1, {
            fontFamily: data.fontFamily,
            fontSize: parseInt(data.fontSize),
            color: data.color,
            align: data.align,
            fontStyle: "bold",
            wordWrap: { width: 1050, useAdvancedWrap: true }
        });

        if (data.align === "right") {
            popUpContent.setOrigin(1, 0);
            popUpContent.setX(1120);
        }

        let skipBtn = this.scene.add.text(95, 1280, data.skip, {
            fontFamily: data.fontFamily,
            fontSize: parseInt(data.fontSize),
            color: data.color,
            align: data.align,
        }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true });

        let backBtn = this.scene.add.text(905, 1280, data.back, {
            fontFamily: data.fontFamily,
            fontSize: parseInt(data.fontSize),
            color: data.color,
            align: data.align,
        }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true }).setVisible(false);
        console.log("width check", nextBtn.width, nextBtnTxt.width);
        if (nextBtn.width - nextBtnTxt.width < 25) {
            flag = true;
            console.log("comes here");
            nextBtn.setScale(1.3, 1);
            nextBtnTxt.x = nextBtn.x;
            backBtn.x -= 30;
        }
        let arrow = this.scene.add.image(621, 1500, "ander_bahar_atlas", "popup-box-arrow.png").setDepth(20).setVisible(false);
        arr[0] = null;
        arr[1] = null;
        arr[2] = this.scene.add.image(770, 1220, "ander_bahar_atlas", "Coin.png").setDepth(20).setVisible(false);
        arr[3] = this.scene.add.image(621, 1970, "ander_bahar_atlas", "market-icon.png").setDepth(20).setVisible(false);
        arr[4] = this.scene.add.image(621, 170, "ander_bahar_atlas", "chage_view_bttn.png").setDepth(20).setVisible(false);
        arr[5] = this.scene.add.image(621, 275, "ander_bahar_atlas", "History-box.png").setDepth(20).setVisible(false);
        arr[6] = this.scene.add.image(1170, 1220, "ander_bahar_atlas", "menu.png").setDepth(20).setVisible(false);
        arr[7] = this.scene.add.image(1130, 1495, "ander_bahar_atlas", "off.png").setDepth(20).setVisible(false);
        arr[8] = this.scene.add.image(1130, 1330, "ander_bahar_atlas", "info.png").setDepth(20).setVisible(false);
        arr[9] = this.scene.add.image(1130, 1655, "ander_bahar_atlas", "Play.png").setDepth(20).setVisible(false);

        this.menutext = this.scene.add.text(Constant.game.config.width / 1.1, 1390, "Game rules", textStyle)
            .setOrigin(0.5, 0.5).setVisible(false);


        this.popConatiner.add([popBgImg, nextBtn, nextBtnTxt, popUpContent, skipBtn, backBtn, arrow, this.menutext]);
        mainCon.add([bgImg, this.popConatiner, ...arr.slice(2)]);
        // mainCon.setVisible(false);
        // console.log("arr is ", arr);


        nextBtn.on("pointerdown", () => {
            if (counter == 9) {
                console.log("finish");
                if (this.tourOnceFlag)
                    BetPlace.tourFinishSentData();
                // this.scene.Menu.menuContainer.setAlpha(0);
                this.scene.menuPopUp.DisableMenuPopUp();
                mainCon.setVisible(false);
                this.popConatiner.destroy();
                mainCon.destroy();
                this.menutext.setVisible(false);
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] != null) {
                        arr[i].destroy();
                    }
                }
                arr.length = 0;
                mainCon = null;
                this.popConatiner = null;

                return;
            }

            if (arr[counter] != null) {
                arr[counter].setVisible(false);
            }
            counter++;
            this.menutext.setVisible(false);
            if (arr[counter] != null) {
                arr[counter].setVisible(true);
                arrow.x = pos[counter];
            }
            let topX = 0, topY;

            if (counter == 4 || counter == 5) {
                if (counter == 4) {
                    arrow.y = 1500 - 325;
                    arrow.flipY = true;
                }
                topY = arr[counter].y + arr[counter].displayHeight / 2;
                topY -= 1150;
            }
            else {
                if (counter >= 6) {
                    topX = 58;
                    arrow.y = 1500;
                    arrow.flipY = false;
                }
                topY = arr[counter].y - arr[counter].displayHeight / 2;
                topY -= 1520;
            }

            this.popConatiner.setPosition(topX, topY);
            popUpContent.setText(data["step" + counter].replace(/\/n/g, "\n"));
            if (counter == 2) {
                backBtn.setVisible(true);
                arrow.setVisible(true);
            }
            if (counter == 7) {
                this.menutext.setVisible(true);
                this.menutext.setText("Sound")
                this.menutext.setY(1620)
                this.menutext.setX(1065)
                this.scene.menuPopUp.EnableMenuPopUp();
            }
            if (counter == 8) {
                this.menutext.setY(1635)
                this.menutext.setText("Game rules")
                this.menutext.setX(1070)
                this.menutext.setVisible(true);
            }
            if (counter == 9) {
                this.menutext.setY(1655)
                this.menutext.setText("Play \n Instructions")
                this.menutext.setX(1078)
                this.menutext.setVisible(true);
                nextBtn.setScale(1.3, 1);
                nextBtnTxt.setText(data.finish);
                nextBtnTxt.x = nextBtn.x;
                backBtn.x -= 30;
                skipBtn.setVisible(false);
            }
        });

        backBtn.on("pointerdown", () => {
            let topX = 0, topY;
            if (arr[counter] != null) {
                arr[counter].setVisible(false);
            }
            counter--;
            if (counter == 8) {
                topX = 58;
                nextBtn.setScale(1, 1);
                nextBtnTxt.setText(data.next);
                nextBtnTxt.x = nextBtn.x;
                backBtn.x += 30;
                skipBtn.setVisible(true);
                console.log("finish");
            }
            if (arr[counter] != null) {
                arr[counter].setVisible(true);
                arrow.x = pos[counter];
            }
            console.log("where ", counter);
            if (arr[counter] != null) {
                if (counter == 5 || counter == 4 || counter <= 3) {

                    if (counter <= 3) {
                        console.log("comes");
                        arrow.y = 1500;
                        arrow.flipY = false;
                        topY = arr[counter].y - arr[counter].displayHeight / 2;
                        topY -= 1520;
                    }
                    if (counter == 5 || counter == 4) {
                        arrow.y = 1500 - 325;
                        arrow.flipY = true;
                        topY = arr[counter].y + arr[counter].displayHeight / 2;
                        topY -= 1150;
                    }
                }
                else {
                    if (counter >= 6) {
                        topX = 58;
                        arrow.y = 1500;
                        arrow.flipY = false;
                    }
                    topY = arr[counter].y - arr[counter].displayHeight / 2;
                    topY -= 1520;
                }
            }
            else {
                topY = 0;
            }
            console.log("value ", topX, topY, counter);
            this.popConatiner.setPosition(topX, topY);
            popUpContent.setText(data["step" + counter].replace(/\/n/g, "\n"));
            if (counter == 1) {
                backBtn.setVisible(false);
                arrow.setVisible(false);
                this.popConatiner.setPosition(0, 0);
            }
            if (counter == 6) {
                // menuButton1Function();
                this.scene.menuPopUp.DisableMenuPopUp();

            }

            if (counter == 7) {
                this.menutext.setVisible(true);
                this.menutext.setText("Sound")
                this.menutext.setY(1620)
                this.menutext.setX(1065)
            }
            if (counter == 9) {
                this.menutext.setY(1655)
                this.menutext.setText("Play \n Instructions")
                this.menutext.setX(1078)
                this.menutext.setVisible(true);
            }
            if (counter == 8) {
                this.menutext.setY(1635)
                this.menutext.setText("Game rules")
                this.menutext.setX(1070)
                this.menutext.setVisible(true);
            }
        });
        skipBtn.on("pointerdown", () => {
            mainCon.setVisible(false);
            counter = 1;
            // this.scene.Menu.menuContainer.setAlpha(0).setDepth(3);
            this.scene.menuPopUp.DisableMenuPopUp();

            this.popConatiner.destroy();
            mainCon.destroy();
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] != null) {
                    arr[i].destroy();
                }
            }
            arr.length = 0;
            mainCon = null;
            this.popConatiner = null;

            return;
        });

    }
}
export default tour;

