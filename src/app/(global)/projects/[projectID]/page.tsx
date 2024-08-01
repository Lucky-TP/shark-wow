import React from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/Main'
import MainProjectTabs from 'src/components/productDetails/projectTabs/main'

export default function Page({params} : any) {
    // console.log('getting project ?Id ',params.projectID)
    return (
        <section className='flex flex-col w-screen'>
            <MainProjectOverview/>
            <MainProjectTabs/>
        </section>
    )
}