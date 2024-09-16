import React from "react";
import Setting_Navbar from "src/components/account_setting/setting_navbar";
import ProfilePicture_BasicInformation from "src/components/account_setting/profile-config/profilepic_basicinfo";
import Aboutme from "src/components/account_setting/profile-config/aboutme";
import OutsideLink_ResumeCV from "src/components/account_setting/profile-config/outsideLink_resumeCV";

type Props = {};

export default function page({}: Props) {
    return (
        <>
            <Setting_Navbar />
            <ProfilePicture_BasicInformation />
            <Aboutme />
            <OutsideLink_ResumeCV />
        </>
    );
};
