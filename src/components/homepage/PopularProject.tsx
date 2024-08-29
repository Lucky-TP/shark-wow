'use client'

import React, { useEffect } from 'react'

import Link from 'next/link'
import CarouselTrendingProductCard from '../global/Explore/CarouselProductTopTen/CarouselTrendingProduct'

type Props = {}

export default function PopularProject({}: Props) {
    const OnGettingPopularProject = () => {
        // Fetch popular project
    }

    useEffect(() => {
        OnGettingPopularProject()
    })
    
    return (
        <section className='bg-white p-10'>
            <div className='flex flex-row items-center justify-between'>
                <h2 className="text-3xl font-bold mb-4">Popular Project</h2>
                <span>
                    <Link href='/catargories'>
                        <p>
                            View All
                        </p>
                    </Link>
                </span>
            </div>
            <CarouselTrendingProductCard showTopic={false} />
        </section>
    )
}