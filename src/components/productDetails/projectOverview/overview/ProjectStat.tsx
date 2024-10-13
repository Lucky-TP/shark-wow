import React, { useEffect, useState } from "react";

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
    const [currentFunding,setCurrentFunding] = useState<number>(0) ; 

    useEffect(()=>{
        if (ProjectInfo.stages){
            let temp = 0 
            ProjectInfo.stages.map((e)=>{
                temp+=e.currentFunding
            })
            setCurrentFunding(temp)
        }

    },[ProjectInfo])

    return (
        <>
            {isLoading && <Skeleton active />}
            {!isLoading && ProjectInfo && (
                <>
                    <div className="flex justify-between items-center mb-2">
                        {/* implement project info current stage later */}
                        <div className="flex justify-center flex-col">
                            <h1 className="text-2xl  text-orange-500 ">
                                Current {ProjectInfo.currentStage?.currentFunding.toLocaleString()}
                                
                            </h1>
                            <span className="text-sm text-gray-400">
                                Goal {ProjectInfo.currentStage?.goalFunding.toLocaleString()}
                            </span>      
                        </div>
                        <span className="text-gray-600">{ProjectInfo.totalSupporter} backers</span>
                    </div>
                    <div className="w-full bg-gray-300 h-1 rounded-full mb-2">
                        <div
                            className= 'bg-orange-400 h-full rounded-full'
                            style={{
                                width: `${(currentFunding / (Number(ProjectInfo.costPerQuantity) * Number(ProjectInfo.totalQuantity))) * 100}%`,
                              }}
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
