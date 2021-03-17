import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FriendshipButton(props) {
    const [buttonText, setButtonText] = useState();
    // const [resultUsers, setResultUsers] = useState();
    const { requestedId } = this.props;

    const handleButtonText = (id) => {
        setButtonText({ requestedId });
    };

    // handling button based on friendship status
    useEffect(() => {
        axios.get(("/friendship-check/" + requestedId).then(({data})=>{
            const { sender_id, recipients_id, accepted } = res.data.rows[0];
            const {loggedInUser, otherUser} = res.data;
            if(!res.data.rows[0]){
                setButtonText({buttonText: "Send Friend Request"})
            } else{
                if(accepted){
                    setButtonText({buttonText: "Unfriend"})
                } else {
                    if(recipients_id == loggedInUser){
                        setButtonText({buttonText: "Cancel Friend Request"})
                    } else {
                        setButtonText({buttonText: "Accept Friend Request"})
                    }
                }
            }
        }).catch((err)=>{
            console.log('err in axios get/friendship-check :>> ', err);
        })
    );
        return (
            <>
                <button>Add Friend</button>
            </>
        );
    }
}
