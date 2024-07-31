import React from 'react'
import ProjectOverviewInfo from './overview/info'
import ProjectStat from './overview/projectStat'
import InteractProject from './overview/interactProject'

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