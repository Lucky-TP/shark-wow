import React from 'react'

import ProjectCarousel from './Carousel'
import ProjectOverview from './ProjectOverview'

import LoadingPage from 'src/components/global/LoadingPage';


import { ProjectDetialResponse } from 'src/interfaces/datas/projectDetailStatus'

export default function MainProjectOverview( 
    { 
        projectData,
        isLoading,
        error
    }: ProjectDetialResponse
    ){
    console.log('projectData',projectData?.carouselImageUrls)
    return (
      <section className='flex flex-row justify-between py-[5vh] h-full w-full bg-orange-50'>

              <>
                <div className='w-8/12'>
                  <ProjectCarousel isLoading={isLoading} images={projectData?.carouselImageUrls}/>        
                </div>
                <div className='w-4/12'>
                  <ProjectOverview/>
                </div>          
              </>              
          

      </section>
    )
}