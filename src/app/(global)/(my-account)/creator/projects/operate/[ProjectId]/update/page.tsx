import React from 'react'
import UpdateEditor from 'src/components/account/updateproject/Editor'
type Props = {}

export default function page({ params }: { params: { ProjectId: string } }) {
  return (
    <section>
        <UpdateEditor projectId={params.ProjectId}/>
    </section>
  )
}