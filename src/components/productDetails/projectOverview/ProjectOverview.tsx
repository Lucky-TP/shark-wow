import React from 'react'
import ProjectOverviewInfo from './overview/ProjectOverviewInfo'
import ProjectStat from './overview/ProjectStat'
import InteractProject from './overview/InteractProject'

type Props = {}

export default function ProjectOverview({}: Props) {
  return (
    <section className='flex flex-col h-full w-full pl-[2vw] pr-[4vw] gap-y-[1vh] '>
        <ProjectOverviewInfo/>
        <ProjectStat/>
        <InteractProject/> 
        
    </section>
  )
}