"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
interface Project {
    id: string
    title: string
    image: string
    stage: string
    amount: number
    currency: string
    supporters: number
    daysLeft: number
  }
  
  const projects: Project[] = [
    {
      id: "1",
      title: "Purple Violet Light",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "2",
      title: "Skibidi Turbo",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "3",
      title: "Pumpkin Cat",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    },
    {
      id: "4",
      title: "Toey Car",
      image: "/assets/shark.png",
      stage: "Stage 1: Concept",
      amount: 5000,
      currency: "USD",
      supporters: 6969,
      daysLeft: 43
    }
  ]
export default function ProjectsDrafted(){
    const router = useRouter(); // Initialize router
    const [isLoading, setIsLoading] = useState(false);

    const handleEditProject = (projectId: string) => {
        setIsLoading(true);
        router.push(`/create-project/${projectId}/basic`); // Push to the desired route
        setIsLoading(false);
    };

    return (
    <div className=" w-full m-0 p-0 ">
      <div className=" space-y-4">
        {projects.map((project) => (
          <><hr className='border-t-4 border-gray-600 w-full mb-[4vh]' />
            <div key={project.id} className="bg-orange-50  rounded-none shadow-none">
                <div className=" p-4 flex items-center justify-between">
                    <div className=" flex w-ful  space-x-4">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-[13vw] h-[20vh] object-cover rounded" />
                        <div className='w-[20vw]'>
                            <h3 className="pb-4 font-semibold text-xl">{project.title}</h3>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button 
                            className="font-semibold py-2 px-9 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                            onClick={() => handleEditProject(project.id)}
                        >
                            Edit Projects
                        </button>
                        
                    </div>
                </div>
            </div></>
        ))}
      </div>
    </div>
        
        
    )
}