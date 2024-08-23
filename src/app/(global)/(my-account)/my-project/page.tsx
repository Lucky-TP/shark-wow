import React from 'react'
import Project from "src/components/account/project/project";
import CarouselProductCard from "src/components/productcard/CarouselProductCard"
import Myfundingproject from "src/components/account/project/myfundingproject";
import Myfavouriteproject from "src/components/account/project/myfavouriteproject";
import Buttonseemore from "src/components/account/project/buttonseemore";
type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Project/> 
          <CarouselProductCard/>
          <Buttonseemore/>
          <Myfundingproject/>
          <CarouselProductCard/>
          <Buttonseemore/>
          <Myfavouriteproject/>
          <CarouselProductCard/>
          <Buttonseemore/>
      </div>
      </section>
  )
}