import axios from "axios";
import { Component } from "react";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            firstname: "",
            lastname: "",
            email: "",
            uploaderIsVisible: false,
            profilePicUrl: "",
        };
    }

    // methods
    componentDidMount() {
        // console.log("Still working late after component mount ha? :>> ");
        axios
            .get("/user", this.state)
            .then(({ data }) => {
                // console.log("data :>> ", data);
                const { first_name, last_name, email, profile_pic_url } = data;
                // console.log(
                //     "firsname,lastname,email :>> ",
                //     first_name,
                //     last_name,
                //     email
                // );
                // console.log("typeof first_name :>> ", typeof data.first_name);
                this.setState(
                    {
                        firstname: first_name,
                        lastname: last_name,
                        email: email,
                        profilePicUrl: profile_pic_url,
                    }
                    // () => {
                    //     console.log("this.setState :>> ", this.state);
                    // }
                );
                // console.log(     A BAD ERR HERE TO LOG WHICH COSTED HOURS!!!!
                //     "firstname,lastname,email :>> ",
                //     this.firstname,
                //     this.lastname,
                //     this.email
                // );
            })
            .catch((err) => {
                console.log("err in axios get/user :>> ", err);
                this.setState({ error: true });
            });
    }
    toggleUploader() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    updatePictureInApp(profilePicUrl) {
        // console.log("arg in updatePictureInApp :>> ", profilePicUrl);
        this.setState({ profilePicUrl: profilePicUrl });
    }

    // html
    render() {
        return (
            <>
                <div className="logo">
                    <img
                        src="https://jacobsmedia.com/wp-content/uploads/2016/05/rock-n-roll.jpg"
                        height="500"
                    />
                </div>
                <div className="profilePic component">
                    <ProfilePic
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        profilePicUrl={this.state.profilePicUrl}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </div>

                <div className="uploader component">
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updatePictureInApp={(profilePicUrl) =>
                                this.updatePictureInApp(profilePicUrl)
                            }
                            //toggleUploader={() => this.toggleUploader()} // this is problematic, breaks toggling function which makes uploader always invisible
                        />
                    )}
                </div>
            </>
        );
    }
}
