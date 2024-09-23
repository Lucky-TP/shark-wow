'use client'
import React, { useEffect } from 'react'

import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'
import DashBoard from '../ReportProject/DashBoard'

type Props = {}

export default function CreatorDashboard({}: Props) {
    const { creatorSummary , onGettingSummary } = useCreatorSummary()
    
    useEffect(()=>{
        onGettingSummary() 
    },[])

    return (
        <section>
            <div>
              <DashBoard data={creatorSummary.data.financialTimeSeries} />  
              <DashBoard  />
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