import React from 'react'

import { CreatorSummaryProvider } from 'src/context/creatorDashboard/useCreatorSummary'


type Props = {}

export default function page({}: Props) {
  return (
    <CreatorSummaryProvider>
        <section className="bg-[#E5D8CA] min-h-screen">
            <div className="p-8">
            {/* <Project /> */}
            {/* <MyFundingProject/> */}
            {/* <MyFavouriteProject /> */}
            </div>
        </section>
    </CreatorSummaryProvider>
  )
}