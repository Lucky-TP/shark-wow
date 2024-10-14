import React from "react";
import MyFundingProject from "src/components/account/project/MyFundingProject";
import MyFavouriteProject from "src/components/account/project/MyFavouriteProject";

type Props = {};

export default function page({}: Props) {
    return (
        <section className="bg-[#E5D8CA] min-h-screen">
            <div className="p-8">
              
                {/* <MyFundingProject/> */}
                <MyFavouriteProject />
            </div>
        </section>
    );
}
