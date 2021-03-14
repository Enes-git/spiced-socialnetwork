import axios from "axios";
import { Component } from "react";
// import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import Logo from "./logo";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            firstname: "",
            lastname: "",
            uploaderIsVisible: false,
            prof_pic_url: "",
            bio: "",
        };
    }

    // methods
    componentDidMount() {
        // console.log("Still working late after component mount ha? :>> ");
        axios
            .get("/user", this.state)
            .then(({ data }) => {
                // console.log("data :>> ", data);
                const { first_name, last_name, prof_pic_url, bio } = data;
                // console.log(
                //     "firsname,lastname :>> ",
                //     first_name,
                //     last_name,
                // );
                // console.log("typeof first_name :>> ", typeof data.first_name);
                this.setState(
                    {
                        firstname: first_name,
                        lastname: last_name,
                        prof_pic_url: prof_pic_url,
                        bio: bio,
                    }
                    // () => {
                    //     console.log("this.setState :>> ", this.state);
                    // }
                );
                // console.log(     A BAD ERR HERE TO LOG WHICH COSTED HOURS!!!!
                //     "firstname,lastname :>> ",
                //     this.firstname,
                //     this.lastname,
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
    updatePictureInApp(prof_pic_url) {
        // console.log("arg in updatePictureInApp :>> ", prof_pic_url);
        this.setState({ prof_pic_url: prof_pic_url });
    }
    updateBioInApp(bioDraft) {
        this.setState({ bio: bioDraft });
    }

    // html
    render() {
        return (
            <div id="app-component">
                <Logo />
                {/* <div className="logo">
                    <img
                        src="https://jacobsmedia.com/wp-content/uploads/2016/05/rock-n-roll.jpg"
                        height="500"
                    />
                </div> */}
                {/* <div className="profilePic component">
                    <ProfilePic
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        prof_pic_url={this.state.prof_pic_url}
                        toggleUploader={() => this.toggleUploader()}
                    />
                </div> */}

                <div className="uploader component">
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updatePictureInApp={(prof_pic_url) =>
                                this.updatePictureInApp(prof_pic_url)
                            }
                            //toggleUploader={() => this.toggleUploader()} // this is problematic, breaks toggling function which makes uploader always invisible
                        />
                    )}
                </div>

                <div className="profile component">
                    <Profile
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        prof_pic_url={this.state.prof_pic_url}
                        bio={this.state.bio}
                        toggleUploader={() => this.toggleUploader()}
                        updateBioInApp={() => this.updateBioInApp()}
                    />
                </div>
            </div>
        );
    }
}
