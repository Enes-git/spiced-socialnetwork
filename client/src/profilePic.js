export default function ProfilePic({
    // we can pass props or deconstruct
    firstname,
    lastname,
    prof_pic_url,
    toggleUploader,
    imgId,
}) {
    // console.log("props in prf pic :>> ", props);
    prof_pic_url = prof_pic_url || "default.png";
    return (
        <>
            <div id={imgId}>
                {/* <p>
                    {firstname} {lastname}
                </p> */}
                <img
                    src={prof_pic_url}
                    alt={firstname && lastname}
                    onClick={() => toggleUploader()}
                />
            </div>
        </>
    );
}
