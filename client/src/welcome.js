import Registration from "./registration";
import { HashRouter, Route } from "react-router-dom";
import Login from "./login";

// fn comp can be named as presentational comp or dumb comp as well

export default function Welcome() {
    return (
        <div className="main">
            <div className="header">
                <img src="http://getwallpapers.com/wallpaper/full/6/3/2/980229-free-rock-music-wallpapers-1920x1080-for-tablet.jpg"></img>
            </div>
            <h1>Well well, who we are seeing here!</h1>
            <h4>
                &#127928; Join perhaps not the largest but the best rock
                community today! &#127928;
            </h4>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
