import { oldMessages, newMessage } from "./actions";
import { io } from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("lastMessage", (message) => {
            console.log("message in socket.js :>> ", message);
            store.dispatch(newMessage(message));
        });

        socket.on("oldMessages", (messages) => {
            store.dispatch(oldMessages(messages));
            // console.log("msg in socket.js :>> ", messages);
        });
    }
};
