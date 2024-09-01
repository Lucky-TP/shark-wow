import React from 'react'
import Link from 'next/link'
import CarouselTrendingProductCard from '../global/Explore/CarouselProductTopTen/CarouselTrendingProduct'

type Props = {}

export default function PopularCreator({}: Props) {
  return (
    <section className='bg-white p-10'>
        <div className='flex flex-row items-center justify-between'>
            <h2 className="text-3xl font-bold mb-4">Popular Creator</h2>
            <span>
                <Link href='/explore'>
                    <p>
                        View All
                    </p>
                </Link>
            </span>
        </div>
        {/* mock ProductCard, TODO: implement CreatorCard */}
        <CarouselTrendingProductCard/>
    </section>
  )
}