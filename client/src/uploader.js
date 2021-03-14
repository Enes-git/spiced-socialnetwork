import axios from "axios";
import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        // console.log("props in uploader :>> ", props);
    }

    // methods
    componentDidMount() {
        console.log("uploader mounted :>> ");
    }
    updatePictureInUploader() {
        var formData = new FormData();
        formData.append("file", this.state.imageFile);
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
            [event.target.name]: event.target.value,
        });
    }

    render() {
        console.log("this.props :>> ", this.props);
        return (
            <>
                <div>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(event) => this.handleChange(event)}
                    />
                    <button
                        className="button"
                        onClick={() => this.updatePictureInUploader()}
                    >
                        ROCK UP
                    </button>
                    {/* <p onClick={() => this.methodInUploader()}>
                        Running method in uploader
                    </p> */}
                </div>
                <img
                    src="x.png" /* onClick={() => this.closeUploader()} "problematic due to parent comp not passing the fn" */
                />
            </>
        );
    }
}
