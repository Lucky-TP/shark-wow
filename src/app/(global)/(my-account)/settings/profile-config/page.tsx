import React from "react";
import Contribution from "src/components/account/contribution/contribution";
//import Picture_Info_AboutMe from "../profile-config/PPpic_info_aboutme";
//import OutsideLink_ResumeCV from "../profile-config/PPlink_cv_save";

import Setting_Navbar from "src/components/account_setting/setting_navbar";
import ProfilePicture_BasicInformation from "src/components/account_setting/profile-config/profilepic_basicinfo";
import Aboutme from "src/components/account_setting/profile-config/aboutme";
import OutsideLink_ResumeCV from "src/components/account_setting/profile-config/outsideLink_resumeCV";
const Profile_config: React.FC = () => {
    return (
        <div>
            <Setting_Navbar />
            <ProfilePicture_BasicInformation />
            <Aboutme />
            <OutsideLink_ResumeCV />
        </div>
    );
};

export default Profile_config;
