import React from "react";
import Setting_Navbar3 from "src/components/account_setting/setting_navbar3";
import Category_Interests from "src/components/account_setting/preference/category_interests";
import Other_Interests from "src/components/account_setting/preference/other_interests";
type Props = {};

export default function page({}: Props) {
    return (
        <>
            <Setting_Navbar3 />
            <Category_Interests />
            <Other_Interests />
        </>
    );
}
