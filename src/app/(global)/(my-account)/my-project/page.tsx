import React from 'react'
import Project from "src/components/account/project/project";
import Mockproject from "src/components/account/project/mockproject";
type Props = {}

export default function page({}: Props) {
  return (
    <section className="">
            <Project/> 
            <Mockproject/>
        </section>
  )
}