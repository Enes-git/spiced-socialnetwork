import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({
    // we can pass props or deconstruct
    // firstname,
    // lastname,
    prof_pic_url,
    bio,
    toggleUploader,
    updateBioInApp,
}) {
    // console.log("props in prf pic :>> ", props);
    prof_pic_url = prof_pic_url || "default.png";
    return (
        <>
            <div className="profilePic component">
                <ProfilePic
                    prof_pic_url={prof_pic_url}
                    toggleUploader={() => toggleUploader()}
                    // add css !!!!!!!!!!!!!!!!!
                />
            </div>
            <div className="bioEditor component">
                <BioEditor bio={bio} updateBioInApp={() => updateBioInApp()} />
            </div>
        </>
    );
}
