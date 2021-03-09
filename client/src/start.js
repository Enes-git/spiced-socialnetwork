import ReactDOM from "react-dom";
import Welcome from "./welcome";

// it is React's job to read the url and based on that render the right component

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <>
            <h1>RISE AGAINST THE MACHIENE</h1>
            <img
                src="https://jacobsmedia.com/wp-content/uploads/2016/05/rock-n-roll.jpg"
                height="500"
            ></img>
        </>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
