import React from 'react'

import { CreatorSummaryProvider } from 'src/context/creatorDashboard/useCreatorSummary'

import CreatorDashboard from 'src/components/account/dashboard/creatorDashboard'


type Props = {}

export default function page({}: Props) {
  return (
    <CreatorSummaryProvider>
        <CreatorDashboard/>
    </CreatorSummaryProvider>
  )
}