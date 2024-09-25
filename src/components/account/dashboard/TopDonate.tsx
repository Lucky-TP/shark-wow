import React, { useEffect, useState } from 'react';
import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary';
import LoadingSection from "src/components/global/LoadingSection";

export default function TopDonate() {
    const { creatorSummary, onGettingSummary } = useCreatorSummary();

    return (
        <div className="flex-col h-[60vh] rounded-lg bg-white">
            <div className='text-gray-700 text-lg font-extrabold pl-3 pt-4'>
                Top 5 Donate
            </div>
            {creatorSummary?.data?.topDonators && creatorSummary.data.topDonators.length > 0 ? (
                creatorSummary.data.topDonators.map((user, index) => (
                    <div key={index} className='flex items-center justify-between p-3'>
                        <div className='flex items-center'>
                            <img src={user.profileImageUrl} alt={user.uid} className='object-contain h-12 w-12 rounded-full mr-3' />
                            <div>
                                <h3 className='text-base font-semibold'>{user.username}</h3>
                                <p className='text-sm text-gray-600'>Donated {user.totalDonates} baht</p>
                            </div>
                        </div>
                        <div className='text-gray-800 text-lg font-bold pr-5'>
                            {index + 1}
                        </div>
                    </div>
                ))
            ) : (
                <div className='text-center text-gray-500 mt-4'>
                    No Data Available
                </div>
            )}
        </div>
    );
}
