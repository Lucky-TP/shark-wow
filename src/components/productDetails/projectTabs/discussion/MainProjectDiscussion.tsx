import React from 'react'
import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails'

type Props = {}



export default function MainProjectDiscussion({}: Props) {
    const {
      ProjectInfo
    } = useProjectDetails()

    return (
      <section className='w-full bg-slate-200 h-[50vh]'>
          {/* {ProjectInfo.discussion} */}
      </section>
    )
}