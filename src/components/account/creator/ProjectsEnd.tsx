"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";
import LoadingSection from "src/components/global/LoadingSection";

interface Project {
  id: string;
  title: string;
  image: string;
  stage: string;
  amount: number;
  currency: string;
  supporters: number;
  daysLeft: number;
  status: number;
  progress: number;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Purple Violet Light",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 10000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 2,
    progress: 100
  },
  {
    id: "2",
    title: "Skibidi Turbo",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
  {
    id: "3",
    title: "Pumpkin Cat",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
  {
    id: "4",
    title: "Toey Car",
    image: "/assets/shark.png",
    stage: "Stage 1: Concept",
    amount: 5000,
    currency: "USD",
    supporters: 6969,
    daysLeft: 43,
    status: 3,
    progress: 50
  },
];

export default function ProjectsEnd() {
  const [isLoading, setIsLoading] = useState(false);
  const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } = useProjectsCreatedByCreator();
  if (!payload || !payload.ProjectsCreatedByCreator || !payload.ProjectsCreatedByCreator.launched) {
    return <LoadingSection />;
  }

  if (!payload || !payload.ProjectsCreatedByCreator || !payload.ProjectsCreatedByCreator.failed || !payload.ProjectsCreatedByCreator.completed) {
    return <LoadingSection />;
  }

  const stageLabels = {
    0: "Stage 1: Concept",
    1: "Stage 2: PROTOTYPE",
    2: "Stage 3: PRODUCTION",
    3: "Stage: UNDEFINE",
  };

  if (payload.ProjectsCreatedByCreator.failed.length == 0 && payload.ProjectsCreatedByCreator.completed.length == 0) {
    return (
      <div className="w-full m-0 p-0">
        <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
        <div className="w-full flex  justify-center font-semibold text-xl">No Ended Project </div>
      </div>
      
    );
  }
  
  return (
    <div className="w-full m-0 p-0">
      <div className="space-y-4">

        {/* Complete */}
        {payload.ProjectsCreatedByCreator.completed && payload.ProjectsCreatedByCreator.completed.length > 0 && (
          <>
            {payload.ProjectsCreatedByCreator.completed.map((project) => (
              <div key={project.projectId}>
                <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
                <div className="bg-orange-50 rounded-none shadow-none">
                  <div className="p-4 flex justify-between">
                    <div className="flex w-full items-center space-x-4">
                      <img
                        src={project.previewImageUrl}
                        alt={project.name}
                        className="w-[13vw] h-[20vh] object-cover rounded"
                      />
                      <div className="w-[20vw]">
                        <h3 className="pb-4 font-semibold text-xl">{project.name}</h3>
                        <p className="pb-4 font-medium text-xl text-green-500">SUCCESS</p>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Failed */}
        {payload.ProjectsCreatedByCreator.failed && payload.ProjectsCreatedByCreator.failed.length > 0 && (
          <>
            {payload.ProjectsCreatedByCreator.failed.map((project) => (
              <div key={project.projectId}>
                <hr className="border-t-4 border-gray-600 w-full mb-[4vh]" />
                <div className="bg-orange-50 rounded-none shadow-none">
                  <div className="p-4 flex justify-between">
                    <div className="flex w-full items-center space-x-4">
                      <img
                        src={project.previewImageUrl}
                        alt={project.name}
                        className="w-[13vw] h-[20vh] object-cover rounded"
                      />
                      <div className="w-[20vw]">
                        <h3 className="pb-4 font-semibold text-xl">{project.name}</h3>
                        {/* {project.status == 3 && <p className="pb-4 font-medium text-xl text-red-600">Fail at {project.stage}</p>} */}
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
                        <div className="text-sm text-gray-600">
                          <div>
                            {project.currentStage.goalFunding > 0
                              ? `${((project.currentStage.totalSupporter / project.currentStage.goalFunding) * 100).toFixed(2)}%`
                              : "0%"} 
                            {" "} of {project.currentStage.goalFunding.toLocaleString()} Baht
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
