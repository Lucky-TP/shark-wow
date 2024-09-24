'use client'
import React, { useEffect } from 'react'

import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
import DashBoard from './DashBoard'
import CreatorProjectStat from './CreatorProjectStat'
import TopCreatorProject from './TopCreatorProject'

type Props = {}

export default function CreatorDashboard({}: Props) {
    const { creatorSummary , onGettingSummary } = useCreatorSummary()
    
    useEffect(()=>{
        onGettingSummary() 
    },[])

    return (
        <section>
            <div className='w-full px-40'>
                <div className=' pb-4'>
                    <CreatorProjectStat/>
                </div>
                <div className='py-4'>
                    <DashBoard/>
                </div>
                <div className='flex  '>
                    <div className='w-2/5 pr-5'>
                        <TopCreatorProject/>
                    </div>
                    <div className='w-3/5 bg-white'>
                        <div>
                            total support funding
                        </div>
                        <div>
                            total backer
                        </div>
                    </div>
                </div>
            </div>
            
            
            {
                creatorSummary && 
                (
                    <div>
                        {JSON.stringify(creatorSummary.data)}
                    </div>
                )
            }
        </section>
    )
}