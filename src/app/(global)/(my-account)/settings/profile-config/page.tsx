import React, { useState } from "react";
import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import ProfileConfig from "src/components/AccountSetting/Profile/ProfileConfig";

type Props = {};

export default function Page({}: Props) {
    return (
        <>
            <SettingNavbar />
            <ProfileConfig />
        </>
    );
}
