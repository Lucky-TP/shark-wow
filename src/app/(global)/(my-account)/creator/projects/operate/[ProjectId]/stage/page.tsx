import React from 'react'
import StagePage from 'src/components/account/updateproject/stagetemp'

type Props = {}

export default function page({ params }: { params: { ProjectId: string } }) {
  return (
    <section>
        <StagePage projectId={params.ProjectId} />
    </section>
  )
}