import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();

        // 1st method for binding is this code here:
        // this.handleChange = this.handleChange.bind(this);
        // 2nd method is arrow fn where we invoke it.(down in the tags!)
        this.state = {
            error: false,
            delete: false,
        };
    }

    handleClick() {
        // console.log("clicked!!!");
        axios
            .post("/registration", this.state)
            .then(({ data }) => {
                if (data.success) {
                    // redirect
                    location.replace("/");
                } else {
                    // render an error message
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios POST /registration: ", err);
                this.setState({
                    error: true,
                });
            });
    }

    handleKey(e) {
        if (e.key === "Enter") {
            // console.log("e.target.value :>> ", e.target.value);
            e.preventDefault();

            this.handleClick();
        }
    }

    handleChange(event) {
        // after event obj passed & "this" is binded, this fn should not complain more!
        // console.log("change is on!");
        // console.log("event.target.value :>> ", event.target.value);
        // console.log("event.target.name :>> ", event.target.name); // we will use this to make setState dynamic
        this.setState(
            {
                [event.target.name]: event.target.value, // this does not mean array! rather a var
            }
            //takes two arg, 1 obj and a callback!
            // this callback runs after setState finishes updating state
            // because we're logging state here in the callback, this means this
            // log won't run until state has been updated, ensuring us that
            // we're seeing the most updated log
            // () => console.log("this.state after setState: ", this.state)
        );

        // console.log("this.state after setState: ", this.state); (99% this log is ok, but beware of asynchronism)
    }

    render() {
        return (
            <div className="main">
                <div className="registration form">
                    <h2>Register Now</h2>
                    {this.state.error && (
                        <p className="error">
                            &#127928; We could not catch the tone. Please do it
                            again &#127928;
                        </p>
                    )}
                    {this.state.delete && (
                        <p className="delete error">
                            &#127928; You have successfully deleted your
                            account! &#127928;
                        </p>
                    )}
                    <input
                        name="firstname"
                        placeholder="firstname"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <input
                        name="lastname"
                        placeholder="lastname"
                        onChange={(event) => this.handleChange(event)}
                    />
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
                        onKeyDown={(e) => this.handleKey(e)}
                    />
                    <button
                        className="button"
                        onClick={() => this.handleClick()}
                    >
                        ROCK IN
                    </button>
                    <p>
                        If you are already registered please{" "}
                        <Link to="/login">log in.</Link>
                    </p>
                </div>
            </div>
        );
    }
}
