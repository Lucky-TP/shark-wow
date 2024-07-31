import { Divider } from 'antd';
import React from 'react'
import { Stage } from 'src/interfaces/models/project'


type Props = {}

export default function MainProjectStage({}: Props) {
    const stages: Stage[] = [
        {
          stageId: 0,
          name: "Planning Phase",
          startDate: new Date('2023-01-01'),
          expireDate: new Date('2023-02-01'),
          status: 0, // Assuming "Completed" is a valid status in StageStatus
          detail: "This stage focuses on planning and initial groundwork for the project.",
          imageUrl: "https://example.com/images/planning_phase.jpg",
          currentFunding: 10000,
          goalFunding: 10000,
          totalSupporter: 200
        },
        {
          stageId: 1,
          name: "Development Phase",
          startDate: new Date('2023-03-01'),
          expireDate: new Date('2023-05-01'),
          status: 1, // Assuming "Ongoing" is a valid status in StageStatus
          detail: "This stage covers the development and implementation of the project.",
          imageUrl: "https://example.com/images/development_phase.jpg",
          currentFunding: 15000,
          goalFunding: 20000,
          totalSupporter: 500
        },
        {
          stageId: 2,
          name: "Launch Phase",
          startDate: new Date('2023-06-01'),
          expireDate: new Date('2023-07-01'),
          status: 2, // Assuming "Planned" is a valid status in StageStatus
          detail: "This stage aims to prepare the project for public launch and marketing.",
          imageUrl: "https://example.com/images/launch_phase.jpg",
          currentFunding: 0,
          goalFunding: 10000,
          totalSupporter: 0
        }
    ]
    
    console.log(stages);
    return (
        <section className='flex flex-row w-full'>
            <nav className=''>
                <ul className='flex flex-col gap-[2vh] px-[3vw] items-center justify-center h-full'>
                    {
                        stages.map((stage) => (
                            <li key={stage.stageId}>
                                <div
                                    className='flex text-center items-center justify-center w-24 h-24 bg-orange-300 rounded-full'
                                >
                                     {stage.name}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <Divider
                type="vertical"
                className="flex items-center justify-center h-[50vh]"
                style={{ borderWidth: '2px'}}
            />            
            <div>
               {
                stages.map((stage)=>{
                    return(
                        <div className='p-10 '>
                            {stage.goalFunding}
                            {stage.name}

                        </div>
                    )
                })
               }
            </div>
        </section>
    )
}