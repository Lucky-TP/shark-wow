import React from "react";
import Setting_Navbar from "src/components/account_setting/setting_navbar";
import SettingAddress from "src/components/account_setting/address_setting";
type Props = {};

export default function page({}: Props) {
    return (
        <>
            <Setting_Navbar />
            <SettingAddress />
        </>
    );
}
