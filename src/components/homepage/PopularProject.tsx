'use client'

import React, { useEffect, useState } from 'react'
import { ShowProject } from 'src/interfaces/models/common';
import { getTenPopularProjects } from 'src/services/apiService/projects/getTenPopularProjects';
import Link from 'next/link'
import CarouselProductCard from 'src/components/ProductCard/CarouselProduct/CarouselProductCard';

type Props = {}

export default function PopularProject({}: Props) {
    const [topproducts, setTopProducts] = useState<ShowProject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const OnGettingPopularProject = () => {
        // Fetch popular project
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getTenPopularProjects();
  
                setTopProducts(data.data);
            } catch (error) {
                setError("An error occurred while fetching products.");
                console.error(
                    "An error occurred while fetching products:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
  
        fetchProducts();
    }, []);
    
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
            <CarouselProductCard title='' data={topproducts} />
        </section>
    )
}