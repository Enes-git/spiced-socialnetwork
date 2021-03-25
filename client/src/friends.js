import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { friendsAndRequests, friend, unfriend } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.users &&
            state.users.filter((friend) => friend.accepted == true)
    );
    console.log("friends :>> ", friends);
    const requests = useSelector(
        (state) =>
            state.users &&
            state.users.filter((request) => request.accepted == false)
    );
    console.log("requests :>> ", requests);

    useEffect(() => {
        dispatch(friendsAndRequests());
    }, []);

    if (!friends && !requests) {
        return null;
    }

    return (
        <div id="friends-requests">
            <div className="requests-component">
                <h2>My Rocker Requests</h2>
                <div className="requests">
                    {requests.map((request) => (
                        <div key={request.id}>
                            <img src={request.prof_pic_url} id="mid-pic" />
                            <p>
                                {request.first_name} {request.last_name}
                            </p>
                            <div className="buttons">
                                <button
                                    id="friendship-button"
                                    onClick={() => dispatch(friend(request.id))}
                                >
                                    Accept Rocker
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr></hr>

            <div className="friends-component">
                <h2>My Rock Buddies</h2>
                <div className="friends">
                    {friends.map((friend) => (
                        <div key={friend.id}>
                            <img src={friend.prof_pic_url} id="mid-pic" />
                            <p>
                                {friend.first_name} {friend.last_name}
                            </p>
                            <div className="buttons">
                                <button
                                    id="friendship-button"
                                    onClick={() =>
                                        dispatch(unfriend(friend.id))
                                    }
                                >
                                    Kick Rocker
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
