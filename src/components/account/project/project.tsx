import React from 'react';
import CarouselProductCard from "src/components/productcard/CarouselProductCard"
import Buttonseemore from "src/components/account/project/buttonseemore";

type Props = {};

export default function Myproject({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
  return (
      <section>
        <div className=" bg-[#E5D8CA] flex items-start">
          <div className="w-full">
            <h1 className="text-7xl  text-black text-left ml-40 mt-20">Kuaychai</h1>
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
        <div className=" bg-[#E5D8CA] flex items-start">
             <div className="w-full">
                <h1 className="text-5xl text-black text-left mt-20 ml-40">project</h1>
            </div>
        </div>
        <CarouselProductCard/>
        <Buttonseemore/>
   </section>
   
   
   

  );
}
