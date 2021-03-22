import axios from "./axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // console.log("props in uploader :>> ", props);
        // this.file = null;
    }

    // methods
    componentDidMount() {
        console.log("uploader mounted :>> ");
    }
    updatePictureInUploader() {
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("formData :>> ", formData);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                console.log("data in axios  image post :>> ", data);
                this.props.updatePictureInApp(data.profilePicUrl);
            })
            .catch((err) => {
                console.log("err in axios post/upload :>> ", err);
            });
    }
    closeUploader() {
        this.props.toggleUploader();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.files[0],
        });
        // this.file = event.target.files[0];
    }

    render() {
        // console.log("this.props :>> ", this.props);
        return (
            <div className="uploader">
                <div id="upload-input">
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <img
                        id="the-x"
                        src="x.png"
                        onClick={() => this.closeUploader()}
                    />
                </div>
                <button
                    className="button"
                    onClick={() => this.updatePictureInUploader()}
                >
                    Rock Up
                </button>
            </div>
        );
    }
}
