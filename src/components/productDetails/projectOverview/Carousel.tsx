'use client'
import React, { useEffect, useState } from 'react'

import { useProjectDetails } from 'src/context/custom-hooks/useProjectDetails'


import EmblaCarousel from './emblaCarousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'


type Props = {
    images: string[] | undefined,
    isLoading: boolean
}

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

export default function ProjectCarousel() {
    const context = useProjectDetails();
    const [slides, setSlides] = useState<any[]>([])

    useEffect(() => {
        const images : any[] = context.data.carouselImageUrls?.map((e,i)=>{
            return {
                id: i+1,
                image: e
            }
        }) || []
        setSlides(images)
    }, [context])
    return (
        <section className='flex w-full h-full sm:px-[3vw] md:px-[2vw]'>
            <EmblaCarousel slides={slides} options={OPTIONS} />
        </section>
    )
}