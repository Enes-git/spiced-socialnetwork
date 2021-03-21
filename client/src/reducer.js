export default function reducer(state = {}, action) {
    if (action.type === "RECIEVE_FRIENDS_AND_REQUESTS") {
        state = {
            ...state,
            users: action.friendsPlusRequests,
        };
    }
    if (action.type === "MAKE_FRIEND") {
        state = {
            ...state,
            users: state.users.map((request) => {
                if (request.id == action.id) {
                    return {
                        ...request,
                        accepted: true,
                    };
                } else {
                    return request;
                }
            }),
        };
    }
    if (action.type === "REMOVE_FRIEND") {
        state = {
            ...state,
            users: state.users.map((friend) => {
                if (friend.id == action.id) {
                    return {
                        ...friend,
                        accepted: false,
                    };
                } else {
                    return friend;
                }
            }),
        };
    }
    console.log("state :>> ", state);
    return state;
}
