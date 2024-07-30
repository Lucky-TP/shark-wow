'use client'
import React from 'react'

import EmblaCarousel from './emblaCarousel/emblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

type Props = {}

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

const SLIDES = [{
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
}]


export default function ProjectCarousel({}: Props) {
    
    return (
        <section className='flex justify-center items-center h-full'>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </section>
    )
}