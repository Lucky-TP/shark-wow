import React from 'react'

import { Stage } from 'src/interfaces/models/project'

import { FaLocationDot } from "react-icons/fa6";

type Props = { 
    stage : Stage
}

export default function TargetStage({stage}: Props) {
  return (
    <li
        key={stage.stageId}
        className="flex flex-col items-center bg-gray-100 min-w-[60vw] h-[60vh] rounded-lg shadow-lg my-[3vh] hover:shadow-xl hover:scale-[1.02] transition-all duration-500 hover:translate-y-[-2vh] cursor-default"
    >
        {/* <img
        alt={stage.name}
        src={stage.imageUrl}
        className="w-full rounded-t-lg cursor-pointer"
        draggable={false}
        /> */}
        <div className='flex flex-col justify-between px-[1.5vw] my-[1.5vh] gap-y-[1vh]'>
        <p className="text-red-500 text-sm font-normal">
            {stage.name}
        </p>
        <h3 className="text-xl font-semibold text-gray-800">{stage.name}</h3>
        <span className="flex items-center text-gray-600 ml-[0.5vw]">
            <FaLocationDot className="text-base mr-2" />
            <p className="text-base">Start: {stage.startDate.toDateString()}</p>
        </span>
        <span className="flex items-center text-gray-600 ml-[0.5vw]">
            <FaLocationDot className="text-base mr-2" />
            <p className="text-base">End: {stage.expireDate.toDateString()}</p>
        </span>
        </div>
    </li>
  )
}