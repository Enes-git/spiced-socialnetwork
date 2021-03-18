import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FriendshipButton({ otherUser }) {
    const [buttonText, setButtonText] = useState();
    // const [resultUsers, setResultUsers] = useState();
    // const { otherUser } = this.props;

    const handleClick = (buttonText) => {
        console.log("button clicked");
        axios
            .post("/change-friendship", { buttonText: buttonText })
            .then(({ data }) => setButtonText(handleButtonText(data)))
            .catch((err) =>
                console.log("err in exios post/change-friendship :>> ", err)
            );
    };

    const handleButtonText = (otherUser) => {
        setButtonText({ otherUser });
    };

    // handling button based on friendship status
    useEffect(() => {
        axios
            .get(`/friendship-check/${otherUser}`)
            .then((response) => {
                console.log("response :>> ", response);
                // const { sender_id, recipients_id, accepted } = data.rows;
                // const { loggedInUser, otherUser } = data;
                // console.log("!response.data.rows :>> ", !response.data.rows);
                if (response.data.rows.length == 0) {
                    console.log("setting sent req :>> ");
                    setButtonText("Send Friend Request"); // we are just expressing the text
                } else {
                    if (response.data.rows[3] == "accepted") {
                        setButtonText({ buttonText: "Unfriend" });
                    } else {
                        if (
                            response.data.rows.recipient_id ==
                            response.data.loggedInUser
                        ) {
                            // we need to check who the sender opf the req
                            setButtonText({
                                buttonText: "Cancel Friend Request",
                            });
                        } else {
                            setButtonText({
                                buttonText: "Accept Friend Request",
                            });
                        }
                    }
                }
            })
            .catch((err) => {
                console.log("err in axios get/friendship-check :>> ", err);
            });
    }, []);

    return (
        <>
            <button onClick={() => handleClick()}>{buttonText}</button>
        </>
    );
}
