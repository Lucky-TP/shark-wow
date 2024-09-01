import React from 'react'
import Project from "src/components/account/project/MyProject";
import MyFundingproject from 'src/components/account/project/MyFundingProject';
import Myfavouriteproject from 'src/components/account/project/MyFavouriteProject';

type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Project/> 
          <MyFundingproject/>
          <Myfavouriteproject/>
      </div>
      </section>
  )
}