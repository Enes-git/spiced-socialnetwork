import axios from "./axios";

export default function Logout() {
    axios
        .get("/logout")
        .then(() => {})
        .catch((err) => console.log("err :>> ", err));
    return;
}
