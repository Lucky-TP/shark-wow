import React from 'react'
import Projecttitle from 'src/components/account/updateproject/projecttitle'
import DashBoard from 'src/components/account/updateproject/dashboard'
type Props = {}

export default function page({}: Props) {
  return (
    <section>
      <Projecttitle/>
      <DashBoard/>
    </section>
  )
}