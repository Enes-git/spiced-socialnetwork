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
            chatMessages: action.oldMessages,
        };
    }

    if (action.type === "ADD_NEW_MESSAGE") {
        state = {
            ...state,
            chatMessages: state.messages.append((msg_text) => {
                return chatMessages;
            }),
        };
    }
    // console.log("state :>> ", state);
    return state;
}
