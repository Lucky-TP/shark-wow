"use client";
import React, { useEffect,useState } from 'react';
import CarouselProductCard from 'src/components/NewProductCard/CarouselProduct/CarouselProductCard';
import { ShowProject } from 'src/interfaces/datas/project';
import { getTenPopularProjects } from 'src/services/apiService/projects/getTenPopularProjects';
import LoadingSection from '../../LoadingSection';

type Props = {};

export default function CarouselTrendingProductCard({}: Props) {
  const [topproducts, setTopProducts] = useState<ShowProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              setLoading(true);
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

  

  if (loading) return <p><LoadingSection/></p>;
  if (error) return <p>Error: {error}</p>;

 

  return (
    <section className='flex flex-col justify-between py-[3vh] h-full w-full '>
      <CarouselProductCard title='Top 10 Popular Projects' data={topproducts} />
    </section>
  );
}
