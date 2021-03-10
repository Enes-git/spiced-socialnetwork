import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };
    }

    handleClick() {
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                if (data.success) {
                    return location.replace("/");
                }
                return this.setState({ error: true });
            })
            .catch((err) => {
                console.log("err in post login route :>> ", err);
                this.setState({ error: true });
            });
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value,
            },
            () => console.log("this.state", this.state)
        );
    }

    render() {
        return (
            <>
                <div className="login form">
                    <h2>Login Now</h2>
                    {this.state.error && (
                        <p className="error">
                            &#127928; This tone is unknow to us. Are you sure
                            you hit the right notes?! &#127928;
                        </p>
                    )}
                    <input
                        name="email"
                        placeholder="email"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <input
                        name="password"
                        placeholder="password"
                        type="password"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <button
                        className="button"
                        onClick={() => this.handleClick()}
                    >
                        ROCK ON
                    </button>
                    <p>
                        If you are not member please{" "}
                        <Link to="/register">register here.</Link>
                    </p>
                    <p>
                        If you forgot your password you can reset it
                        <Link to="/password/reset/start">here.</Link>
                    </p>
                </div>
            </>
        );
    }
}
