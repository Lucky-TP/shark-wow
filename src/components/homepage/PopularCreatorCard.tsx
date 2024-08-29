"use client";
import React, { useEffect,useState } from 'react'
import Link from 'next/link'
import CarouselCreatorCard from '../CreatorCard/CarouselCreator/CarouselCreatorCard'
import { PopularCreator } from 'src/interfaces/models/common'
import {getTenPopularUsers} from 'src/services/apiService/users/getTenPopularUsers'

type Props = {}

export default function PopularCreatorCard({}: Props) {
    const [data, setData] = useState<PopularCreator[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getTenPopularUsers();

                setData(data.data);
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

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <CarouselCreatorCard data={data}/>
    </section>
  )
}