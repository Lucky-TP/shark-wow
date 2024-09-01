import React from 'react';

type Props = {};

export default function Projecttitle({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
    <div>
      <section>
        <div className=" bg-[#E5D8CA] flex items-start">
            <div className="w-full">
                <h1 className="text-7xl  text-black text-left ml-40 mt-20">Project Title</h1>
                
            </div>
        </div>
      </section>
    </div>
  );
}