export default function reducer(state = {}, action) {
    if (action.type === "RECIEVE_FRIENDS__AND_REQUESTS") {
        state = {
            ...state,
            users: action.users,
        };
    }
    if (action.type === "MAKE_FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        friend: action.type == "MAKE_FRIEND",
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type === "REMOVE_FRIEND") {
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        friend: action.type == "REMOVE_FRIEND",
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    console.log("state :>> ", state);
    return state;
}
