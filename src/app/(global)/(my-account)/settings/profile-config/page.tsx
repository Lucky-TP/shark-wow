import React from "react";
import Setting_Navbar from "src/components/account_setting/setting_navbar";
import ProfilePicture_BasicInformation from "src/components/account_setting/profile-config/profilepic_basicinfo";
import Aboutme from "src/components/account_setting/profile-config/aboutme";
import OutsideLink_ResumeCV_SaveButton from "src/components/account_setting/profile-config/outsideLink_resumeCV_saveButton";

type Props = {};

export default function page({}: Props) {
    return (
        <>
            <Setting_Navbar />
            <ProfilePicture_BasicInformation />
            <Aboutme />
            <OutsideLink_ResumeCV_SaveButton />
        </>
    );
};
