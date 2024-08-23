import React from 'react'
import Contribution from "src/components/account/contribution/contribution";
type Props = {}

export default function page({}: Props) {
  return (
    <section className="bg-[#E5D8CA]">
      <div className='p-8'>
          <Contribution/> 
          
      </div>
      </section>
  )
}