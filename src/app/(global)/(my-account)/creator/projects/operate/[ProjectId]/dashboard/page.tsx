import React from 'react'
import Projecttitle from 'src/components/account/updateproject/ProjectTitle'
import GraphProject from 'src/components/account/updateproject/GraphProject'
type Props = {}


export default function page({ params }: { params: { ProjectId: string } }) {
  return (
    <section>
      
      {<GraphProject projectId={params.ProjectId}/>}
    </section>
  )
}