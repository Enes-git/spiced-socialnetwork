import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("chatMessages :>> ", chatMessages);

    return (
        <>
            <h1>Chat Room</h1>
            <div className="chat-container">
                {chatMessages.map((chatMessage) => (
                    <div key={chatMessage.id}>
                        <p>{chatMessage.msg_text}</p>
                    </div>
                ))}
            </div>
            <div className="message input">
                <textarea
                    id="new-message"
                    name="new-message"
                    rows="4"
                    cols="50"
                    placeholder="Chat with your rock buddies!"
                ></textarea>
            </div>
        </>
    );
}
