import React from "react";
import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import ProfilePicture_BasicInformation from "src/components/AccountSetting/ProfileConfig/ProfilePic_BasicInfo";
import AboutMe from "src/components/AccountSetting/ProfileConfig/AboutMe";
import OutsideLink_ResumeCV_SaveButton from "src/components/AccountSetting/AddressSetting";

type Props = {};

export default function page({}: Props) {
    return (
        <>
            <SettingNavbar />
            <ProfilePicture_BasicInformation />
            <AboutMe />
            <OutsideLink_ResumeCV_SaveButton />
        </>
    );
}
