'use client'
import React from 'react'

import EmblaCarousel from './emblaCarousel/emblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

type Props = {}

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


export default function ProjectCarousel({}: Props) {
    
    return (
        <section className='flex justify-center items-center h-full sm:px-[3vw] md:px-0'>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    )
}