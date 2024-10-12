import React, { useEffect, useState } from 'react';
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary';
import LoadingSection from "src/components/global/LoadingSection";

export default function TopCreatorProject() {
    const { creatorSummary, onGettingSummary } = useCreatorSummary();

    console.log(creatorSummary.data.topSupportedProjects);

    // Early return for no data
    if (!creatorSummary?.data?.topSupportedProjects || creatorSummary.data.topSupportedProjects.length === 0) {
        return (
            <div className="flex-col h-[60vh] rounded-lg bg-white">
                <div className='text-gray-700 text-lg font-extrabold pl-3 pt-4'>
                    Top 5 Projects
                </div>
                <div className='text-center text-gray-500 mt-4'>
                    No Data Available
                </div>
            </div>
        );
    }

    // Main content rendering
    return (
        <div className="flex-col h-[60vh] rounded-lg bg-white">
            <div className='text-gray-700 text-lg font-extrabold pl-3 pt-4'>
                Top 5 Projects
            </div>
            {creatorSummary.data.topSupportedProjects.map((project, index) => (
                <div key={index} className='flex items-center justify-between p-3'>
                    {project.totalSupports > 0 && (
                        <><div className='flex items-center'>
                            <img src={project.previewImageUrl} alt={project.name} className='object-contain h-12 w-12 rounded-full mr-3' />
                            <div>
                                <h3 className='text-base font-semibold w-[20vw] truncate whitespace-nowrap'>{project.name}</h3>
                                <p className='text-sm text-gray-600'>Funded {project.totalSupports} times</p>
                            </div>
                        </div><div className='text-gray-800 text-lg font-bold pr-5'>
                                {index + 1}
                            </div></>    
                    )}
                    
                </div>
            ))}
        </div>
    );
}
