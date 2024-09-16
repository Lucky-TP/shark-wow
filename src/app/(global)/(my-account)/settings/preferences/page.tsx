import React from "react";
import Setting_Navbar from "src/components/account_setting/setting_navbar";
import Category_Interests from "src/components/account_setting/preference/category_interests";
import Other_Interests from "src/components/account_setting/preference/other_interests";
type Props = {};

export default function page({}: Props) {
    return (
        <>
            <Setting_Navbar />
            <Category_Interests />
            <Other_Interests />
        </>
    );
}
