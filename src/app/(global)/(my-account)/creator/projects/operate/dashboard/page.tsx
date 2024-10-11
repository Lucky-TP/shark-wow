import React from 'react'
import Projecttitle from 'src/components/account/updateproject/projecttitle'
import GraphProject from 'src/components/account/updateproject/GraphProject'
type Props = {}

export default function page({}: Props) {
  return (
    <section>
      <Projecttitle/>
      <GraphProject/>
    </section>
  )
}