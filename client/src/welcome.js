import Registration from "./registration";

// fn comp can be named as presentational comp or dumb comp as well

export default function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <Registration />
        </div>
    );
}
