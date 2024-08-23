import React from 'react'
import Projecttitle from "src/components/account/updateproject/projecttitle";
import Stage from "src/components/account/updateproject/stage";
import Stageorupdate from "src/components/account/updateproject/stageorupdate";

type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Projecttitle/> 
          <Stageorupdate/>
          <Stage/>
      </div>
      </section>
  )
}