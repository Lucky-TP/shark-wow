import React from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/main'
import MainProjectTabs from 'src/components/productDetails/projectTabs/main'

export default function Page({params} : any) {
    console.log(params.projectId)
    return (
        <section className='flex flex-col pt-[5vh] gap-y-[5vh]'>
            <MainProjectOverview/>
            <MainProjectTabs/>
        </section>
    )
}