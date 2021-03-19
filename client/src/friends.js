import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { friendsAndRequests, friend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsPlusRequests &&
            state.friendsPlusRequests.filter(
                (friend) => friend.accepted == true
            )
    );

    const requests = useSelector(
        (state) =>
            state.friendsPlusRequests &&
            state.friendsPlusRequests.filter(
                (request) => request.accepted == false
            )
    );

    useEffect(() => {
        dispatch(friendsAndRequests());
    }, []);

    if (!friends || !requests) {
        return null;
    }

    return (
        <div id="friends-requests">
            <div className="friends">
                <img src={friends[0].prof_pic_url} />
                <div className="buttons">
                    <button onClick={() => dispatch(unfriend(friends[0].id))}>
                        Remove Friend
                    </button>
                </div>
            </div>
            <div className="requests">
                <img src={requests[0].prof_pic_url} />
                <div className="buttons">
                    <button onClick={() => dispatch(friend(requests[0].id))}>
                        Accept Friendship Request
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
