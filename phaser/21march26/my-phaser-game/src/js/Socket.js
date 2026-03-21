export default class SocketConection {
  constructor() {
    this.create();
  }
  async create() {
    console.log("socket working");

    let urlString = window.location.href;
    let queryStringData = urlString.split("?")[1];
    console.log("queryStringData", queryStringData);


    this.baseURL = "http://138.2.111.156";


    // let fullUrl = this.baseURL + "/hubs/VirAnderBaharHub?" + queryStringData;
     let fullUrl = this.baseURL + "/hubs/VirAnderBahar1Hub?" + queryStringData;


    let connection = new signalR.HubConnectionBuilder()
      .withUrl(fullUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect([100, 150, 200])
      .configureLogging(signalR.LogLevel.Information)
      .build();



    try {
      await connection.start();
      console.log("Connection started");

    } catch (error) {
      console.log(error);
    }
    connection.on("OnConError", (data) => {
      console.log("On ConError", JSON.parse(this.DataDecryption(data)))
    })

    connection.on("EventResponse", (data) => {
      this.eventResponseData = this.DataDecryption(data);
      this.eventResponseJsonData = JSON.parse(this.eventResponseData);
      this.method = this.eventResponseJsonData.Method;
      console.log("this.method========?", this.eventResponseJsonData);

      //   switch (this.method) {
      //     case 2:

      //       break;

      //     case 3:
      //       let loading_bg = document.getElementById("loading_back");
      //       let loading_gif = document.getElementById("loading_img");
      //       loading_bg.style.display = "block";
      //       loading_bg.style.display = "none";

      //       loading_gif.style.display = "block";
      //       loading_gif.style.display = "none";

      //       SoundManeger.PlayBgMusic();
      //       Database.GetDataFromMethodThree(this.eventResponseJsonData.Data);
      //       break;
      //     case 6:
      //       if (Constant.IsMoving) {
      //         Database.GetDataFromMethodSix(this.eventResponseJsonData.Data[0]);
      //       }
      //       break;
      //     case 10:
      //       if (Constant.IsMoving) {
      //         Database.GetMethodTenData(this.eventResponseJsonData.Data);
      //       }
      //       break;
      //     case 9:
      //       if (Constant.IsMoving) {
      //         Database.GetMethodNineData(this.eventResponseJsonData.Data);
      //       }
      //       break;
      //     case 12:
      //       if (Constant.IsMoving) {
      //         Database.GetMethodTwelveData(this.eventResponseJsonData.Data);
      //       }
      //       break;
      //     case 8:
      //       if (Constant.IsMoving) {
      //         Database.GetMethodEightData(this.eventResponseJsonData.Data);
      //       }
      //       break;
      //     case 14:
      //       // this.connection.onclose((error) => {
      //       //   setTimeout(() => {
      //       //     console.error(`Connection closed. Error: "${error}".`);
      //       //     parent.postMessage("back", "*");
      //       //   }, 5000);
      //       // });
      //       if (Constant.IsMoving) {
      //         Database.GetMethodForteenData(
      //           this.eventResponseJsonData.Data,
      //           this.connection
      //         );
      //       }
      //       break;
      //     case 1:
      //       Database.GetMethodOneData(
      //         this.eventResponseJsonData.Data,
      //         this.connection
      //       );
      //       break;
      //     case 7:
      //       //console.log("Method 7=====>");
      //       break;

      //     case 11:
      //       if (Constant.IsMoving) {
      //         Database.GetMethodElevenData(this.eventResponseJsonData.Data);
      //       }
      //       break;

      //     default:
      //       // Handle other cases if needed
      //       break;
      //   }
    });
  }


  DataEncryption(plainData) {
    let key = CryptoJS.enc.Utf8.parse("81A3565AE4A94EBEB80467EE47083CA7");
    let iv = CryptoJS.enc.Utf8.parse("");
    let methodEncryptedData = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(plainData),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return methodEncryptedData.toString();
  }
  /**
   * Data decryption
   * @param {text} encryptedData
   * @returns
   */
  DataDecryption(encryptedData) {
    let key = CryptoJS.enc.Utf8.parse("81A3565AE4A94EBEB80467EE47083CA7");
    let iv = CryptoJS.enc.Utf8.parse("");
    let methodDecryptedData = CryptoJS.AES.decrypt(encryptedData, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return methodDecryptedData.toString(CryptoJS.enc.Utf8);
  }

} 



