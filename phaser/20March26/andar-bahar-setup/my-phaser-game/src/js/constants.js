// src/js/constants.js

export const SOCKETEVENTS = {
    ON_ROOM_JOINED:     "OnRoomJoined",
    ON_ROOM_JOIN_FAIL:  "OnRoomJoinFail",
    ON_EVENT_RESPONSE:  "OnEventResponse",
    ON_TOP_FLOATER_AMT: "OnTopFloaterAmt",
    ON_AUTHENTICATION:  "OnAuthentication",
};

export const EVENT_TARGET = new EventTarget();

export function logging(message, data = "", type = "log") {
    if (type === "error") {
        console.error(`[SOCKET] ${message}`, data);
    } else {
        console.log(`[SOCKET] ${message}`, data);
    }
}

export function DataEncryption(data) {
    return btoa(data);
}

export function DataDecryption(data) {
    return atob(data);
}