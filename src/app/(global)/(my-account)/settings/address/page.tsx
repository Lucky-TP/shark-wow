import React from "react";
import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import AddressSetting from "src/components/AccountSetting/AddressSetting";

type Props = {};

export default function page({}: Props) {
    return (
        <>
            <SettingNavbar />
            <AddressSetting />
        </>
    );
}