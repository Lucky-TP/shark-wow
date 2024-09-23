'use client'

import React from 'react'

import { UserInfo } from 'src/components/account/UserInfo'

import { CreatorSummaryProvider } from 'src/context/creatorDashboard/useCreatorSummary'

import { useUserData } from 'src/context/useUserData'


export default function layout({ children }:{ children: React.ReactNode } ) {
    const { user, loading } = useUserData();
    return (
        <CreatorSummaryProvider>
            <UserInfo user={user || undefined} />
        </CreatorSummaryProvider>
    )
}