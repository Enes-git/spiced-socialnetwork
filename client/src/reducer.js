export default function reducer(state = {}, action) {
    //
    // ========== friendship reducers ====================
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

    // =========== messaging reducers =============
    if (action.type === "RECIEVE_OLD_MESSAGES") {
        state = {
            ...state,
            oldMessages: action.oldMessages,
        };
        console.log("state after old messages :>> ", state);
    }

    if (action.type === "ADD_NEW_MESSAGE") {
        console.log("action :>> ", action);
        state = {
            ...state,
            oldMessages: [...state.oldMessages, action.message[0]],
        };
    }
    return state;
}
