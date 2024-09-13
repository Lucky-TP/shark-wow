import React, { useEffect, useState } from "react";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";

import { Stage } from "src/interfaces/models/project";
import { StageStatus } from "src/interfaces/models/enums";

import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
    stage: Stage;
};


function formatDate(date: string ): string {
    const DateO = new Date(date)
    const day = String(DateO.getDate()).padStart(2, '0');
    const month = String(DateO.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = DateO.getFullYear();

    return `${day}/${month}/${year}`;
}

export default function TargetStage({ stage }: Props) {
    const {ProjectInfo } = useProjectDetails();

    return (
        <li
            key={stage.stageId}
            className="flex flex-col items-center bg-orange-100 px-[2vw] py-[2vh]
            rounded-lg   hover:bg-orange-200 border border-orange-200 h-fit
            transition-all duration-700  cursor-pointer"
        >
            {ProjectInfo.carouselImageUrls?.[0] !== undefined && (
                <Image
                    src={ProjectInfo.carouselImageUrls?.[0]}
                    alt="stage image"
                    width={500}
                    height={400}
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

            <div className="flex flex-col w-full ">
                <div
                    className="ql-editor !p-0 preview-content "
                    dangerouslySetInnerHTML={{
                        __html: stage.detail || "",
                    }}
                />
            <div className="flex flex-col items-start mb-4">
                <p className="text-sm text-gray-500">Current Funding: <span className="font-bold text-gray-700">{stage.currentFunding.toLocaleString()} THB</span></p>
                <p className="text-sm text-gray-500">Goal Funding this Stage: <span className="font-bold text-gray-700">{stage.goalFunding.toLocaleString()} THB</span></p>
                <p className="text-sm text-gray-500">Backers: <span className="font-bold text-gray-700">{stage.totalSupporter}</span></p>
            </div>
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
