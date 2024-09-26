'use client'

import React from 'react'

import { UserInfo } from 'src/components/account/UserInfo'

import { useUserData } from 'src/context/useUserData'


export default function layout({ children }:{ children: React.ReactNode } ) {
    const { user, loading } = useUserData();
    return (
        <section>
            <UserInfo user={user || undefined} />
            {children}
        </section>
    )
}