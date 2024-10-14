'use client'

import React from 'react'

import {OperateInfo} from 'src/components/account/OperateInfo'

import {useUserData} from 'src/context/useUserData'

export default function layout({ children, params }: { children: React.ReactNode; params: { ProjectId: string } }) {
    const { user, loading } = useUserData();

    return (
        <section>
            <OperateInfo projectId={params.ProjectId} /> {/* ใช้ ProjectId จาก params */}
            {children}
        </section>
    );
}
