import { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();

    // setting the state of the component
    useEffect(function () {
        axios.get("/users/most-recent").then(({ data }) => {
            setResultUsers(data.users);
        });
    }, []);

    // making the first req when mount
    useEffect(
        function () {
            axios
                .get("/user/" + searchTerm)
                .then(({ data }) => {
                    setResultUsers(data.users);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                });
        },
        [searchTerm]
    );

    // html elements
    return (
        <>
            {resultUsers &&
                resultUsers.map(function (user) {
                    return <div key={user.id}>{user.first}</div>;
                })}
            <input
                defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            />
        </>
    );
}
