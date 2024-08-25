import React from 'react'
import Project from "src/components/account/project/project";
import Myfundingproject from "src/components/account/project/myfundingproject";
import Myfavouriteproject from "src/components/account/project/myfavouriteproject";

type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Project/> 
          <Myfundingproject/>
          <Myfavouriteproject/>
      </div>
      </section>
  )
}