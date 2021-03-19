import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FriendshipButton({ otherUser }) {
    const [buttonText, setButtonText] = useState();

    const handleClick = () => {
        console.log("button clicked");
        console.log("buttonText :>> ", buttonText);
        axios
            .post(`/change-friendship/${otherUser}`, { buttonText: buttonText })
            .then((response) => {
                // console.log("data post axios :>> ", data);
                // console.log("response :>> ", response);
                setButtonText(response.data.buttonText);
            })
            .catch((err) =>
                console.log("err in exios post/change-friendship :>> ", err)
            );
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
                    if (response.data.rows[0].accepted) {
                        setButtonText("Unfriend");
                    } else {
                        if (
                            response.data.rows[0].sender_id ==
                            response.data.loggedInUser
                        ) {
                            // we need to check who the sender opf the req
                            setButtonText("Cancel Friend Request");
                        } else {
                            setButtonText("Accept Friend Request");
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
