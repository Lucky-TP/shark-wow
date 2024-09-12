import React from "react";

type Props = {};

export default function Stageor({}: Props) {
    // เปลี่ยนชื่อเป็น UserProfile
    return (
        <div className="flex items-center justify-center  mt-10">
            <button className="bg-[#CE6843] text-black font-semibold py-10 px-40 text-center border-b-2 border-black">
                Stage
            </button>
            <button className="text-black font-semibold py-10 px-40 text-center border-b-2 border-black">
                Updates
            </button>
        </div>
    );
}
