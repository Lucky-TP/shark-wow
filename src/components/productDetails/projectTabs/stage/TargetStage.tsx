import React from "react";

import { Stage } from "src/interfaces/models/project";

import { FaLocationDot } from "react-icons/fa6";
import { timestampToDate } from "src/utils/date/clientDateConversions";

type Props = {
    stage: Stage;
};

export default function TargetStage({ stage }: Props) {
    console.log("checking stage" , stage)
    return (
        <li
            key={stage.stageId}
            className="flex flex-col items-center justify-between bg-orange-100 md:min-w-[50vw] max-w-[50vw] h-[60vh] px-[2vw] py-[3vh]
            rounded-lg  hover:shadow-xl hover:scale-[1.02] hover:bg-orange-200 border border-orange-200 shadow-xl
            transition-all duration-700 hover:translate-y-[-1vh] cursor-pointer"
        >
            {
                stage.imageUrl !== "" && 
                <img
                    src={stage.imageUrl}
                    className="w-full rounded-t-lg cursor-pointer"
                    draggable={false}
                />                
            }

            <div className="flex flex-col justify-between px-[1.5vw] my-[1.5vh] gap-y-[1vh] w-full">
                <p className="text-red-500 text-sm font-normal">{stage.name}</p>
                <h3 className="text-xl font-semibold text-gray-800">{stage.name}</h3>
                <span className="flex items-center text-gray-600 ml-[0.5vw]">
                    <FaLocationDot className="text-base mr-2" />
                    <p className="text-base">
                        Start: {stage.startDate && timestampToDate(stage.startDate).toDateString()}
                    </p>
                </span>
                <span className="flex items-center text-gray-600 ml-[0.5vw]">
                    <FaLocationDot className="text-base mr-2" />
                    <p className="text-base">
                        End: {stage.expireDate && timestampToDate(stage.expireDate).toDateString()}
                    </p>
                </span>
            </div>
            <div className="flex flex-col w-full text-center">
                <p>{stage.detail === "" ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, quas, hic laborum harum in nobis quaerat aliquam fugiat placeat est pariatur sed esse provident ea soluta? Explicabo ut quisquam debitis."
                : "" }</p>
                <p>Current Funding {stage.currentFunding}</p>
                <p>Goal funding this stage {stage.goalFunding}</p>
                <p>Backers {stage.totalSupporter}</p>
            </div>
            <div className="flex items-center justify-center w-full ">
                <button className="px-[4vw] py-[2vh] bg-orange-400 rounded-xl shadow-md hover:shadow-lg  hover:scale-[1.03] hover:bg-orange-600 transition-all duration-700">
                    <p className="text-white text-lg">Support this stage</p>
                </button>
            </div>
        </li>
    );
}
