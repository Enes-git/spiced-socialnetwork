import axios from "axios";
import { Component } from "react";
// import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Profile from "./profile";
import Logo from "./logo";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherProfile";
import FindPeople from "./findPeople";
import { Link } from "react-router-dom";
import Friends from "./friends";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
            first_name: "",
            last_name: "",
            uploaderIsVisible: false,
            prof_pic_url: "",
            bio: "",
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateBioInApp = this.updateBioInApp.bind(this);
    }

    // methods ===========
    componentDidMount() {
        // console.log("Still working late after component mount ha? :>> ");
        axios
            .get("/user", this.state)
            .then(({ data }) => {
                // console.log("data :>> ", data);
                const { first_name, last_name, prof_pic_url, bio } = data;
                console.log("firsname,lastname :>> ", first_name, last_name);
                // console.log("typeof first_name :>> ", typeof data.first_name);
                this.setState(
                    {
                        first_name: first_name,
                        last_name: last_name,
                        prof_pic_url: prof_pic_url,
                        bio: bio,
                    }
                    // () => {
                    //     console.log("this.setState :>> ", this.state);
                    // }
                );
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

    // html =============
    render() {
        return (
            <BrowserRouter>
                <div id="app-component">
                    <Logo />
                    <Route path="/friendslist" component={Friends} />

                    <div className="uploader component">
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updatePictureInApp={(prof_pic_url) =>
                                    this.updatePictureInApp(prof_pic_url)
                                }
                                toggleUploader={this.toggleUploader}
                            />
                        )}
                    </div>

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="profile component">
                                <Profile
                                    first_name={this.state.first_name}
                                    last_name={this.state.last_name}
                                    prof_pic_url={this.state.prof_pic_url}
                                    bio={this.state.bio}
                                    toggleUploader={this.toggleUploader}
                                    updateBioInApp={this.updateBioInApp}
                                />
                            </div>
                        )}
                    />

                    <Route path="/user/:id" component={OtherProfile} />

                    <Route path="/users" component={FindPeople} />
                </div>
            </BrowserRouter>
        );
    }
}
