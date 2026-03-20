// src/js/Socket.js

import {
    SOCKETEVENTS,
    EVENT_TARGET,
    logging,
    DataEncryption,
    DataDecryption
} from "./constants.js";

export default class Socket {
    constructor() {
        this.gameStatus = false;
        this.connection = null;
        this.baseURL = null;
        this.key = null;
        this.playerInfoObject = null;
        this.gameRef;
        this.loadGameCallback = null;
        this.loadingInterval = null;
        this.groupKey = "";
        this.networkEvent = new EventTarget();
    }

    async initializeConnection(loadGameCallback, clear) {

        if (this.connection) return;
        this.loadGameCallback = loadGameCallback;
        this.loadingInterval = clear;
        logging("✅ Connected your trial file with your project...")

        const urlString = window.location.href;

        const queryStringData = urlString.split("?")[1];
        if (!queryStringData) throw new Error("❌ Missing URL query string");

        const params = queryStringData.split("&");

        let gs = "";

        gs = process.env.BASE_URL_VIRTUAL;
        // gs = "http://192.168.0.170:5017";
        // gs = "http://192.168.0.177:5004";
        gs = "http://192.168.0.115:5004";

        const fullHubUrl = gs + "hubs/VirAnderBahar1Hub?" + queryStringData;

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(fullHubUrl, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                timeout: 20000,
            })
            .withAutomaticReconnect([100, 150, 200])
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.connection.onclose(this.handleConnectionClose.bind(this));
        this.connection.onreconnecting(this.handleReconnecting.bind(this));
        this.connection.onreconnected(this.handleReconnected.bind(this));

        try {
            await this.connection.start();
            logging("✅ SignalR connection started...")
            this.subscribeToEvents();
        } catch (err) {
            logging("❌ Failed to start SignalR connection:", err.message, "error");
            throw err;
        }
    }

    handleConnectionClose() {
        logging("Connection closed");
        setTimeout(() => {
            parent.postMessage("'back'", "*");
        }, 3000);
        window.parent.postMessage("close", "*");
    }

    handleReconnecting(error) {
        logging(`Connection lost due to error "${error}". Reconnecting...`)
        this.unsubscribeFromEvents();
    }

    handleReconnected() {
        logging("Reconnected to SignalR hub.")
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        logging("Connection Success...")
        this.connection.on(SOCKETEVENTS.ON_ROOM_JOINED, this.handleRoomJoined.bind(this));
        logging("room join handle success")
        this.connection.on(SOCKETEVENTS.ON_ROOM_JOIN_FAIL, this.handleRoomJoinFailed.bind(this));
        this.connection.on(SOCKETEVENTS.ON_EVENT_RESPONSE, this.handleEventResponse.bind(this));
        this.connection.on(SOCKETEVENTS.ON_TOP_FLOATER_AMT, this.handleTopFloaterAmt.bind(this));
    }

    unsubscribeFromEvents() {
        if (this.connection) {
            this.connection.off(SOCKETEVENTS.ON_AUTHENTICATION);
            this.connection.off(SOCKETEVENTS.ON_ROOM_JOINED);
            this.connection.off(SOCKETEVENTS.ON_ROOM_JOIN_FAIL);
            this.connection.off(SOCKETEVENTS.ON_EVENT_RESPONSE);
            this.connection.off(SOCKETEVENTS.ON_TOP_FLOATER_AMT);
            this.connection.off("OnEventRequest");
            this.connection.off("RowColBets");
        }
    }

    handleRoomJoined(data) {
        const roomJoinData = DataDecryption(data);
        const roomJoinJsonData = JSON.parse(roomJoinData);
        logging("Room joined successfully:", roomJoinJsonData)
    }

    handleRoomJoinFailed(data) {
        const roomJoinedFailedData = DataDecryption(data);
        const roomJoinFailledJsonData = JSON.parse(roomJoinedFailedData);
        logging("Failed to join room:", roomJoinFailledJsonData)
    }

    handleEventResponse(data) {
        const eventResponseData = DataDecryption(data);
        const eventResponseJsonData = JSON.parse(eventResponseData);
        const method = eventResponseJsonData.Method;

        switch (method) {
            case 2:
                this.gameStatus = true;
                this.groupKey = eventResponseJsonData.Data.grpKey;
                this.emitEventToGame('METHOD2', { data: eventResponseJsonData.Data });
                break;

            case 3:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD3', { data: eventResponseJsonData.Data });
                break;

            case 5:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD5', { data: eventResponseJsonData.Data });
                break;

            case 6:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD6', { data: eventResponseJsonData.Data });
                break;

            case 7:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD7', { data: eventResponseJsonData });
                break;

            case 8:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD8', { data: eventResponseJsonData.Data });
                break;

            case 9:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD9', { data: eventResponseJsonData.Data });
                break;

            case 10:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD10', { data: eventResponseJsonData });
                break;

            case 11:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD11', { data: eventResponseJsonData.Data });
                break;

            case 12:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD12', { data: eventResponseJsonData.Data });
                break;

            case 13:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD13', { data: eventResponseJsonData.Data });
                break;

            case 23:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD23', { data: eventResponseJsonData.Data });
                break;

            case 14:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD14', { data: eventResponseJsonData.Data, connection: this.connection });
                setTimeout(function () {
                    const backURL = eventResponseJsonData.Data?.backUrl;
                    if (backURL == '') {
                        console.log("parent.postMessage activated");
                        parent.postMessage("'back'", "*");
                    } else {
                        window.location.href = backURL;
                        console.log("window.location.href");
                    }
                }, 3000);
                break;

            case 15:
                if (!this.gameStatus) return;
                this.emitEventToGame('METHOD15', { data: eventResponseJsonData.Data });
                break;

            default:
                break;
        }
    }

    handleTopFloaterAmt(data) {
        const topPlayerData = DataDecryption(data);
        const topPlayerDataJson = JSON.parse(topPlayerData);
        const newEvent = new CustomEvent("TOP_FLOATER_AMOUNT", { detail: topPlayerDataJson });
        EVENT_TARGET.dispatchEvent(newEvent);
    }

    getSignalRConnection() {
        return this.connection;
    }

    isSignalRConnected() {
        return this.connection && this.connection.state === "Connected";
    }

    emitEventToGame(eventName, payload = {}) {
        logging(eventName, payload);
        const newEvent = new CustomEvent(eventName, { detail: payload });
        EVENT_TARGET.dispatchEvent(newEvent);
    }

    sendLuckyBetRequestToSignalR(_betRes) {
    }

    sendGeneralBetRequestToSignalR(_betRes) {
        const betPlaceDataObject = {
            Data: _betRes.data.list,
            Method: 10,
            grpKey: this.groupKey
        };
        const betPlaceEncryptedData = DataEncryption(JSON.stringify(betPlaceDataObject));
        this.connection.invoke("OnEventRequest", betPlaceEncryptedData);
    }

    sendDoubleBetRequestToSignalR() {
    }

    sendTourOnFinish() {
        const finishData = {
            grpKey: this.groupKey,
            Data: {
                PlayerId: GameOptions.PLAYER_INFO["PlayerId"],
            }
        }
        const finishBtnEncryptedData = DataEncryption(JSON.stringify(finishData));
        this.connection.invoke("IsTourComplete", finishBtnEncryptedData);
    }

    sendCallALert() {
        this.connection.invoke('CallAlert', DataEncryption(JSON.stringify({ "alertType": "SelfBetUpdate" })));
    }

    GetTourData() {
        const getTourData = {
            grpKey: this.groupKey,
            Data: {
                PlayerId: GameOptions.PLAYER_INFO["PlayerId"],
            }
        }
        const getTourEncryptedData = DataEncryption(JSON.stringify(getTourData));
        this.connection.invoke("GetTour", getTourEncryptedData);
    }
}

























