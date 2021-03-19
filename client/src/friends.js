import { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { friendsAndRequests, friend, unfriend } from "./actions";

export default function FriendshipButton() {
    const dispatch = useDispatch();
    const users = useSelector(
        (state) =>
            state.users && state.users.filter((user) => user.friend == null)
    );

    useEffect(() => {
        dispatch(friendsAndRequests());
    }, []);

    if (!users) {
        return null;
    }

    return (
        <div id="friends-requests">
            <div className="user">
                <img src={users[0].prof_pic_url} />
                <div className="buttons">
                    <button onClick={() => dispatch(friend(users[0].id))}>
                        Accept Friendship Request
                    </button>
                    <button onClick={() => dispatch(unfriend(users[0].id))}>
                        Remove Friend
                    </button>
                </div>
            </div>
            <nav>
                <Link to="/add-friend">See your friends</Link>
                <Link to="/remove-friend">See the unlucky ones</Link>
            </nav>
        </div>
    );
}
