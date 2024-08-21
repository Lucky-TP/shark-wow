import React from 'react'
import Project from "src/components/account/project/project";
type Props = {}

export default function page({}: Props) {
  return (
    <section className="">
            <Project/>  {/* ใช้ Profile ที่นำเข้ามา */}
        </section>
  )
}