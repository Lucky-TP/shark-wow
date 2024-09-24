"use client"

import React, { useEffect, useState } from 'react'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'

export default function CreatorProjectStat(){
    const { creatorSummary, onGettingSummary } = useCreatorSummary()
    const launchedProjects = creatorSummary?.data?.projectStats?.launched
    const draftedProjects = creatorSummary?.data?.projectStats?.drafted
    const completedProjects = creatorSummary?.data?.projectStats?.completed
    const failedProjects = creatorSummary?.data?.projectStats?.failed

    return (
        
        <div className="flex space-x-8">
            <div className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Project launched</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{launchedProjects}</div>
            </div>
            <div className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Project draft</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{draftedProjects}</div>
            </div>
            <div className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Project completed</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{completedProjects}</div>
            </div>
            <div className='bg-white rounded-xl w-[12vw] p-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Project failed</div>
                <div className='text-gray-700 text-lg font-semibold pt-3'>{failedProjects}</div>
            </div>
        </div>
        
    )
}