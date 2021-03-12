import axios from "axios";
import { Component } from "react";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            firstname: "",
            lastname: "",
            email: "",
        };
    }

    // methods
    componentDidMount() {
        console.log("Still working late ha? :>> ");
        axios
            .get("/user", this.state)
            .then(({ data }) => {
                console.log("data :>> ", data);
                const { first_name, last_name, email } = data;
                this.setState({
                    firstname: first_name,
                    lastname: last_name,
                    email: email,
                });
                console.log(
                    "firstname,lastname,email :>> ",
                    this.firstname,
                    this.lastname,
                    this.email
                );
            })
            .catch((err) => {
                console.log("err in axios get/user :>> ", err);
                this.setState({ error: true });
            });
    }

    // html
    render() {
        return (
            <>
                <div>Hi</div>
            </>
        );
    }
}
