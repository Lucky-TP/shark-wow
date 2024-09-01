'use client'
import React, { useEffect, useState } from 'react'

import EmblaCarousel from './emblaCarousel/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'


type Props = {
    images: string[] | undefined,
    isLoading: boolean
}

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

const SLIDES = [
    {
        id: 1,
        title: 'Slide 1',
        description: 'Slide 1 description',
        image: '/nuk.jpg'
    }, {
        id: 2,
        title: 'Slide 2',
        description: 'Slide 2 description',
        image: '/shark2.jpg'
    }, {
        id: 3,
        title: 'Slide 3',
        description: 'Slide 3 description',
        image: '/assets/shark.png'
    },     {
        id: 4,
        title: 'Slide 1',
        description: 'Slide 1 description',
        image: '/nuk.jpg'
    }, {
        id: 5,
        title: 'Slide 2',
        description: 'Slide 2 description',
        image: '/shark2.jpg'
    }, {
        id: 6,
        title: 'Slide 3',
        description: 'Slide 3 description',
        image: '/assets/shark.png'
    },     {
        id: 7,
        title: 'Slide 1',
        description: 'Slide 1 description',
        image: '/nuk.jpg'
    }, {
        id: 8,
        title: 'Slide 2',
        description: 'Slide 2 description',
        image: '/shark2.jpg'
    }, {
        id: 9,
        title: 'Slide 3',
        description: 'Slide 3 description',
        image: '/assets/shark.png'
    },     {
        id: 10,
        title: 'Slide 1',
        description: 'Slide 1 description',
        image: '/nuk.jpg'
    }
]
//     {
    // id: 1,
//     title: 'Slide 1',
//     description: 'Slide 1 description',
//     image: '/nuk.jpg'
// }

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