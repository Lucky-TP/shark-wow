'use client'
import React from 'react'

import { CreatorSummaryProvider } from 'src/context/creatorDashboard/useCreatorSummary'

import CreatorDashboard from 'src/components/account/dashboard/CreatorDashboard'
import { UserInfo } from 'src/components/account/UserInfo'
import { useUserData } from 'src/context/useUserData'

type Props = {}

export default function page({}: Props) {
  const { user, loading } = useUserData();
  return (
    <CreatorSummaryProvider>
        <UserInfo user={user || undefined} />
        <CreatorDashboard/>
    </CreatorSummaryProvider>
  )
}