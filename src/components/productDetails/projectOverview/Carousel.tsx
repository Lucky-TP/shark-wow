'use client'
import React, { useEffect, useState } from 'react'

import EmblaCarousel from './emblaCarousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'


type Props = {
    images: string[] | undefined,
    isLoading: boolean
}

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }



export default function ProjectCarousel({images , isLoading}: Props) {
    const [slides, setSlides] = useState<any[]>([])

    useEffect(() => {
        const temp : any[] = images?.map((e,i)=>{
            return {
                id: i+1,
                image: e
            }
        }) || []
        setSlides(temp)
    }, [images])
    return (
        <section className='flex w-full h-full sm:px-[3vw] md:px-[2vw]'>
            <EmblaCarousel slides={slides} options={OPTIONS} isLoading={isLoading} />
        </section>
    )
}