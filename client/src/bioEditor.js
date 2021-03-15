import { Component } from "react";
import axios from "./axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editModOn: null,
            textAreaMod: "disabled", // i could not implement this????
            buttonText: "",
            bioDraft: "",
        };
    }

    // methods
    componentDidMount() {
        if (this.props.bio) {
            // console.log("grandchild just mounted");
            // console.log("props in grandchild", this.props);
            this.setState({ buttonText: "Edit Bio" });
            this.setState({ editModOn: true });
        } else {
            this.setState({ buttonText: "Add Bio" });
            this.setState({ editModOn: false });
        }
    }
    handleChange(event) {
        this.setState({ bioDraft: event.target.value }, () =>
            console.log("bioDraft after setState :>> ", this.state.bioDraft)
        );
    }
    handleClick() {
        // console.log("this.state.bioDraft :>> ", this.state.bioDraft);
        // this.setState({ editModOn: true });
        axios
            .post("/updateBio", { bio: this.state.bioDraft })
            .then(({ data }) => {
                console.log("data :>> ", data);
                const newBio = data.rows[0];
                // console.log("newBio :>> ", bio);
                this.props.updateBioInApp(newBio);
                // this.setState({ editModOn: false });
            })
            .catch((err) => console.log("err in axios /updateBio :>> ", err));
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
                    <h5 defaultValue={this.props.bio} disabled />
                    <button
                        className="button"
                        onClick={() => this.toggleEditMod()}
                    >
                        {this.state.buttonText}
                    </button>
                </>
            );
        } else {
            return (
                <>
                    <textarea
                        defaultValue={this.props.bio}
                        onChange={(event) => this.handleChange(event)}
                        enabled="true"
                    />
                    <button
                        className="button"
                        onClick={() => this.handleClick()}
                    >
                        SAVE
                    </button>
                </>
            );
        }
        // return (
        //     <>
        //         <div className="bio edit">
        //             {!this.state.editModOn && (
        //                 <textarea
        //                     defaultValue={this.props.bio}
        //                     onChange={(event) => this.handleChange(event)}
        //                     {this.state.textAreaMod}
        //                 />
        //             )}
        //             <button
        //                 className="button"
        //                 onClick={() => this.toggleEditMod()}
        //             >
        //                 {this.state.buttonText}
        //             </button>
        //         </div>

        //         <div className="bio show">
        //             {!this.state.editModOn && (
        //                 <textarea
        //                     defaultValue={this.props.bio}
        //                     onChange={(event) => this.handleChange(event)}
        //                 />
        //             )}
        //             <button
        //                 className="button"
        //                 onClick={() => this.handleClick()}
        //             >
        //                 {this.state.buttonText}
        //             </button>
        //         </div>
        //     </>
        // );
    }
}
