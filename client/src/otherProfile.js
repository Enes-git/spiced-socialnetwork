import axios from "./axios";
import { Component } from "react";
import FriendshipButton from "./friendshipButton";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // console.log("this.props.match :>> ", this.props.match);
        axios
            .get(`/api_user/${this.props.match.params.id}`)
            .then(({ data }) => {
                const {
                    first_name,
                    last_name,
                    prof_pic_url,
                    bio,
                    requestingId,
                } = data.rows[0];

                if (requestingId == this.props.match.params.id) {
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
            .catch((err) => {
                console.log("err in axios get/api_user/:id :>> ", err);
            });
    }
    render() {
        return (
            <div>
                <div>
                    <img src={this.state.prof_pic_url} />
                </div>
                <div>
                    <h2>
                        {this.state.first_name} {this.state.last_name}
                    </h2>
                    <p>{this.state.bio}</p>

                    <FriendshipButton otherUser={this.props.match.params.id} />
                </div>
            </div>
        );
    }
}
