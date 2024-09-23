'use client'
import React from 'react'

import { CreatorSummaryProvider } from 'src/context/creatorDashboard/useCreatorSummary'

import CreatorDashboard from 'src/components/account/dashboard/CreatorDashboard'


type Props = {}

export default function page({}: Props) {
  return (
    <CreatorSummaryProvider>
        <CreatorDashboard/>
    </CreatorSummaryProvider>
  )
}