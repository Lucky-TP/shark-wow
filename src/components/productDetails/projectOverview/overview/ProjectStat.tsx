import React from "react";

import { Stage } from "src/interfaces/models/project";

import { Skeleton } from "antd";
import { useProjectDetails } from "src/context/useProjectDetails";

function formatDate(date: string ): string {
    const DateO = new Date(date)
    const day = String(DateO.getDate()).padStart(2, '0');
    const month = String(DateO.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = DateO.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function ProjectStat() {
    const { ProjectInfo, isLoading, error } = useProjectDetails();
    return (
        <>
            {isLoading && <Skeleton active />}
            {!isLoading && (
                <>
                    <div className="flex justify-between items-center mb-2">
                        {/* implement project info current stage later */}
                        <span className="text-2xl font-bold">฿ {(Number(ProjectInfo.costPerQuantity) * Number(ProjectInfo.totalQuantity)).toLocaleString()} THB</span>
                        <span className="text-gray-600">{ProjectInfo.totalSupporter} backers</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded-full mb-2">
                        <div
                            className="bg-orange-300 h-full rounded-full w-0"
                        />
                    </div>
                    <div className="flex justify-between items-center text-gray-600 w-full" >
                        <span className="flex flex-row justify-between w-full ">
                            <h1>
                                Deadline for this stages 
                            </h1>
                            <p>
                                {formatDate(ProjectInfo.currentStage?.expireDate ?? "")}
                            </p>
                        </span>
                    </div>
                </>
            )}
        </>
    );
}
