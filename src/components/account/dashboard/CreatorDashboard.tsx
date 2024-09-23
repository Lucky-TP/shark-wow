import React from 'react'

import { useCreatorSummary } from 'src/context/creatorDashboard/useCreatorSummary'

type Props = {}

export default function CreatorDashboard({}: Props) {
    const context = useCreatorSummary()
    return (
        <section>

        </section>
    )
}