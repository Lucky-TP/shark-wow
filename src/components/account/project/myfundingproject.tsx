import React from 'react';
import CarouselProductCard from "src/components/productcard/CarouselProductCard"
import Buttonseemore from "src/components/account/project/buttonseemore";
type Props = {};
export default function Myproject({}: Props) { // เปลี่ยนชื่อเป็น UserProfile
    return (
    <section>
          <div className=" bg-[#E5D8CA] flex items-start">
               <div className="w-full">
                  <h1 className="text-5xl text-black text-left mt-20 ml-40">My Funding Project</h1>
              </div>
          </div>
          <CarouselProductCard/>
          <Buttonseemore/>
     </section>
    );
  }
  