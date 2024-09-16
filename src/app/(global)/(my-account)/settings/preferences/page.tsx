import React from "react";
import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import CategoryInterests from "src/components/AccountSetting/Preferences/CategoryInterests";
import OtherInterests from "src/components/AccountSetting/Preferences/OtherInterests";
type Props = {};

export default function page({}: Props) {
    return (
        <>
            <SettingNavbar />
            <CategoryInterests />
            <OtherInterests />
        </>
    );
}
