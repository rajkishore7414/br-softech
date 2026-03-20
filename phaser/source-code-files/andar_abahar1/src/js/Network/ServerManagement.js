import { Utils } from "../Utils.js";
import { Database } from "../Network/DataBase.js";
import { SoundManagement } from "../SoundManagement.js";
import { Constant } from "../Constant.js";

class ServerManagement {
  constructor() {
    this.OnAuthData;
    this.onAuthJsonData;
    this.onAuthSuccess;
    this.onAuthReturnSet;
    this.returnSetUserName;
    this.myUserBalance;
    this.gameCurrency;
    // this.onAuthSitePn;
    this.onAuthSiteId;
    // this.groupKeyObject;
    this.playerInfoObject;
    this.joinOrCreateRoomObject;
    this.joinOrCreateRoomEncryptObject;
    this.roomJoinData;
    this.roomJoinJsonData;
    this.siteId;
    //
    this.roomJoinedFailedData;
    this.roomJoinFailledJsonData;
    this.sportsId;
    this.msg;
    this.eventResponseData;
    this.eventResponseJsonData;
    this.method;
    this.gameData;
    this.key;
  }

  async initializeConnection() {
    // this.key = Utils.getParameterByName("key");

    // if (this.key.substring(0, 4) == "demo") {
    //   this.baseURL = "https://freely.brinogames.com";
    //   // this.baseURL = "http://192.168.1.151:5001";
    // } else {
    //   this.baseURL = "https://virtual.brinogames.com/";
    //   // this.baseURL = "http://192.168.1.151:5017";
    //   // this.baseURL = "http://192.168.1.12:5001";
    // }
    //============================================================
    // this.key = Utils.getParameterByName("key");
    let urlString = window.location.href;
    let queryStringData = urlString.split("?")[1];
    // // console.log(queryStringData);
    this.baseURL = process.env.BASE_URL_VIRTUAL;
    // this.baseURL = "http://192.168.0.170:5017/";

    console.log("this.baseURL", this.baseURL);
    //============================================================
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseURL + "hubs/VirAnderBahar1Hub?" + queryStringData, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([100, 150, 200])
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on("OnConError", (data) => {
      const OnConErrorData = Utils.DataDecryption(data);
      // console.log("OnConErrorData", OnConErrorData);
      const OnConErrorJsonData = JSON.parse(OnConErrorData);
      console.log("OnConErrorJsonData===", JSON.parse(OnConErrorJsonData));

      const game = Constant.game.scene.scenes[1];
      let loading_bg = document.getElementById("loading_back");
      let loading_gif = document.getElementById("loading_img");
      loading_bg.style.display = "block";
      loading_bg.style.display = "none";

      loading_gif.style.display = "block";
      loading_gif.style.display = "none";

      game.guideLines.MakeAuthExpirePopUpEnable();
      const conData = JSON.parse(OnConErrorJsonData);

      const backURL = conData.Data.backUrl;
      setTimeout(function () {
        game.guideLines.MakeAuthExpirePopUpDisable();
        // parent.postMessage("'back'", "*");

        if (backURL == "") {
          parent.postMessage("'back'", "*");
        } else {
          window.location.href = backURL;
        }
      }, 5000);
    });

    // on Network interruption "close"
    this.connection.onclose((error) => {
      console.error(`Connection closed. Error: "${error}".`);
    });

    // When again reconnect
    this.connection.onreconnecting((error) => {
      console.error(`Connection lost due to error "${error}". Reconnecting...`);
      this.unsubscribeFromEvents();
    });

    // after reconnect
    this.connection.onreconnected(() => {
      // console.log("Reconnected to SignalR hub.");
      this.subscribeToEvents();
    });

    this.connection.on("OnGameAlert", (data) =>
      Database.HandleOnAlertData(data)
    );

    const game = Constant.game.scene.scenes[1];

    window.addEventListener("offline", () => {
      // console.log("You are offline.", game.guideLines);
      this.connection.serverTimeout();
      game.guideLines.EnableConnectionLost();
      // console.log("game.guideLines", game.guideLines);
      // let clearTIme = setTimeout(() => {
      //   parent.postMessage("'back'", "*");
      //   // console.log("You are offline in lobby");
      // }, 5000);
      setTimeout(() => {
        if (Constant.backURLL == "") {
          parent.postMessage("'back'", "*");
        }
        else {
          window.location.href = Constant.backURLL;
        }
      }, 5000);
    });

    await this.connection.start();
    // on room join
    this.connection.on("OnRoomJoined", (data) => {
      // // console.log("OnRoomJoined", data);
      this.roomJoinData = Utils.DataDecryption(data);
      // // console.log("this.roomjoinjosndata : ", this.roomJoinData);
      this.roomJoinJsonData = JSON.parse(this.roomJoinData);
      // // console.log("this.roomJoinJsonData  : ", this.roomJoinJsonData);
      this.siteId = this.roomJoinJsonData.SiteId;
      this.sportsId = this.roomJoinJsonData.SportsId;
      this.msg = this.roomJoinJsonData.Msg;
      // console.log("this.msg : ", this.msg);
    });

    //On room joined failed
    this.connection.on("OnRoomJoinFailed", (data) => {
      // // console.log("OnRoomJoinFailed", data);
      this.roomJoinedFailedData = Utils.DataDecryption(data);
      // console.log(" this.RoomJoinedFailedData : ", this.roomJoinedFailedData);
      this.roomJoinFailledJsonData = JSON.parse(this.roomJoinedFailedData);
    });
    // this.connection.on("TopFloaterAmt", (data) => {
    //   // // console.log("TopFloaterAmt", data);
    //   let topPlayerdata = Utils.DataDecryption(data);
    //   // // console.log("topPlayerdata", topPlayerdata);
    //   let topPlayerdataJsonData = JSON.parse(topPlayerdata);
    //   // // console.log("topPlayerdataJsonData - ", topPlayerdataJsonData);
    //   Database.SetTopPlayerData(topPlayerdataJsonData);
    // });

    this.connection.on("TopFloaterAmt", (data) => {
      if (Constant.IsMoving) {
        try {
          let topPlayerdata = Utils.DataDecryption(data);
          let topPlayerdataJsonData = JSON.parse(topPlayerdata);
          Database.SetTopPlayerData(topPlayerdataJsonData);
          // console.clear();
        } catch (error) {
          // console.clear();
        }
      } else {
        return;
      }
    });

    this.connection.on("EventResponse", (data) => {
      this.eventResponseData = Utils.DataDecryption(data);
      this.eventResponseJsonData = JSON.parse(this.eventResponseData);
      this.method = this.eventResponseJsonData.Method;
      // // console.log("this.method========?", this.eventResponseJsonData);

      switch (this.method) {
        case 2:
          // // console.log(
          //   "this.eventResponseJsonData : ",
          //   this.eventResponseJsonData
          // );
          Database.GetDataFromMethodTwo(this.eventResponseJsonData.Data);
          break;

        case 3:
          let loading_bg = document.getElementById("loading_back");
          let loading_gif = document.getElementById("loading_img");
          loading_bg.style.display = "block";
          loading_bg.style.display = "none";

          loading_gif.style.display = "block";
          loading_gif.style.display = "none";

          SoundManagement.PlayBgMusic();
          Database.GetDataFromMethodThree(this.eventResponseJsonData.Data);
          break;
        case 6:
          if (Constant.IsMoving) {
            Database.GetDataFromMethodSix(this.eventResponseJsonData.Data[0]);
          }
          break;
        case 10:
          if (Constant.IsMoving) {
            Database.GetMethodTenData(this.eventResponseJsonData.Data);
          }
          break;
        case 9:
          if (Constant.IsMoving) {
            Database.GetMethodNineData(this.eventResponseJsonData.Data);
          }
          break;
        case 12:
          if (Constant.IsMoving) {
            Database.GetMethodTwelveData(this.eventResponseJsonData.Data);
          }
          break;
        case 8:
          if (Constant.IsMoving) {
            Database.GetMethodEightData(this.eventResponseJsonData.Data);
          }
          break;
        case 14:
          if (Constant.IsMoving) {
            Database.GetMethodForteenData(
              this.eventResponseJsonData.Data,
              this.connection
            );
          }
          break;
        case 1:
          // Database.GetMethodOneData(
          //   this.eventResponseJsonData.Data,
          //   this.connection
          // );
          break;
        case 7:
          // // console.log("Method 7=====>");
          break;

        case 11:
          if (Constant.IsMoving) {
            Database.GetMethodElevenData(this.eventResponseJsonData.Data);
          }
          break;

        default:
          // Handle other cases if needed
          break;
      }
    });
    this.connection.on("OnTourUpdate", (data) => {
      const onTourUpdateData = Utils.DataDecryption(data);
      console.log('data is :- ', onTourUpdateData);
      const onTourUpdateJsonData = JSON.parse(onTourUpdateData);
      console.log("encrypt data is :-", onTourUpdateJsonData);
    });

    this.connection.on("OnTourData", (data) => {
      let _data = Utils.DataDecryption(data);
      const check = JSON.parse(_data);
      Database.GetTour(check.Data.tour);
    });

    return this.connection;
  }

  getSignalRConnection() {
    return this.connection;
  }

  isSignalRConnected() {
    return this.connection && this.connection.state === "Connected";
  }

  subscribeToEvents() {
    if (this.connection) {
      this.connection.off("OnConError");
      this.connection.off("OnRoomJoined");
      this.connection.off("OnRoomJoinFailed");
      this.connection.off("EventResponse");

      this.connection.on("OnConError", (data) => {
        const OnConErrorData = Utils.DataDecryption(data);
        // console.log("OnConErrorData", OnConErrorData);
        const OnConErrorJsonData = JSON.parse(OnConErrorData);
        // console.log("OnConErrorJsonData===", OnConErrorJsonData);

        const game = Constant.game.scene.scenes[1];
        let loading_bg = document.getElementById("loading_back");
        let loading_gif = document.getElementById("loading_img");
        loading_bg.style.display = "block";
        loading_bg.style.display = "none";

        loading_gif.style.display = "block";
        loading_gif.style.display = "none";

        game.guideLines.MakeAuthExpirePopUpEnable();
        const conData = JSON.parse(OnConErrorJsonData);
        const backURL = conData.Data.backUrl;
        setTimeout(function () {
          game.guideLines.MakeAuthExpirePopUpDisable();

          if (backURL == "") {
            parent.postMessage("'back'", "*");
          } else {
            window.location.href = backURL;
          }
        }, 5000);
      });

      this.connection.on("OnRoomJoined", (data) => {
        // // console.log("OnRoomJoined", data);
        this.roomJoinData = Utils.DataDecryption(data);
        // // console.log("this.roomjoinjosndata : ", this.roomJoinData);
        this.roomJoinJsonData = JSON.parse(this.roomJoinData);
        // // console.log("this.roomJoinJsonData  : ", this.roomJoinJsonData);
        this.siteId = this.roomJoinJsonData.SiteId;
        this.sportsId = this.roomJoinJsonData.SportsId;
        this.msg = this.roomJoinJsonData.Msg;
        // console.log("this.msg : ", this.msg);
      });

      //On room joined failed
      this.connection.on("OnRoomJoinFailed", (data) => {
        // // console.log("OnRoomJoinFailed", data);
        this.roomJoinedFailedData = Utils.DataDecryption(data);
        // console.log(" this.RoomJoinedFailedData : ", this.roomJoinedFailedData);
        this.roomJoinFailledJsonData = JSON.parse(this.roomJoinedFailedData);
      });

      this.connection.on("OnGameAlert", (data) =>
        Database.HandleOnAlertData(data)
      );

      this.connection.on("TopFloaterAmt", (data) => {
        // // console.log("TopFloaterAmt", data);
        let topPlayerdata = Utils.DataDecryption(data);
        // // console.log("topPlayerdata", topPlayerdata);
        let topPlayerdataJsonData = JSON.parse(topPlayerdata);
        // // console.log("topPlayerdataJsonData - ", topPlayerdataJsonData);
        if (Constant.IsMoving) {
          Database.SetTopPlayerData(topPlayerdataJsonData);
        }
      });

      this.connection.on("EventResponse", (data) => {
        this.eventResponseData = Utils.DataDecryption(data);
        this.eventResponseJsonData = JSON.parse(this.eventResponseData);
        this.method = this.eventResponseJsonData.Method;
        // // console.log("this.method========?", this.eventResponseJsonData);

        switch (this.method) {
          case 2:
            // // console.log(
            //   "this.eventResponseJsonData : ",
            //   this.eventResponseJsonData
            // );
            Database.GetDataFromMethodTwo(this.eventResponseJsonData.Data);
            break;

          case 3:
            let loading_bg = document.getElementById("loading_back");
            let loading_gif = document.getElementById("loading_img");
            loading_bg.style.display = "block";
            loading_bg.style.display = "none";

            loading_gif.style.display = "block";
            loading_gif.style.display = "none";

            SoundManagement.PlayBgMusic();
            Database.GetDataFromMethodThree(this.eventResponseJsonData.Data);
            break;
          case 6:
            if (Constant.IsMoving) {
              Database.GetDataFromMethodSix(this.eventResponseJsonData.Data[0]);
            }
            break;
          case 10:
            if (Constant.IsMoving) {
              Database.GetMethodTenData(this.eventResponseJsonData.Data);
            }
            break;
          case 9:
            if (Constant.IsMoving) {
              Database.GetMethodNineData(this.eventResponseJsonData.Data);
            }
            break;
          case 12:
            if (Constant.IsMoving) {
              Database.GetMethodTwelveData(this.eventResponseJsonData.Data);
            }
            break;
          case 8:
            if (Constant.IsMoving) {
              Database.GetMethodEightData(this.eventResponseJsonData.Data);
            }
            break;
          case 14:
            if (Constant.IsMoving) {
              Database.GetMethodForteenData(
                this.eventResponseJsonData.Data,
                this.connection
              );
            }
            break;
          case 1:
            // Database.GetMethodOneData(
            //   this.eventResponseJsonData.Data,
            //   this.connection
            // );
            break;
          case 7:
            // // console.log("Method 7=====>");
            break;

          case 11:
            if (Constant.IsMoving) {
              Database.GetMethodElevenData(this.eventResponseJsonData.Data);
            }
            break;

          default:
            // Handle other cases if needed
            break;
        }
      });

      this.connection.on("OnTourUpdate", (data) => {
        const onTourUpdateData = Utils.DataDecryption(data);
        console.log('data is :- ', onTourUpdateData);
        const onTourUpdateJsonData = JSON.parse(onTourUpdateData);
        console.log("encrypt data is :-", onTourUpdateJsonData);
      });

      this.connection.on("OnTourData", (data) => {
        let _data = Utils.DataDecryption(data);
        const check = JSON.parse(_data);
        Database.GetTour(check.Data.tour);
      });
    }
  }

  unsubscribeFromEvents() {
    if (this.connection) {
      this.connection.off("OnConError");
      this.connection.off("OnRoomJoined");
      this.connection.off("OnRoomJoinFailed");
      this.connection.off("EventResponse");
    }
  }
}

let serverManagement = new ServerManagement();
export { serverManagement as ServerManagement };
