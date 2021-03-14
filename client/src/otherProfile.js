import axios from "./axios";
import { Component } from "react";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        console.log("this.props.match :>> ", this.props.match);
        console.log(
            "this.props.match.params.id :>> ",
            this.props.match.params.id
        );

        const requestedId = this.props.match.params.id;
        axios
            .get("/user/" + requestedId, {
                requestedId: this.props.match.params.id,
            })
            .then(({ data }) => {
                const {
                    first_name,
                    last_name,
                    prof_pic_url,
                    bio,
                    requestingId,
                } = data.rows[0];

                if (requestingId == requestedId) {
                    return this.props.history.push("/");
                } else {
                    this.setState({
                        first_name: first_name,
                        last_name: last_name,
                        prof_pic_url: prof_pic_url,
                        bio: bio,
                    });
                }
            })
            .catch();
    }
    render() {
        return (
            <div>
                <div>
                    <img src={this.state.prof_pic_url} />
                </div>
                <div>
                    <h2>
                        {this.state.first_name} {this.state.first_name}
                    </h2>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
