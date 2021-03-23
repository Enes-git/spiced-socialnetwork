import axios from "./axios";
// getting all friends and requests
export async function friendsAndRequests() {
    const { data } = await axios.get("/friends-requests");
    console.log("rows in actions.js :>> ", data.rows);
    return {
        type: "RECIEVE_FRIENDS_AND_REQUESTS",
        friendsPlusRequests: data.rows,
    };
}

// make friend
export async function friend(id) {
    await axios.post(`/add-friend/${id}`);
    return {
        type: "MAKE_FRIEND",
        id,
    };
}

// unfriend
export async function unfriend(id) {
    await axios.post(`/remove-friend/${id}`);
    return {
        type: "REMOVE_FRIEND",
        id,
    };
}

// get old chat messages
export async function oldMessages(messages) {
    // console.log("old messages in actions :>> ", messages);
    return {
        type: "RECIEVE_OLD_MESSAGES",
        oldMessages: messages,
    };
}

// add new chat message
export async function newMessage(message) {
    // console.log("message in action :>> ", message);
    return {
        type: "ADD_NEW_MESSAGE",
        message,
    };
}
