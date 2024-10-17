"use client";
import { useState } from "react";
import { useProjectsCreatedByCreator } from "src/context/creatorDashboard/useProjectsCreatedByCreator";
import LoadingSection from "src/components/global/LoadingSection";

export default function ProjectsEnd() {
    const [isLoading, setIsLoading] = useState(false);
    const { payload, OnGettingProjectCreatedByCreator, OnChangeProjectStageType } =
        useProjectsCreatedByCreator();
    if (
        !payload ||
        !payload.ProjectsCreatedByCreator ||
        !payload.ProjectsCreatedByCreator.launched
    ) {
        return <LoadingSection />;
    }

    if (
        !payload ||
        !payload.ProjectsCreatedByCreator ||
        !payload.ProjectsCreatedByCreator.failed ||
        !payload.ProjectsCreatedByCreator.completed
    ) {
        return <LoadingSection />;
    }

    const stageLabels = {
        0: "Stage 1: Concept",
        1: "Stage 2: PROTOTYPE",
        2: "Stage 3: PRODUCTION",
        3: "Stage: UNDEFINE",
    };

    if (
        payload.ProjectsCreatedByCreator.failed.length == 0 &&
        payload.ProjectsCreatedByCreator.completed.length == 0
    ) {
        return (
            <div className="m-0 w-full p-0">
                <hr className="mb-[4vh] w-full border-t-4 border-gray-600" />
                <div className="flex w-full justify-center text-xl font-semibold">
                    No Ended Project{" "}
                </div>
            </div>
        );
    }

    return (
        <div className="m-0 w-full p-0">
            <div className="space-y-4">
                {/* Complete */}
                {payload.ProjectsCreatedByCreator.completed &&
                    payload.ProjectsCreatedByCreator.completed.length > 0 && (
                        <>
                            {payload.ProjectsCreatedByCreator.completed.map((project) => (
                                <div key={project.projectId}>
                                    <hr className="mb-[4vh] w-full border-t-4 border-gray-600" />
                                    <div className="rounded-none bg-orange-50 shadow-none">
                                        <div className="flex justify-between p-4">
                                            <div className="flex w-full items-center space-x-4">
                                                <img
                                                    src={project.previewImageUrl}
                                                    alt={project.name}
                                                    className="h-[20vh] w-[13vw] rounded object-cover"
                                                />
                                                <div className="w-[20vw]">
                                                    <h3 className="pb-4 text-xl font-semibold">
                                                        {project.name}
                                                    </h3>
                                                    <p className="pb-4 text-xl font-medium text-green-500">
                                                        SUCCESS
                                                    </p>
                                                    <div className="flex justify-between text-xl font-medium">
                                                        <div className="flex-col justify-between">
                                                            {project.totalFunding} Baht
                                                        </div>
                                                        <div className="flex-col justify-between">
                                                            {project.totalSupports} supporters
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
                {payload.ProjectsCreatedByCreator.failed &&
                    payload.ProjectsCreatedByCreator.failed.length > 0 && (
                        <>
                            {payload.ProjectsCreatedByCreator.failed.map((project) => (
                                <div key={project.projectId}>
                                    <hr className="mb-[4vh] w-full border-t-4 border-gray-600" />
                                    <div className="rounded-none bg-orange-50 shadow-none">
                                        <div className="flex justify-between p-4">
                                            <div className="flex w-full items-center space-x-4">
                                                <img
                                                    src={project.previewImageUrl}
                                                    alt={project.name}
                                                    className="h-[20vh] w-[13vw] rounded object-cover"
                                                />
                                                <div className="w-[20vw]">
                                                    <h3 className="pb-4 text-xl font-semibold">
                                                        {project.name}
                                                    </h3>
                                                    {/* {project.status == 3 && <p className="pb-4 font-medium text-xl text-red-600">Fail at {project.stage}</p>} */}
                                                    <p className="pb-4 text-xl font-medium">
                                                        {stageLabels[project.failedStage.stageId]}
                                                    </p>
                                                    <div className="flex justify-between text-xl font-medium">
                                                        <div className="flex-col justify-between">
                                                            {project.totalSupports} Baht
                                                        </div>
                                                        <div className="flex-col justify-between">
                                                            {project.failedStage.totalSupporter}{" "}
                                                            supporters
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 mt-2 h-2.5 w-full rounded-full bg-gray-300">
                                                        <div
                                                            className="h-2.5 rounded-full bg-orange-400"
                                                            style={{
                                                                width: `${
                                                                    project.failedStage
                                                                        .goalFunding > 0
                                                                        ? (project.failedStage
                                                                              .totalSupporter /
                                                                              project.failedStage
                                                                                  .goalFunding) *
                                                                          100
                                                                        : 0
                                                                }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        <div>
                                                            {project.failedStage.goalFunding > 0
                                                                ? `${((project.failedStage.totalSupporter / project.failedStage.goalFunding) * 100).toFixed(2)}%`
                                                                : "0%"}{" "}
                                                            of{" "}
                                                            {project.failedStage.goalFunding.toLocaleString()}{" "}
                                                            Baht
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
