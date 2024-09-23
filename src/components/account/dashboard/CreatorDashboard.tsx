'use client'
import React, { useEffect } from 'react'

import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'

type Props = {}

export default function CreatorDashboard({}: Props) {
    const { creatorSummary , onGettingSummary } = useCreatorSummary()
    
    useEffect(()=>{
        onGettingSummary() 
    },[])

    return (
        <section>
            awrgjkopqwrng
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