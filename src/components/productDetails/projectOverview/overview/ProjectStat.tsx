import React from "react";

import { Stage } from "src/interfaces/models/project";

import { Skeleton } from "antd";
import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

export default function ProjectStat() {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <>
            {isLoading && <Skeleton active />}
            {!isLoading && (
                <>
                    <div className="flex justify-between items-center mb-2">
                        {/* implement project info current stage later */}
                        <span className="text-2xl font-bold">
                            $ {ProjectInfo.status} USD
                        </span>
                        <span className="text-gray-600">
                            {ProjectInfo.totalSupporter} backers
                        </span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded-full mb-2">
                        <div
                            className="bg-orange-400 h-full rounded-full"
                            style={{
                                width: `${
                                    50
                                    // ((stages[currentStage !== undefined ? currentStage : 0].currentFunding + 1) / stages[currentStage !== undefined ? currentStage : 0].goalFunding)
                                }%`,
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-gray-600">
                        {/* <span>{stages[currentStage].currentFunding+1} of $ 10000</span> */}
                        <span>69 days left</span>
                    </div>
                </>
            )}
        </>
    );
}
