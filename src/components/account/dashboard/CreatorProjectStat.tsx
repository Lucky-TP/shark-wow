"use client"

import React, { useEffect, useState } from 'react'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
import { useRouter } from "next/navigation";

export default function CreatorProjectStat(){
    const { creatorSummary, onGettingSummary } = useCreatorSummary()
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        router.push(`/creator/projects`);
        setIsLoading(false);
    };

    return (
        
        <div className="flex space-x-8">
            <button
                className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 active:bg-orange-500'
                onClick={handleClick}  // Define this function to handle click events
            >
                <div className='text-gray-700 text-lg font-extrabold'>Project launched</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{creatorSummary.data.projectStats.launched}</div>
            </button>
            <button
                className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300  active:bg-orange-500'
                onClick={handleClick}  // Define this function to handle click events
            >
                <div className='text-gray-700 text-lg font-extrabold '>Project draft</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{creatorSummary.data.projectStats.drafted}</div>
            </button>
            <button
                className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300  active:bg-orange-500'
                onClick={handleClick}  // Define this function to handle click events
            >
                <div className='text-gray-700 text-lg font-extrabold '>Project completed</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{creatorSummary.data.projectStats.completed}</div>
            </button>
            <button
                className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 active:bg-orange-500'
                onClick={handleClick}  // Define this function to handle click events
            >
                <div className='text-gray-700 text-lg font-extrabold '>Project failed</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{creatorSummary.data.projectStats.failed}</div>
            </button>
        </div>
        
    )
}