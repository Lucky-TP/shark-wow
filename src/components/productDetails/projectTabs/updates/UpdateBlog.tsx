import React from 'react'

import { Update } from 'src/interfaces/models/project'

type Props = {
    data : Update ,
    
}

export default function UpdateBlog({ data }: Props) {
  // console.log(data)
  return (
    <section className='h-[150vh]'>
      <div className='flex flex-col px-[3vw] py-[3vh] rounded-xl border bg-orange-100 border-orange-200 h-full'>
        <h1>Update Topic</h1>
        <div className='flex flex-row gap-x-[1vw] '>
          <p>Posted on: {data.date.toDateString()}</p>
          <p>By: {data.belongTo}</p>
        </div>
        <div className='text-sm'>{data.detail}
          Long text Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum fugiat ipsum beatae, quis, voluptates voluptatum, dignissimos aliquid eligendi odit illum quam tempora expedita aut facilis quae sequi doloremque nam.
        </div>        
      </div>
    </section>
  )
}