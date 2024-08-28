import React from 'react'
import Projecttitle from "src/components/account/updateproject/projecttitle";
import Stage from "src/components/account/updateproject/stage";
import Stageor from "src/components/account/updateproject/stageor";

type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Projecttitle/> 
          <Stageor/>
          <Stage/>
      </div>
      </section>
  )
}