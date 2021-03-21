import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <>
            <div className="logo">
                <img
                    src="https://jacobsmedia.com/wp-content/uploads/2016/05/rock-n-roll.jpg"
                    height="100"
                />
                <div className="header-links">
                    <div>
                        <Link to="/">My Profile</Link>
                    </div>
                    <div>
                        <a href="#">Logout</a>
                    </div>
                </div>
            </div>
        </>
    );
}
