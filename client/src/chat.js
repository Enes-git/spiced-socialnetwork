import { useEffect, useRef } from "react";
import { socket } from "./sockets";
import { useSelector } from "react-redux";

export default function Chat() {
    const oldMessages = useSelector((state) => state && state.oldMessages);
    // console.log("oldMessages in componenet :>> ", oldMessages);

    const handleKey = (e) => {
        if (e.key === "Enter") {
            // console.log("e.target.value :>> ", e.target.value);
            e.preventDefault();

            socket.emit("new message", e.target.value);

            e.target.value = "";
        }
    };

    const elemRef = useRef();
    // const scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // };
    useEffect(() => {
        // console.log("elemRef.current :>> ", elemRef.current);
        // console.log(
        //     "elemRef.current.clientHeight :>> ",
        //     elemRef.current.clientHeight
        // );
        // console.log(
        //     "elemRef.current.scrollHeight :>> ",
        //     elemRef.current.scrollHeight
        // );
        // console.log(
        //     "elemRef.current.scrollTop :>> ",
        //     elemRef.current.scrollTop
        // );
        // console.log(
        //     "elemRef.current.height :>> ",
        //     elemRef.current.cleintHeight
        // );
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [oldMessages]);

    return (
        <>
            <h1>Rocker Room</h1>
            <h4>You can rock the hell out here!</h4>
            <div className="chat-container" ref={elemRef}>
                {oldMessages &&
                    oldMessages.map((message) => (
                        <div key={message.id}>
                            <img
                                className="avatar"
                                src={message.prof_pic_url}
                            />
                            <span>
                                {message.first_name} {message.last_name}
                            </span>
                            <p>{message.msg_text}</p>
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
                    onKeyDown={handleKey}
                ></textarea>
            </div>
        </>
    );
}
