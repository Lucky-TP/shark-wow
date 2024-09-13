import React, { useEffect, useState } from "react";

import { Stage } from "src/interfaces/models/project";

import { FaLocationDot } from "react-icons/fa6";

type Props = {
    stage: Stage;
};

import { StageStatus } from "src/interfaces/models/enums";

function formatDate(date: string ): string {
    const DateO = new Date(date)
    const day = String(DateO.getDate()).padStart(2, '0');
    const month = String(DateO.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = DateO.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function TargetStage({ stage }: Props) {
    // console.log("checking stage", stage);
    // const [stageStatus, setStageStatus] = useState("");
    // useEffect(() => {
    //     if (stage) { 
    //         if (stage.status === StageStatus.CURRENT) {
    //             setStageStatus("Stage opening");
    //         } else if (stage.status === StageStatus.FINISH) {
    //             setStageStatus("Stage Done");
    //         } else if (stage.status === StageStatus.INCOMING) {
    //             setStageStatus("Stage Incoming");
    //         } else if (stage.status === StageStatus.NOT_USE) {
    //             // setStageStatus("Stage not using");
    //         }
    //     }
    // },[stage])

    return (
        <li
            key={stage.stageId}
            className="flex flex-col items-center justify-between bg-orange-100 md:min-w-[50vw] max-w-[50vw] h-[60vh] px-[2vw] py-[3vh]
            rounded-lg  hover:shadow-xl  hover:bg-orange-200 border border-orange-200 shadow-xl
            transition-all duration-700 hover:translate-y-[-1vh] cursor-pointer"
        >
            {stage.imageUrl !== "" && (
                <img
                    src={stage.imageUrl}
                    className="w-full rounded-t-lg cursor-pointer"
                    draggable={false}
                />
            )}

            <div className="flex flex-col justify-between px-[1.5vw] my-[1.5vh] gap-y-[1vh] w-full">
                <p className="text-red-500 text-sm font-normal">{stage.name}</p> 
                <h3 className="text-xl font-semibold text-gray-800">{stage.name}</h3>

                <span className="flex items-center text-gray-600 ml-[0.5vw]">
                    <FaLocationDot className="text-base mr-2" />
                    <p className="text-base">Start: {formatDate(stage.startDate)}</p>
                </span>
                <span className="flex items-center text-gray-600 ml-[0.5vw]">
                    <FaLocationDot className="text-base mr-2" />
                    <p className="text-base">End: {formatDate(stage.expireDate)}</p>
                </span>
            </div>
            <div className="flex flex-col w-full text-center">
                <div
                    className="ql-editor !p-0 preview-content mt-20"
                    dangerouslySetInnerHTML={{
                        __html: stage.detail || "",
                    }}
                />
                <p>Current Funding {stage.currentFunding*stage.totalSupporter}</p>
                <p>Goal funding this stage {stage.goalFunding}</p>
                <p>Backers {stage.totalSupporter}</p>
                <p>{stage.status !== StageStatus.CURRENT ? "Not Funded able " : "Fundable"}</p>
            </div>
            <div className="flex items-center justify-center w-full">
                <button 
                    onClick={() => console.log("support this stage")}
                    disabled={stage.status !== StageStatus.CURRENT ? true : false}
                    className={`px-[4vw] py-[2vh] rounded-xl shadow-md hover:shadow-lg
                         transition-all duration-700
                        ${stage.status !== StageStatus.CURRENT ? 'cursor-not-allowed bg-orange-300' : 'bg-orange-400 cursor-pointer hover:bg-orange-500 hover:scale-[1.02]'}
                    `}
                >
                    <p className="text-white text-lg">{stage.status !== StageStatus.CURRENT ? "Unavaliable" : "Support this stage"}</p>
                </button>
            </div>
        </li>
    );
}
