import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModOn: false,
            textAreaMod: "disabled", // i could not implement this????
            buttonText: "",
            bioDraft: "",
        };
    }

    // methods
    componentDidMount() {
        console.log("this.props.bio :>> ", this.props.bio);
        if (this.props.bio) {
            // console.log("grandchild just mounted");
            // console.log("props in grandchild", this.props);
            this.setState({ bioDraft: this.props.bio });
            this.setState({ buttonText: "Edit Bio" });
            // this.setState({ editModOn: false });
        } else {
            this.setState({ buttonText: "Add Bio" });
            // this.setState({ editModOn: false });
        }
    }
    handleChange(event) {
        this.setState(
            { bioDraft: event.target.value }
            // () =>
            //     console.log("bioDraft after setState :>> ", this.state.bioDraft)
        );
    }
    handleClick() {
        // console.log("this.state.bioDraft :>> ", this.state.bioDraft);
        axios
            .post("/updateBio", { bio: this.state.bioDraft })
            .then(({ data }) => {
                // console.log("data :>> ", data);
                const newBio = data.rows[0].bio;
                // console.log("newBio :>> ", bio);
                this.props.updateBioInApp(newBio);
                this.setState({ editModOn: false });
            })
            .catch((err) => console.log("err in axios /updateBio :>> ", err));
    }
    handleKey(e) {
        if (e.key === "Enter") {
            // console.log("e.target.value :>> ", e.target.value);
            e.preventDefault();

            this.handleClick();
        }
    }
    deleteAccount() {
        axios
            .get("/delete_account")
            .then(() => {
                return;
            })
            .catch((err) =>
                console.log("err in axios /delete_account :>> ", err)
            );
    }
    toggleEditMod() {
        this.setState({
            editModOn: !this.state.editModOn,
            textAreaMod: "enabled",
        });
    }

    // html
    render() {
        if (this.state.editModOn == false) {
            return (
                <>
                    <h1>
                        {this.props.first_name} {this.props.last_name}
                    </h1>
                    <p>{this.props.bio}</p>
                    <div id="bio-buttons">
                        <button
                            className="button"
                            onClick={() => this.toggleEditMod()}
                        >
                            {this.state.buttonText}
                        </button>
                        <button
                            className="button"
                            onClick={() => this.deleteAccount()}
                        >
                            Delete Account
                        </button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div id="editor-container">
                        <div>
                            <textarea
                                rows="4"
                                cols="50"
                                defaultValue={this.props.bio}
                                onChange={(event) => this.handleChange(event)}
                                onKeyDown={(e) => this.handleKey(e)}
                                enabled="true"
                            />
                        </div>
                        <div>
                            <button
                                className="button"
                                onClick={() => this.handleClick()}
                            >
                                SAVE
                            </button>
                        </div>
                    </div>
                </>
            );
        }
    }
}
