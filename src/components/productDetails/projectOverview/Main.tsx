import React from 'react'

import ProjectCarousel from './Carousel'
import ProjectOverview from './Overview'

type Props = {}

export default function MainProjectOverview({}: Props) {
  return (
    <section className='flex flex-row justify-between py-[5vh] h-full w-full bg-orange-50'>
        <div className='w-8/12'>
             <ProjectCarousel />
        </div>
        <div className='w-4/12'>
            <ProjectOverview/>
        </div>
    </section>
  )
}