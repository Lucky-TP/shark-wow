import React from 'react'

import ProjectOverviewInfo from './overview/ProjectOverviewInfo'
import ProjectStat from './overview/ProjectStat'
import InteractProject from './overview/InteractProject'

import { ProjectDetialResponse } from 'src/interfaces/datas/projectDetailStatus'

import { Stage } from 'src/interfaces/models/project'

export default function ProjectOverview({
    isLoading,
    projectData
  }: Partial<ProjectDetialResponse>
){
  return (
    <section className='flex flex-col h-full w-full pl-[2vw] pr-[4vw] gap-y-[1vh] '>
        <ProjectOverviewInfo
          isLoading={isLoading}
          uid={projectData?.uid}
          stageId={projectData?.status}
          name={projectData?.name}
          description={projectData?.description}
        />
        <ProjectStat
          isLoading={isLoading}
          // currentFunding={projectData?.currentFunding as number}  
          currentFunding={0}
          totalSupporter={projectData?.totalSupporter as number}
          stages={projectData?.stages as Stage[]}
        />
        <InteractProject/> 
    </section>
  )
}