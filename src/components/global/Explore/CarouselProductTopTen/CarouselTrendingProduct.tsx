"use client";
import React, { useEffect,useState } from 'react';
import CarouselProductCard from 'src/components/ProductCard/CarouselProduct/CarouselProductCard';
import { ShowProject } from 'src/interfaces/models/common';
import { getTenPopularProjects } from 'src/services/apiService/projects/getTenPopularProjects';

type Props = {};

export default function CarouselTrendingProductCard({}: Props) {
  const [topproducts, setTopProducts] = useState<ShowProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

 

  return (
    <section className='flex flex-col justify-between py-[3vh] h-full w-full '>
      <CarouselProductCard title='' data={topproducts} />
    </section>
  );
}
