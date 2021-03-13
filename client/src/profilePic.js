export default function ProfilePic({
    // we can pass props or deconstruct
    firstname,
    lastname,
    profilePicUrl,
    toggleUploader,
}) {
    // console.log("props in prf pic :>> ", props);
    profilePicUrl = profilePicUrl || "default.png";
    return (
        <>
            <div className="profile picture">
                {/* <p>
                    {firstname} {lastname}
                </p> */}
                <img
                    src={profilePicUrl}
                    alt={firstname && lastname}
                    onClick={toggleUploader}
                />
            </div>
        </>
    );
}
