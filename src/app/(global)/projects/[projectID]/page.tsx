import React from 'react'

import MainProjectOverview from 'src/components/productDetails/projectOverview/main'


export default function Page({ params} : any) {

    console.log(params.projectId)

    return (
        <section className='flex flex-col py-[5vh]'>
            <MainProjectOverview/>
        </section>
    )
}