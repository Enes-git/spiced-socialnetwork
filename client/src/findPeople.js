import { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    const [searchTerm, setSearchTerm] = useState();
    const [resultUsers, setResultUsers] = useState();

    // getting & setting the initial state of the component
    useEffect(function () {
        axios
            .get("/users/most-recent")
            .then(({ data }) => {
                // console.log("data :>> ", data);
                setResultUsers(data);
                // console.log("data.rows :>> ", data.rows);
            })
            .catch((err) =>
                console.log("err in axios get/most-recent :>> ", err)
            );
    }, []);

    // making the find requests
    useEffect(
        function () {
            //if conditional if there is request
            if (searchTerm == undefined) {
                setSearchTerm(undefined);
            } else {
                axios
                    .get("/users/find?q=" + searchTerm)
                    .then(({ data }) => {
                        console.log("data :>> ", data);
                        setResultUsers(data);
                    })
                    .catch((err) => {
                        console.log("err :>> ", err);
                    });
            }
        },
        [searchTerm]
    );

    // html elements
    return (
        <>
            {resultUsers &&
                resultUsers.map(function (user) {
                    return (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.prof_pic_url} />
                                <div>
                                    {user.first_name} {user.last_name}
                                </div>
                            </Link>
                        </div>
                    );
                })}
            <input
                placeholder="Serach new rockers!"
                defaultValue={searchTerm}
                onChange={({ target }) => {
                    setSearchTerm(target.value);
                }}
            />
        </>
    );
}
