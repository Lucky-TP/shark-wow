import React from 'react';

type Props = {};

export default function Projecttitle({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
    <div className="flex items-center border-b-2 border-black">
        <div className="bg-[#CE6843] text-black font-semibold py-4 px-8">
            Stage
        </div>
        <div className="ml-8 text-black font-semibold">
            Updates
        </div>
    </div>

  );
}