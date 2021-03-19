import axios from "./axios";
// getting all friends and requests
export async function friendsAndRequests() {
    const { friendsPlusRequests } = await axios.get("/friends+requests");
    return {
        type: "RECIEVE_FRIENDS_AND_REQUESTS",
        friendsPlusRequests,
    };
}

// friend
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
