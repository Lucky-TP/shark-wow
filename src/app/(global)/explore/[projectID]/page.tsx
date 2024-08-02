import React from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/MainProjectOverview'
import MainProjectTabs from 'src/components/productDetails/projectTabs/MainProjectTabs'

export default function Page({params} : any) {
    // console.log('getting project ?Id ',params.projectID)
    return (
        <section className='flex flex-col w-screen'>
            <MainProjectOverview/>
            <MainProjectTabs/>
        </section>
    )
}