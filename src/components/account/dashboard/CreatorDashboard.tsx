'use client'
import React, { useEffect, useState } from 'react';

import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
import DashBoard from './DashBoard'
import CreatorProjectStat from './CreatorProjectStat'
import TopCreatorProject from './TopCreatorProject'
import TotalStats from './TotalStat'
import TopDonate from './TopDonate'
import LoadingSection from 'src/components/global/LoadingSection';
import RecentActivity from './RecentActivity';

type Props = {}

export default function CreatorDashboard({}: Props) {
    const { creatorSummary , onGettingSummary } = useCreatorSummary()
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        onGettingSummary().then(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <LoadingSection/>;
    }

    return (
        <section>
            <div className='w-full px-40'>
                <div className=' pb-4'>
                    <CreatorProjectStat/>
                </div>
                <div className='mb-4'>
                    <DashBoard/>
                </div> 
                <div className='flex mb-4 '>
                    <div className='w-2/5 pr-5'>
                        <TopCreatorProject/>
                    </div>
                    <div className='w-2/5'>
                        <div className='w-2/5'>
                            <TotalStats/>
                        </div>
                    </div>
                </div>
                <div className='w-2/5 pr-5 mb-4'>
                    <TopDonate/>
                </div>
                <div className='mb-8'>
                    <RecentActivity/>
                </div>
            </div>
            
            
            {/* {
                creatorSummary && 
                (
                    <div>
                        {JSON.stringify(creatorSummary.data)}
                        {creatorSummary.data.totalSupporter}
                    </div>
                )
            } */}
        </section>
    )
}