import React from "react";
import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import Interests from "src/components/AccountSetting/Interests";

type Props = {};

export default function page({}: Props) {
    return (
        <>
            <SettingNavbar />
            <Interests />
        </>
    );
}
