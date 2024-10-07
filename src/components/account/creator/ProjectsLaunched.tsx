"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSection from "src/components/global/LoadingSection";
import { useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";

// TypeScript Interface for the Project object (adjust fields as per your data structure)
interface Project {
  projectId: string;
  name: string;
  previewImageUrl: string;
  totalSupports: number;
  currentStage: {
    stageId: number;
    goalFunding: number;
    totalSupporter: number;
    expireDate: string; // Assume expireDate is a string (adjust if necessary)
  };
}

export default function ProjectsLaunched() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } = useProjectsCreatedByCreator();

  const handleEditProject = (projectId: string) => {
    setIsLoading(true);
    router.push(`/create-project/${projectId}/basic`);
  };

  const handleOperateProject = (projectId: string) => {
    setIsLoading(true);
    router.push(`/creator/projects/launched/operate/${projectId}/report`);
  };

  // Function to calculate remaining days until expiration
  const calculateDaysLeft = (expireDate: string): number => {
    const today = new Date();
    const expirationDate = new Date(expireDate); // Convert string to Date
    const timeDifference = expirationDate.getTime() - today.getTime(); // Get difference in milliseconds
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysLeft >= 0 ? daysLeft : 0; // Ensure it doesn't return negative days
  };

  if (!payload || !payload.ProjectsCreatedByCreator || !payload.ProjectsCreatedByCreator.launched) {
    return <LoadingSection />;
  }

  const stageLabels = {
    0: "Stage 1: Concept",
    1: "Stage 2: PROTOTYPE",
    2: "Stage 3: PRODUCTION",
    3: "Stage: UNDEFINE",
  };

  if (payload.ProjectsCreatedByCreator.launched.length == 0) {
    return (
      <div className="w-full m-0 p-0">
        <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
        <div className="w-full flex  justify-center font-semibold text-xl">No Launched Project </div>
      </div>
    );
  }

  return (
          <div className="w-full m-0 p-0">
            <div className="space-y-4">
              {payload.ProjectsCreatedByCreator.launched.map((project) => (
                <div key={project.projectId}>
                  <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
                  <div className="bg-orange-50 rounded-none shadow-none">
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex w-full items-center space-x-4">
                        <img
                          src={project.previewImageUrl}
                          alt={project.name}
                          className="w-[13vw] h-[20vh] object-cover rounded"
                        />
                        <div className="w-[20vw]">
                          <div className="pb-4 font-extrabold text-2xl truncate whitespace-nowrap">
                            {project.name}
                          </div>
                          <p className="pb-4 font-medium text-xl">
                            {stageLabels[project.currentStage.stageId]}
                          </p>
                          <div className="flex justify-between font-medium text-xl ">
                            <div className="flex-col justify-between">{project.totalSupports} Baht</div>
                            <div className="flex-col justify-between">{project.currentStage.totalSupporter} supporters</div>
                          </div>
                          <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2 mb-2">
                            <div
                              className="bg-orange-400 h-2.5 rounded-full"
                              style={{
                                width: `${
                                  project.currentStage.goalFunding > 0
                                    ? (project.currentStage.totalSupporter / project.currentStage.goalFunding) * 100
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between  text-sm text-gray-600">
                            <div>
                              {project.currentStage.goalFunding > 0
                                ? `${((project.currentStage.totalSupporter / project.currentStage.goalFunding) * 100).toFixed(2)}%`
                                : "0%"} 
                              {" "} of {project.currentStage.goalFunding.toLocaleString()} Baht
                            </div>
                            <div className="flex-col justify-between">{calculateDaysLeft(project.currentStage.expireDate)} days left</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                          onClick={() => handleEditProject(project.projectId)}
                        >
                          Edit Project
                        </button>
                        <button
                          className="font-semibold py-2 px-4 rounded-md w-full bg-orange-400 text-white hover:bg-orange-500"
                          onClick={() => handleOperateProject(project.projectId)}
                        >
                          Operate
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
