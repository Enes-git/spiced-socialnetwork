import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            error: false,
        };
    }
    // methods
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleClick() {
        const { step } = this.state;
        if (step === 1) {
            axios
                .post("/password_reset/start", this.state)
                .then(({ data }) => {
                    if (data.success) {
                        return this.setState({ step: 2 });
                    }
                    return this.setState({ error: true });
                })
                .catch((err) => {
                    console.log("err in axios post/reset route :>> ", err);
                    this.setState({ error: true });
                });
        } else if (step === 2) {
            axios
                .post("/password_reset/verify", this.state)
                .then(({ data }) => {
                    console.log("data :>> ", data);
                    if (data.success) {
                        return this.setState({ step: 3 });
                    }
                    return this.setState({ error: true });
                })
                .catch((err) => {
                    console.log("err in axios post/verify route :>> ", err);
                });
        }
    }

    render() {
        const { step } = this.state;
        return (
            <div className="password reset">
                {step == 1 && (
                    <div className="reset form">
                        <h3>
                            Please write your registered email adress below.
                        </h3>
                        <input
                            name="email"
                            placeholder="email"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <button
                            className="button"
                            onClick={() => this.handleClick()}
                        >
                            ROCK ON
                        </button>
                    </div>
                )}
                {step == 2 && (
                    <div className="reset form">
                        <h3>
                            Please write the code you recieved and your new
                            password below.
                        </h3>
                        <input
                            name="code"
                            placeholder="reset code"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <input
                            name="password"
                            placeholder="new password"
                            onChange={(event) => this.handleChange(event)}
                        />
                        <button
                            className="button"
                            onClick={() => this.handleClick()}
                        >
                            ROCK ON
                        </button>
                    </div>
                )}
                {step == 3 && (
                    <div className="reset form">
                        <h3>Your info is changed! &#127928;</h3>
                        <p>
                            Click to
                            <Link to="/login"> log in.</Link>
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
