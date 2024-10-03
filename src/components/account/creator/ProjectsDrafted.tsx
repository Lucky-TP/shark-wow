"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import LoadingSection from 'src/components/global/LoadingSection'
import { useProjectsCreatedByCreator } from 'src/context/creatorDashboard/useProjectsCreatedByCreator'

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

export default function ProjectsDrafted() {
  const router = useRouter(); // Initialize router
  const [isLoading, setIsLoading] = useState(false);
  const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } = useProjectsCreatedByCreator();
  const handleEditProject = (projectId: string) => {
    setIsLoading(true);
    router.push(`/create-project/${projectId}/basic`); // Push to the desired route
    setIsLoading(false);
  };

  if (!payload || !payload.ProjectsCreatedByCreator || !payload.ProjectsCreatedByCreator.drafted) {
    return <LoadingSection/>; // Handle loading or undefined data
  }

  if (payload.ProjectsCreatedByCreator.drafted.length == 0) {
    return (
      <div className="w-full m-0 p-0">
        <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
        <div className="w-full flex  justify-center font-semibold text-xl">No Drafted Project </div>
      </div>
      
    );
  }

  return (
    <div className="w-full m-0 p-0">
      <div className="space-y-4">
        {payload.ProjectsCreatedByCreator.drafted.map((project) => (
          <div key={project.projectId}>
            <hr className='border-t-4 border-gray-600 w-full mb-[4vh]' />
            <div className="bg-orange-50 rounded-none shadow-none">
              <div className="p-4 flex items-center justify-between">
                <div className="flex w-ful space-x-4">
                  <img
                    src={project.previewImageUrl}
                    alt={project.name}
                    className="w-[13vw] h-[20vh] object-cover rounded" />
                  <div className='w-[20vw]'>
                    <h3 className="pb-4 font-semibold text-xl">{project.name}</h3>
                  </div>
                </div>
                <div className="space-y-2">
                  <button 
                    className="font-semibold py-2 px-9 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                    onClick={() => handleEditProject(project.projectId)}
                  >
                    Edit Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
