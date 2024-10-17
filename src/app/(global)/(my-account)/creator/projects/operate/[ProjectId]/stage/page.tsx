import React from 'react'
import StagePage from 'src/components/account/updateproject/stage3'

type Props = {}

export default function page({ params }: { params: { ProjectId: string } }) {
  return (
    <section>
        <StagePage projectId={params.ProjectId} />
    </section>
  )
}