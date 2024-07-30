import React from 'react'

import ProjectCarousel from './carousel'
import ProjectOverview from './overview'

type Props = {}

export default function MainProjectOverview({}: Props) {
  return (
    <section className='flex flex-row justify-between max-h-[70vh] min-h-[70vh] h-full w-full'>
        <div className='w-5/12'>
             <ProjectCarousel />
        </div>
        <div className='w-7/12'>
            <ProjectOverview/>
        </div>
       
    </section>
  )
}