import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';

type Props = {};

export default function UserProfile({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
    <div>
      <section>
        <div className=" bg-[#E5D8CA] flex items-start">
          <div className="w-full">
            <h1 className="text-7xl  text-black text-left ml-40 mt-20">myproject</h1>
          <div className="flex items-start ml-72 space-x-10 mt-20">
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                Profile
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                Projects
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                Contribution
              </button>
              <button className="bg-[#D2825E] text-white font-semibold py-2 px-16 rounded-xl text-xl">
                Setting
              </button>
            </div>
            <hr className="border-t-4 border-black w-4/5 my-8 ml-40" />
        </div>
        </div>
   </section>
   <section>
        <div className="min-h-screen bg-[#E5D8CA] flex items-start">
             <div className="w-full">
                <h1 className="text-5xl text-black text-left mt-20 ml-40">project</h1>
            </div>
        </div>
   </section>
   </div>
  );
}