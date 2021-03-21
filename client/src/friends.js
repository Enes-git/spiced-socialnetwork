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
    // if (!requests) {
    //     return null;
    // }

    return (
        <div id="friends-requests">
            <div className="friends">
                {friends.map((friend) => (
                    <div key={friend.id}>
                        <img src={friend.prof_pic_url} />
                        <p>
                            {friend.first_name} {friend.last_name}
                        </p>
                        <div className="buttons">
                            <button
                                onClick={() => dispatch(unfriend(friend.id))}
                            >
                                Remove Friend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <hr></hr>
            <div className="requests">
                {requests.map((request) => (
                    <div key={request.id}>
                        <img src={request.prof_pic_url} />
                        <p>
                            {request.first_name} {request.last_name}
                        </p>
                        <div className="buttons">
                            <button
                                onClick={() => dispatch(friend(request.id))}
                            >
                                Accept Friend Request
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
