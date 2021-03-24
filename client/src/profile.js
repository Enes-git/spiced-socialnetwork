import ProfilePic from "./profilePic";
import BioEditor from "./bioEditor";

export default function Profile({
    // we can pass props or deconstruct
    first_name,
    last_name,
    prof_pic_url,
    bio,
    toggleUploader,
    updateBioInApp,
}) {
    // console.log(
    //     "props in prf pic :>> ",
    //     first_name,
    //     last_name,
    //     prof_pic_url,
    //     bio
    // );
    prof_pic_url = prof_pic_url || "default.png";
    return (
        <>
            <div className="profilePic component">
                <ProfilePic
                    prof_pic_url={prof_pic_url}
                    first_name={first_name}
                    last_name={last_name}
                    toggleUploader={() => toggleUploader()}
                    classBig="big-pic"
                />
            </div>
            <div className="bioEditor component">
                <BioEditor
                    first_name={first_name}
                    last_name={last_name}
                    bio={bio}
                    updateBioInApp={updateBioInApp}
                />
            </div>
        </>
    );
}
