"use client"

import React, { useEffect, useState } from 'react'
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'

export default function TotalStats(){
    const { creatorSummary, onGettingSummary } = useCreatorSummary()
    

    return (
        
        <div className="flex-col ">
            <div className='bg-white rounded-xl w-[14vw] p-4 mb-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Total Support Funding</div>
                <div className='text-gray-700 text-2xl font-semibold pt-3'>{creatorSummary.data.totalFunding}</div>
            </div>
            <div className='bg-white rounded-xl w-[14vw] p-4 flex flex-col shadow-md'>
                <div className='text-gray-700 text-lg font-extrabold '>Total Backer</div>
                <div className='text-gray-700 text-2xl font-semibold pt-3'>{creatorSummary.data.totalSupporter}</div>
            </div>
        </div>
        
    )
}